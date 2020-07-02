<template lang="pug">
    .pairs-container
         .pairs-container_title Parejas
         .pairs-container_list(v-if='this.pairs.length !== 0')
            div(v-for="pair in pairs")
              Pair(:name="pair")
</template>

<script>
import firebase from "firebase";
import { db } from "../main";
import Pair from "./Pair.vue";

export default {
  name: "Pairs",
  props: {
    pairs: Array,
  },
  components: {
    Pair,
  },
  data() {
    return {
      pair: ""
    };
  },
  methods: {
    
  }
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
