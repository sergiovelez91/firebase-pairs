import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import * as firebase from "firebase";

Vue.config.productionTip = false
const firebaseConfig = {
  apiKey: "AIzaSyBXkCweUFaifsY_G-mzo4SPTKUlSyRrRFM",
  authDomain: "pairs-auth-firebase.firebaseapp.com",
  databaseURL: "https://pairs-auth-firebase.firebaseio.com",
  projectId: "pairs-auth-firebase",
  storageBucket: "pairs-auth-firebase.appspot.com",
  messagingSenderId: "30015008789",
  appId: "1:30015008789:web:b29c540b84f60bb3f79e1c"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

firebase.auth().onAuthStateChanged(function(user) {
  new Vue({
    router,
    store,
    render: h => h(App)
  }).$mount('#app')
});




