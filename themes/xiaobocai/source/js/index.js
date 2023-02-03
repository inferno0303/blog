const backToTopBtm = () => {
    let btm = document.createElement("button");
    btm.innerHTML = "↑";
    btm.className = "back-to-top";
    btm.id = "back-to-top"
    document.body.appendChild(btm);
    window.onscroll = () => {
        if (document.body.scrollTop > 600 || document.documentElement.scrollTop > 600) {
            document.getElementById("back-to-top").style.display = "block";
          } else {
            document.getElementById("back-to-top").style.display = "none";
          }
    };
    document.getElementById("back-to-top").addEventListener("click", function() {
        document.body.scrollTop = 0;
        document.documentElement.scrollTop = 0;
    });
}
// backToTopBtm()

// import { createApp } from "https://unpkg.com/vue@3.2.47/dist/vue.esm-browser.js";

// const app = createApp({
//     data() {
//         return {
//             message: 'Hello Vue!',
//             count: 0
//         }
//     }
// })
// app.mount('#app');