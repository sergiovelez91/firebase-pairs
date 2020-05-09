<template lang="pug">
    div
      h1 Sign Up
      form(@submit.prevent='signIn')
        input(type='text' placeholder='Usuario' v-model='user')
        input(type='password' placeholder='Contraseña' v-model='password')
        input(type='submit' value='Submmit')
</template>

<script>
import firebase from "firebase";
export default {
  name: "SignIn",
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

<style></style>
