

<template>
  <v-container fluid>
    <v-layout row xs12>
      <v-flex>
        <v-img
          v-if="toy"
          width="90%"
          height="180px"
          contain
          class="mx-auto mt-2"
          :src="require('../assets/imgs/'+ 1 +'.webp')"
        ></v-img>
        <div class="details">
          <div class="keys">
            <h4>Name</h4>
            <h4>Type</h4>
            <h4 v-if="toy.inStock">In Stock</h4>
          </div>
          <div class="values">
            <h4>{{toy.name}}</h4>
            <h4>{{toy.type}}</h4>
            <h4>{{toy.price}}</h4>
          </div>
        </div>
        <v-btn color="info" @click.native="clickedEdit()">Edit</v-btn>
      </v-flex>
    </v-layout>
  </v-container>
</template>
 
<script>
import toyService from "../services/toy.service.js";
export default {
  name: "ToyDetails",
  data: () => ({
    toy: {}
  }),
  props: {},
  computed: {},
  methods: {
    clickedEdit(id) {
      this.$router.push(`/edit/${this.toy._id}`);
    }
  },
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.$store.dispatch({ type: "setCurrToy", id })
      .then(()=>{
        this.toy = this.$store.getters.getCurrToy;

      });
    }
  },
  destroyed() {
    
  },
};
</script>