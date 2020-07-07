<template lang="pug">
div
  div.show-numbers
    div.big-outer.animate-big-left-to-right
    div.small-fill.animate-small-left-to-right
  .header
    div.cta-1
      button(@click="logOut").button-logout Logout
  .home-container
    .home-container__add
      AddPerson(@addPerson="addName" :people="people")
      People(:people="people" @deleteName="deletePerson")
    .button-pairs_container
      CustomButton(value='Hagamos parejas' @click.native='makePairs').button-pairs
    Pairs(:pairs="pairs" ).home-container__pairs

</template>

<script>
// @ is an alias to /src
import firebase from "firebase"
import { db } from "../main";
import People from '@/components/People.vue'
import Pairs from '@/components/Pairs.vue'
import CustomButton from '@/components/CustomButton.vue'
import AddPerson from '@/components/AddPerson.vue'


export default {
  name: 'Home',
  components: {
    People,
    Pairs,
    CustomButton,
    AddPerson
  },
  created() {
    this.showPeople();
    this.showPairs();
    this.getUserInfo();
  },
  data() {
		return {
      people: [],
      pairs: [],
      person: "",
      userId: "",
      countDown: 3,
      showCounter: false
		};
	},
  methods: {
    getUserInfo() {
      firebase.auth().onAuthStateChanged(user => {
        if (user) this.userId = user.uid
      });
    },
    showPeople() {
      db.collection("people")
        .get()
        .then((querySnapshot) => {
          this.people = [];
          querySnapshot.forEach((person) => {
            const dataPerson = person.data()
            dataPerson.userSession === this.userId && this.people.push({...dataPerson, id: person.id})
          });
        });
    },
    async addName(person) {
      if (person) {
        console.log(person)
        const newPerson = {
          name: person,
          userSession: this.userId,
        }
        
        let data = await db.collection("people").add(newPerson);
        this.people.push({...newPerson, id: data.id});

      } else {
        alert("Se te olvidó añadir a alguien");
      }  
    },
    deletePerson(personId) {
      console.log(personId)
      db.collection("people")
        .doc(personId)
        .delete()
        .then(() => {
          console.log(this.people);
          console.log("Documento borrado");
          this.showPeople();
        })
        .catch(function(error) {
          console.error("Error al borrar el documento: ", error);
        });
    },
    logOut() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
        .catch((error) => console.error(error));
    },
    async makePairs() {
      console.log("PAREJAS")
      this.pairs = []
      let evenArr = []
      let oddArr = []
      let aleatoryArr = [...this.people]

      const count = await this.getCountDown()

      aleatoryArr = aleatoryArr.sort(() => { return 0.5 - Math.random() })
      for(let [i, person] of aleatoryArr.entries()) {
        if(i % 2 === 0) {
          evenArr.push(person)
        }
        if (i % 2 !== 0) {
          oddArr.push(person)
        }
      }

      for(let [i, person] of evenArr.entries()){
        console.log("i" , i , oddArr.length)
        if(evenArr.length !== oddArr.length ) {
          if (i === oddArr.length -1) {
            this.pairs.push(`${person.name} - ${oddArr[i].name} - ${evenArr[evenArr.length -1].name}`)
            return
          } else {
            this.pairs.push(`${person.name} - ${oddArr[i].name}`)
          }
        } else {
          this.pairs.push(`${person.name} - ${oddArr[i].name}`)
        }
      }
        console.log(this.pairs)
    },
    showPairs() {
      db.collection("pairs")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((pair) => {
            this.pairs.push({ name: pair.data().name, id: pair.id });
          });
        });
    },
    getCountDown() {
      return new Promise(resolve => {
        setTimeout(() => {
          var big = document.querySelector(".show-numbers > .big-outer");
          var small = document.querySelector(".show-numbers > .small-fill");
          big.innerHTML = "3";
          small.innerHTML = "3";
        },1000);
        setTimeout(() => {
          var big = document.querySelector(".show-numbers > .big-outer");
          var small = document.querySelector(".show-numbers > .small-fill");
          big.innerHTML = "2";
          small.innerHTML = "2";
        },2000);
        setTimeout(() =>{
          var big = document.querySelector(".show-numbers > .big-outer");
          var small = document.querySelector(".show-numbers > .small-fill");
          big.innerHTML = "1";
          small.innerHTML = "1";
        },3000);
        setTimeout(() => {
          var big = document.querySelector(".show-numbers > .big-outer");
          var small = document.querySelector(".show-numbers > .small-fill");
          big.innerHTML = "PAREJAS";
          big.classList.remove("animate-big-left-to-right");
          small.innerHTML = "PAREJAS";
          small.classList.remove("animate-small-left-to-right");
          small.classList.add("show-scale-2");
          small.style.left = "50%";
          small.style.fontSize = "25vh";
          resolve()
        },4000);
        setTimeout(() =>{
          var show = document.querySelector(".show-numbers");
          show.style.display = "none";
        },6500);
      })
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
      0% {
        border-radius: 0% 0%;
      }
      6% {
        border-radius: 35% 15%;
      }
      12% {
        border-radius: 20% 30%;
      }
      18% {
        border-radius: 10% 40%;
      }
      24% {
        border-radius: 20% 50%;
      }
      30% {
        border-radius: 60% 10%;
      }
      36% {
        border-radius: 30% 20%;
      }
      42% {
        border-radius: 15% 35%;
      }
      50% {
        border-radius: 35% 15%;
      }
      58% {
        border-radius: 20% 30%;
      }
      64% {
        border-radius: 10% 40%;
      }
      70% {
        border-radius: 20% 50%;
      }
      76% {
        border-radius: 40% 10%;
      }
      82% {
        border-radius: 30% 20%;
      }
      88% {
        border-radius: 15% 35%;
      }
      100% {
        border-radius: 0% 0%;
      }
    }
  }
}
.home-container {
  display: flex;
  &__add {
    width: 40%;
  }
}
.button-pairs {
  width: 100%;
  background-color: $--color-basics-1;
  color: white;
  padding: 20px;
  box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.5);
  &_container {
    display: flex;
    align-items: start;
    width: 20%;
    justify-content: center;
    padding: 20px;
  }
  &:hover {
    color: #0d4657;
    background-color: white;
    box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);
  }
}

