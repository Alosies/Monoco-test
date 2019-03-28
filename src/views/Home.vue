<template>
  <!-- eslint-disable prettier/prettier -->
  <div>
    <div class="wrapper">
      <div>
        <div class="buttonsWrapper">
          <div>
            <button v-for="(file, index) in files"
                    class="btn"
                    :key="index"
                    @click="currentFileName = file.name">
              {{ file.name }}
            </button>
          </div>
          <button @click="toggleReadOnly"
                  class="btn btn--readOnly">{{ isReadOnly? `Make Editable`: `Make Read Only`}}</button>
        </div>

        <div class="wrapper--editor"
             id="container">

        </div>
      </div>

      <div class="content">
        <h2>Current Editor Content</h2>
        <code>{{ currentEditorContent }}</code>

      </div>
    </div>
  </div>
</template>

<script>
// import MonacoEditor from "vue-monaco";
import * as monaco from 'monaco-editor'

export default {
  components: {
    // MonacoEditor
  },

  data() {
    return {
      options: {
        model: null
      },
      isReadOnly: false,
      files: [
        {
          name: 'config-1.yaml',
          language: 'yaml',
          content:
            'apiVersion: extensions/v1beta1\nkind: Deployment\nmetadata:\n  name: servers\n  labels:\n    app: simple-env-server\nspec:\n  replicas: 3\n  selector:\n    matchLabels:\n      app: simple-env-server\n  template:\n    metadata:\n      labels:\n        app: simple-env-server\n    spec:\n      containers:\n      - name: env-server\n        image: magicsandbox/simple-env-server\n        ports:\n        - containerPort: 8888\n'
        },
        {
          name: 'config-2.yaml',
          language: 'yaml',
          content:
            'apiVersion: v1\nkind: Service\nmetadata:\n  name: simple-env-service\n  labels:\n    run: expose\nspec:\n  selector:\n    app: simple-env-server\n  ports:\n  - protocol: TCP\n    port: 8888\n    targetPort: 8888\n'
        },
        {
          name: 'config-3.yaml',
          language: 'yaml',
          content:
            'apiVersion: v1\nkind: Pod\nmetadata:\n  name: poller\nspec:\n  containers:\n  - name: poller\n    image: magicsandbox/poller\n    env:\n    - name: TARGET\n      value: simple-env-service:8888\n'
        }
      ],
      editor: '',
      modelsArray: [],
      modelInstances: [],
      currentFileName: '',
      code:
        'apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n name: web\nspec:\n serviceName: "nginx"\n replicas: 2\n selector:\n   matchLabels:\n     app: nginx\n template:\n   metadata:\n     labels:\n       app: nginx\n   spec:\n     containers:\n     - name: nginx\n       image: k8s.gcr.io/nginx-slim:0.8\n       ports:\n       - containerPort: 80\n         name: web'
    }
  },
  mounted() {
    this.setModelsArray()
    const editorContainer = document.getElementById('container')

    this.editor = monaco.editor.create(editorContainer, {
      model: this.modelsArray[0].model,
      minimap: {
        enabled: false
      },
      theme: 'vs-dark',
      readOnly: this.isReadOnly
    })
  },
  computed: {
    currentEditorContent() {
      let content = ''
      if (this.editor) {
        content = this.editor.getModel().getValue()
      }
      return { content }
    }
  },
  watch: {
    currentFileName(newValue) {
      // console.log('watcher ran')
      const currentState = this.editor.saveViewState()

      const currentModel = this.editor.getModel()
      console.log('modelValue', currentModel.getValue())

      this.modelsArray.forEach(item => {
        if (currentModel === item.model) {
          item.state = currentState
        }
      })

      const currentModelIndex = this.modelsArray.filter(
        item => item.name == newValue
      )[0]

      this.editor.setModel(currentModelIndex.model)
      this.editor.restoreViewState(currentModelIndex.state)
      this.editor.focus()
    }
  },
  methods: {
    setModelsArray() {
      this.files.forEach(file => {
        const fileObject = {
          name: file.name,
          model: monaco.editor.createModel(file.content, file.language),
          state: null
        }
        this.modelsArray.push(fileObject)
      })
    },
    createFile(index) {
      if (this.modelInstances[index]) {
        this.modelInstances[index].saveViewState()
      }
    },
    toggleReadOnly() {
      this.isReadOnly = !this.isReadOnly
      this.editor.updateOptions({
        readOnly: this.isReadOnly
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.wrapper {
  padding: 2rem;
  display: grid;
  grid-gap: 1rem;
  grid-template-columns: 1fr 1fr;

  &--editor {
    min-height: 25rem;
    border: 1px solid grey;
    border-radius: 3px;
    padding: 2px;
    background: grey;
  }
}

.buttonsWrapper {
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
}

.btn {
  font-weight: 600;
  background: CRIMSON;
  color: white;
  padding: 0.5rem;
  cursor: pointer;

  &:focus {
    outline: none;
  }

  &--readOnly {
    background: REBECCAPURPLE;
  }
}
</style>
