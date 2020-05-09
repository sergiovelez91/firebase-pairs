<template lang="pug">
div.people-container
    div.people-container_add
      input(v-model="person" @keyup.enter='addName' placeholder="Añade un nombre")
      CustomButton(value='Añadir' @click.native='addName').button-save
    p Número de personas: 
      span {{ this.people.length }}
    div.list-people
      div(v-for='person in people')
        Tag(:name="person.name" :personId="person.id" @deleteName="deletePerson")
      
    
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import Tag from "./Tag.vue";
import CustomButton from "./CustomButton";

export default {
  name: "People",
  components: {
    Tag,
    CustomButton,
  },
  data() {
    return {
      people: [],
      person: "",
      newPeople: []
    };
  },
  created() {
    this.showPeople();
  },
  methods: {
    showPeople() {
      db.collection("people")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((person) => {
            this.people.push({ name: person.data().name, id: person.id });
            console.log("peopleARR!",this.people)
          });
        });
    },
    async addName() {
      try {
        if (this.person) {
          let id = await db.collection("people").add({
            name: this.person,
          });
          this.people.push({ name: this.person, id: id.id });
          this.person = null;
        } else {
          alert("Se te olvidó añadir a alguien");
        }
      } catch (error) {
        console.log(error);
      }
    },
    deletePerson(personId) {
      db.collection("people")
        .doc(personId)
        .delete() 
        .then(() => {
          console.log(this.people)
          this.people = this.newPeople;
          this.showPeople();
          // console.log("newPeople",this.newPeople)
          console.log("Documento borrado");
        })
        .catch(function(error) {
          console.error("Error al borrar el documento: ", error);
        });
    },
  },
  computed: {
    personInfo() {
      console.log("computed", this.people)
        return this.newPeople
    }
  }
};
</script>

<style lang="scss" scoped>
.people-container {
  padding: 20px;
  height: auto;
  width: 50%;
  &_add {
    padding: 1rem;
    display: flex;
    width: auto;
    align-items: center;
    input {
      font-size: 1.7rem;
      border: none;
      border-bottom: 1px solid #8e9aaf;
      -webkit-text-fill-color: #0d4657;
      -webkit-box-shadow: 0 0 0px 1000px white inset;
      -webkit-transition: background-color 5000s ease-in-out 0s;
      transition: background-color 5000s ease-in-out 0s;
      outline: none;
      height: 4rem;
      padding: 1.2rem;
      width: 25rem;
      opacity: 0.8;
      border-radius: 8px;
      margin-right: 2rem;
      outline: none;
    }
    .button-add:hover {
      background-color: #be9b32;
    }
  }
  p {
    color: white;
    margin: 1rem;
    font-size: 2.5rem;
    width: auto;
    span {
      font-size: 3rem;
    }
  }
  .list-people {
    display: flex;
    flex-wrap: wrap;
    width: 68%;
    border: 3px solid white;
    border-radius: 15px;
  }
}
button {
  width: 10rem;
  padding: 10px 0px;
  background-color: #629283;
  color: white;
  font-weight: 700;
  font-size: 1.8rem;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  -webkit-transition: all 0.3s ease;
  transition: all 0.3s ease;
  outline: none;
  &:hover {
    background-color: white;
    color: #629283;
  }
}
</style>
