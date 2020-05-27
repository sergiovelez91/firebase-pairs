<template lang="pug">
.people-container
  .people-container__info
    p Número de personas: 
      span {{ this.people.length }}
  div(v-if='this.people.length !== 0').list-people
    div(v-for='person in people')
      Tag(:name="person.name"  @deleteName="deletePerson(person.id)" ref="tag")
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import Tag from "./Tag.vue";
import CustomButton from "./CustomButton";
import AddPerson from "./AddPerson";

export default {
  name: "People",
  props: {
    people: Array,
    
  },
  components: {
    Tag,
    CustomButton,
    AddPerson
  },
  data() {
    return {

    };
  },
  methods: {
    deletePerson(personId) {
      console.log(personId)
      this.$emit('deleteName', personId)
    } 
  }
};
</script>

<style lang="scss" scoped>
.people-container {
  padding: 20px;
  height: auto;
  width: 100%;
  .list-people {
    display: flex;
    flex-wrap: wrap;
    border: 3px solid white;
    border-radius: 15px;
  }
  &__info {
		display: flex;
		flex-direction: row;
    margin-bottom: 0.9rem;
		p {
			color: white;
			margin-top: 1rem;
			font-size: 2.5rem;
			width: auto;
			span {
				font-size: 3rem;
			}
		}
	}
}
</style>
