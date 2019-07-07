<template>
  <section :class="navClass">
    <button class="btn nav-btn" @click="toggleNav">☰</button>
    <div >
      <section class="flex-column side-nav " >
        <router-link :to="`/`" class="logo">Toys</router-link>
      <toy-filter v-if="showFilter"></toy-filter>
      </section>
      <section @click="toggleNav" class="screen"></section>
    </div>
  </section>
</template>
<script>
import ToyFilter from "@/components/ToyFilter";

export default {
  
  data() {
    return {
      isOpen: false
    };
  },
  methods: {
    toggleNav() {
      this.isOpen = !this.isOpen;
    }
  },
  computed: {
    navClass() {
      return this.isOpen ? "open" : "";
    },
    showFilter(){
      return this.$route.path === '/'
    }
  },
  created() {
  },
  components:{
    ToyFilter,
  }
};
</script>

<style lang="scss" scoped src="@/styles/components/SideNav.scss">
</style>


