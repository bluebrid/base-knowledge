
// app Vue instance
var render = Vue.compile('<h1>h1</h1>').render;
var app = new Vue({
  el: '#app',
  render: render
});
// mount
// app.$mount('#app');
