<template>
  
</template>

<script>
import firebase from "firebase";
export default {
  name: "LogOut",
  props: {
    msg: String
  },
  methods: {
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
        .catch((error) => console.error(error));
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

</style>
