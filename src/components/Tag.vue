.<template lang="pug">
    .tag_container
        .title {{ name }}
        i(@click="$emit('deleteName', personId)").material-icons close
        
</template>
<script>
import firebase from "firebase"
import {db} from '../main'

export default {
  name: "Tag",
  props: {
    name: String,
    personId: String
  },
  components: {},
  data() {
    return {};
  },
  methods: {

  },
};
</script>

<style lang="scss" scoped>
.tag_container {
  border: 2px solid white;
  padding: 5px 10px 5px 5px;
  margin: 10px;
  color: white;
  width: auto;
  border-radius: 10px;
  position: relative;
  display: flex;
  align-items: center;
  i {
    color: white;
    cursor: pointer;
    font-size: 18px;
    &:hover {
      color: red;
    }
  }
}
</style>
