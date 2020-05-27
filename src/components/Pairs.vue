<template lang="pug">
    .pairs-container
         .pairs-container_title Parejas
         .pairs-container_list(v-if='this.pairs.length !== 0')
            div(v-for="pair in pairs")
                Pair(:name="pair.name")
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import Pair from "./Pair.vue";

export default {
  name: "Pairs",
  components: {
    Pair,
  },
  data() {
    return {
      pairs: [],
      pair: ""
    };
  },
  created() {
    this.showPairs();
  },
  methods: {
    showPairs() {
      db.collection("pairs")
        .get()
        .then((querySnapshot) => {
          querySnapshot.forEach((pair) => {
            this.pairs.push({ name: pair.data().name, id: pair.id });
          });
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.pairs-container {
  padding: 115px 20px 20px 20px;
  height: auto;
  width: 40%;
  display: flex;
  flex-direction: column;
  &_title {
    color: white;
    margin-bottom: 1rem;
    font-size: 2.5rem;
  }
  &_list {
    display: flex;
    flex-wrap: wrap;
    width: 100%;
    border: 3px solid white;
    border-radius: 15px;
    float: right;
  }
}
</style>
