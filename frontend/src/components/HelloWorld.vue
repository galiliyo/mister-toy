<template>
  <v-container>{{toys}} HEI
  </v-container>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed: {
    toys(){
      return this.$store.getters.toys
    }
  },
  methods:{
    x(){
      console.log(this.$store.toys)
    }
  },
  created() {
  }
};
</script>

<style>
</style>