.countDown__wrap {
  color: white;
  font-size: 50px;
}

html,body{margin:0;padding:0;position:relative;width:800%;height:80%;overflow:hidden;}
body{background:#252C37;background-image:url('https://cdn.gamer-network.net/2019/usgamer/NFS-Heat-Circuit-Race-Header.jpg/EG11/thumbnail/1920x1080/format/jpg/quality/65/how-to-make-money-fast-in-need-for-speed-heat.jpg');background-size:cover;background-repeat:no-repeat;background-position:center;}
.show-numbers{position:absolute;width:vw;height:60vh;top:50%;left:50%;transform:translate(-50%,-50%);font-family:"Poppins",sans-serif;font-weight:600;font-style:italic;}
.show-numbers > .big-outer{
  position:absolute;top:50%;left:50%;transform:translate(-55%,-55%);font-size:50vh;margin:0;padding:0;color:transparent;-webkit-text-stroke:2px #00BFFF;opacity:0;
}
.show-numbers > .small-fill{position:absolute;top:50%;left:80px;color:white;font-size:10vh;transform:translate(-50%,-100%);opacity:0}
.animate-big-left-to-right{animation: ltr 1s ease-in-out infinite;}
.animate-small-left-to-right{animation: ltr2 1s ease-in-out infinite;}

@keyframes ltr{
  0%{transform:translate(-55%,-55%) translateX(-10%);opacity:0;}
  30%{opacity:0.7}
  35%{opacity:1;}
  40%{opacity:0.7}
  100%{transform:translate(-55%,-55%) translateX(10%);opacity:0;}
}

@keyframes ltr2{
  0%{transform:translate(-50%,-100%) translateX(-30%);opacity:0;}
  15%{opacity:0.7}
  40%{opacity:1;}
  65%{opacity:0.7}
  100%{transform:translate(-50%,-100%) translateX(30%);opacity:0;}
}
.show-scale-1{
  animation: show-scale 2.5s ease-in-out;
}
.show-scale-2{
  animation: show-scale2 2.5s ease-in-out;
}
@keyframes show-scale{
  0%{opacity:0}
  50%{opacity:1;}
  100%{opacity:0;
  transform: translate(-55%,-55%) scale(0.5);}
}
@keyframes show-scale2{
  0%{opacity:0;transform: translate(-55%,-55%);}
  50%{opacity:1;}
  100%{opacity:0;
  transform: translate(-55%,-55%) scale(0.5);}
}
</style>
