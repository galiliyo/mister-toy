<template>
    <section class="toy-preview">
    <h1>{{toy.name}}</h1>
      <img :src="require('../assets/imgs/'+toy.img+'.webp')" xs />
      <h2>Price : {{toy.price}}</h2>
      <p>Category : {{toy.type}}</p>
      <router-link :to="`/toy/${toy._id}`">Details</router-link>
  </section>
</template>

<script>
export default {
  data() {
    return {};
  },
  computed: {
    inStock() {
      return this.toy.inStock ? "In stock" : "Out of stock";
    }
  },
  props: {
    toy: {
      type: Object
    }
  }
};
</script>

<style scoped lang="scss" src="@/styles/components/ToyPreview.scss" >
</style>
