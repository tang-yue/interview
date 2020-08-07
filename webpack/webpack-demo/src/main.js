// 原生
// import '../style.css' // 1. 导入css文件
// import avatar from '../avatar.jpg'
// import printMe from './print.js';



// function component() {
//     var element = document.createElement('div');

//     element.innerHTML = "您好，webpack，嘿嘿";
//     element.classList.add('color_red') // 2. 添加类名

//     var img = new Image(200, 200);
//     img.src = avatar;
//     element.appendChild(img);
//     printMe()
//     return element;
// }

// document.body.appendChild(component());


// vue 

import Vue from 'vue'
import App from './app'

new Vue({
    render: h => h(App)
}).$mount('#app')

