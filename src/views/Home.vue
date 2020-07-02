<template lang="pug">
div
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
      userId: ""
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
            // console.log(person.data())
            const dataPerson = person.data()
            dataPerson.userSession === this.userId && this.people.push(dataPerson)
          });
        });
    },
    async addName(person) {
      try {
        if (person) {
          const newPerson = {
            name: person,
            userSession: this.userId
          }
          let id = await db.collection("people").add(newPerson);
          console.log("id", id)
          this.people.push({...newPerson,id: id.id});

        } else {
          alert("Se te olvidó añadir a alguien");
        }
      } catch (error) {
        console.log(error);
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
    makePairs() {
      this.pairs = []
      let evenArr = []
      let oddArr = []
      let aleatoryArr = [...this.people]

      aleatoryArr = aleatoryArr.sort(() => { return 0.5 - Math.random() })
      for(let [i, person] of aleatoryArr.entries()) {
        if(i % 2 === 0) {
          evenArr.push(person)
        }
        if (i % 2 !== 0) {
          oddArr.push(person)
        }
      }
        console.log("even", evenArr)
        console.log("odd", oddArr)

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
    background-color:white;
    box-shadow: 0px 5px 10px 5px rgba(0, 0, 0, 0.3);
  }

}
</style>
