<template>
  <section>
    <v-card v-if="toy" hover @click.native="toyClicked(toy)" pt-2>
      <v-img
        width="90%"
        height="180px"
        contain
        class="mx-auto pt-2"
        :src="require('../assets/imgs/'+toy.img+'.webp')"
      ></v-img>
      <v-card-title>
        <div>
          <span class="title">{{toy.name}}</span>
          <br />
          <span class="grey--text">{{toy.type}}</span>
          <br />
          <span>${{toy.price}}</span>
        </div>
      </v-card-title>
      <v-card-actions>
        <v-rating dense readonly></v-rating>
      </v-card-actions>
    </v-card>
  </section>
</template>
  <script>
export default {
  data: () => ({
    num: 1
  }),
  props: {
    toy: Object
  },
  computed: {
    random() {
      return (Math.random() * 6 + 1) | 0;
    }
  },
  methods: {
    toyClicked(toy) {
      this.$router.push("/" + toy._id);
    }
  }
};
</script>