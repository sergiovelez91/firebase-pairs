<template lang="pug">
    div.container
      h1 Making Pairs
      form(@submit.prevent='signIn')
        div.container__info
          p Crea una cuenta y podrás realizar las parejas que quieras
        input(type='text' placeholder='Usuario' v-model='user')
        input(type='password' placeholder='Contraseña' v-model='password')
        div.container__submit
          CustomButton(value='Sign In').button-sign-in
          a(@click="$router.go(-1)") Atrás
</template>

<script>
import firebase from "firebase";
import CustomButton from './CustomButton';
export default {
  name: "SignIn",
  components: {
    CustomButton
  },
  data() {
    return {
      user: "",
      password: ""
    };

  },
  methods: {
    signIn() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.user, this.password)
        .then(user => {
          this.user = user;
          console.log("user", user);
          this.$router.replace("login");
        })
        .catch(error => {
          var errorCode = error.code;
          var errorMessage = error.message;
          if (errorCode == "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  justify-content: center;
  align-items: center;
  form {
    display: flex;
    flex-direction: column;
    width: 20%;
    text-align: center;
    align-items: center;
  }
  &__info {
    padding: 2rem;
    p {
      color: $--color-white;
      font-size: 1.6rem;
    }
  }
  h1 {
    font-size: 4.1rem;
    font-weight: 700;
    color: White;
    font-weight: bold;
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
  .button-sign-in {
    width: 40%;
    margin: 20px;
    padding: 10px 15px;
  }
  &__submit {
    display: flex;
    width: 100%;
    flex-direction: column;
    align-items: center;
    a {
      color:$--color-white;
      cursor: pointer;
      text-decoration: underline;
      &:hover {
        color: #0d4657;
        font-weight: bold;
      }
    }
  }
}
</style>
