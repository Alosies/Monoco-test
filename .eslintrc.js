module.exports = {
  root: true,
  env: {
    node: true
  },
  extends: ["plugin:vue/essential", "@vue/prettier"],
  // add your custom rules here
  rules: {
    'vue/max-attributes-per-line': [4,
      {
        'singleline': 2,
        'multiline': {
          'max': 1,
          'allowFirstLine': true
        }
      }
    ],
    'vue/no-v-html': 'off',
    'vue/attribute-hyphenation': 'off',
    'vue/require-prop-type': 'off',
    'vue/require-default-prop': 'off',
    // "vue/component-name-in-template-casing": [
    //   "error",
    //   {
    //     "ignores": [
    //       "nuxt",
    //       "nuxt-link"
    //     ]
    //   }
    // ],
    "no-console": [
      "error",
      {
        "allow": [
          "log",
          "error",
          "warn"
        ]
      }
    ]
    
  },
  parserOptions: {
    parser: "babel-eslint"
  }
};
