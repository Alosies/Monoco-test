<template>
  <div class="wrapper">
    <monaco-editor class="editor"
                   v-model="code"
                   language="yaml">
    </monaco-editor>
    <pre><code>{{ code }}</code></pre>
  </div>
</template>

<script>
import MonacoEditor from "vue-monaco";

export default {
  components: {
    MonacoEditor
  },

  data() {
    return {
      code:
        'apiVersion: apps/v1\nkind: StatefulSet\nmetadata:\n name: web\nspec:\n serviceName: "nginx"\n replicas: 2\n selector:\n   matchLabels:\n     app: nginx\n template:\n   metadata:\n     labels:\n       app: nginx\n   spec:\n     containers:\n     - name: nginx\n       image: k8s.gcr.io/nginx-slim:0.8\n       ports:\n       - containerPort: 80\n         name: web'
    };
  }
};
</script>

<style>
.editor {
  width: 500px;
  height: 400px;
}
</style>

<style lang="stylus" scoped>
.wrapper {
  padding: 2rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
}
</style>
