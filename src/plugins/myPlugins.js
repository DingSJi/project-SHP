let myPlugins = {}

myPlugins.install = function (Vue, options) {
  // Vue.prototype.$bus
  // Vue.component
  // Vue.filter...
  //定义全局指令 v-upper 任何组件就可以直接使用
  Vue.directive(options.name, (element, binding) => {
    element.innerHTML = binding.value.toUpperCase()
  })
}

export default myPlugins