.<template lang="pug">
    .pair_container
        .title {{ name }}
  
</template>

<script>
export default {
    name: "Pair",
    data() {
        return {
            
        }
    },
    props: {
        name: String
    }
}
</script>

<style lang="scss" scoped>
.pair_container {
  border: 2px solid white;
  padding: 5px 10px 5px 5px;
  margin: 10px;
  color: white;
  width: auto;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
}
</style>