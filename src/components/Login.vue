<template lang="pug">
div.container
  div.login-wrap
    .login-wrap_title
      h1 Making Pairs
        img(src='../assets/images/clipart87652.png')
    .login-wrap_subtitle
      p ¿Buscas compañer@ para practicar Javascript? ¡Aquí podrás generar parejas aleatorias para todo tu equipo de trabajo!
    form(@submit.prevent='login').login-wrap_form
      input(type='text' placeholder='Usuario' v-model='user')
      input(type='password' placeholder='Contraseña' v-model='password')
      CustomButton(value='Login').button-login
      span.login-wrap_info ¿No tienes cuenta?
        router-link(to="/signin")  Regístrate aquí
</template>

<script>
import firebase from "firebase";
import CustomButton from './CustomButton';
import { login } from '../firebase/firebase.js'
export default {
  name: "Login",
  components: {
    CustomButton
  },
  data() {
    return {
      user: "",
      password: "",
    };
  },
  methods: {
    login() {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.user, this.password)
        .then(
          user => {
            this.user = user;
            console.log("user", user);
            this.$router.replace("home");
          },
          error => console.error(error)
        );
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
.login-wrap {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  max-width: 500px;
  padding: 3rem;
  .login-wrap_title {
    display: flex;
    align-items: center;
    h1 {
      font-size: 4.1rem;
      font-weight: 700;
      color: White;
      font-weight: bold;
    }
    img {
      width: 80px;
      height: 80px;
      margin-left: 20px;
    }
  }
  .login-wrap_subtitle {
    font-size: 1.6rem;
    color: White;
    margin: 2rem;
    width: 79%;
    text-align: center;
  }
  input {
    font-size: 1.7rem;
    border: none;
    border-bottom: 1px solid #8e9aaf;
    -webkit-text-fill-color: #0d4657;
    -webkit-box-shadow: 0 0 0px 1000px white inset;
    -webkit-transition: background-color 5000s ease-in-out 0s;
    transition: background-color 5000s ease-in-out 0s;
    outline: none;
    margin-bottom: 1.5rem;
    height: 4rem;
    padding: 1.2rem;
    width: 25rem;
    opacity: 0.8;
    border-radius: 8px;
    outline: none;
  }
  &_form {
    display: flex;
    flex-direction: column;
    width: 70%;
    align-items: center;
    
  }
  &_info {
    font-size: 1.6rem;
    color: white;
    display: flex;
    justify-content: space-around;
    width: 100%;
    font-weight: bold;
    a:hover {
      -webkit-text-fill-color: $--color-basics-1;
    }
  }
  .button-login {
    width: 40%;
    margin: 20px;
    padding: 10px 15px;
  }
  span a {
    -webkit-text-fill-color: white;
    -webkit-text-stroke: 0.012rem #8E9AAF;
    text-decoration: none;
    font-weight: bold;
  }
}

input:-webkit-autofill,
input:-webkit-autofill:hover, 
input:-webkit-autofill:focus {
  @extend input
}

h1 {
  cursor: default;
  position: absolute;
  top: 30px;
  left: 100px;
  right: 0;
  bottom: 0;
  height: 550px;  
  margin: auto;
  display: block;
  pointer-events: none;
  
  -webkit-animation: bounce .9s ease infinite alternate;
  
  font-size: 100px;
  color: #FFF;
  text-align: center;
  line-height: 100px;
  text-shadow: 0 1px 0 #CCC,
               0 2px 0 #CCC,
               0 3px 0 #CCC,
               0 4px 0 #CCC,
               0 5px 0 #CCC,
               0 6px 0 transparent,
               0 7px 0 transparent,
               0 8px 0 transparent,
               0 9px 0 transparent,
               0 10px 10px rgba(0, 0, 0, .6);
}
/* ANIMATION */
@-webkit-keyframes bounce {
  100% {
    top: -30px;
    
    text-shadow: 0 1px 0 #CCC,
                 0 2px 0 #CCC,
                 0 3px 0 #CCC,
                 0 4px 0 #CCC,
                 0 5px 0 #CCC,
                 0 6px 0 #CCC,
                 0 7px 0 #CCC,
                 0 8px 0 #CCC,
                 0 9px 0 #CCC,
                 0 30px 30px rgba(0, 0, 0, .3);
  }
}

</style>
