<template lang="pug">
div
  .header
    div.cta-1
      button(@click="logOut").button-logout Logout
  .home-container    
    People
    Pairs

</template>

<script>
// @ is an alias to /src
import firebase from "firebase"
import People from '@/components/People.vue'
import Pairs from '@/components/Pairs.vue'

export default {
  name: 'Home',
  components: {
    People,
    Pairs
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
}
</script>

<style lang="scss" scoped>
.header {
  display: flex;
  justify-content: flex-end;
  width: 100%;
  height: 70px;
  padding: 20px;

  .button-logout {
    background: transparent;
    border: none;
    font-size: 20px;
    font-weight: 700;
    cursor: pointer;
    color: white;
    outline: none;
    padding: 10px;
    &:hover {
      border: 2px solid #b53425;
      animation-name: cta-1;
      animation-duration: 5s;  
      animation-iteration-count: infinite;
    }

    @keyframes cta-1 {
      0% {border-radius: 0% 0%;}
      6% {border-radius: 35% 15%;}
      12% {border-radius: 20% 30%;}
      18% {border-radius: 10% 40%;}
      24% {border-radius: 20% 50%;}
      30% {border-radius: 60% 10%;}
      36% {border-radius: 30% 20%;}  
      42% {border-radius: 15% 35%;}
      50% {border-radius: 35% 15%;}
      58% {border-radius: 20% 30%;}
      64% {border-radius: 10% 40%;}
      70% {border-radius: 20% 50%;}
      76% {border-radius: 40% 10%;}
      82% {border-radius: 30% 20%;}  
      88% {border-radius: 15% 35%;}
      100% {border-radius: 0% 0%;}
      }     
    }
  


}
.home-container {
  display: flex;
  
}
</style>
