
<template>
  <v-app>
    <v-toolbar dark color="primary" app>
      <v-toolbar-title class="headline text-uppercase">
        <span>MISTER</span>
        <span class="font-weight-light">TOY</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-menu bottom left>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on">
            <v-icon>more_vert</v-icon>
          </v-btn>
        </template>

        <v-list v-if="items">
          <v-list-tile v-for="(item, i) in items" :key="i" @click="clickMenu(item)">
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile>
        </v-list>
      </v-menu>
    </v-toolbar>
    <v-navigation-drawer fixed v-model="drawer" right app>
      <div class="form-container">
        <h4 class="grey--text" mt-5>Filter by</h4>
        <v-form ref="form">
          <v-select
            :items="filterItems"
            multiple
            flat
            chips
            deletable-chips
            label="Categories"
            v-model=" value"
          ></v-select>
          <v-checkbox v-model="inStock" label="In Stock"></v-checkbox>
        </v-form>
        <v-btn color="primary" right absolute @click="queryDB">Apply</v-btn>
      </div>
    </v-navigation-drawer>
    <v-content>
      <router-view></router-view>
    </v-content>
  </v-app>
</template>

<script>
import Toys from "./views/Toys";
import store from "./store.js";
import Router from "./router";
import eventBus, { TOGGLE_DRAWER } from "./eventBus.js";
// import toyHeader from './cmps/toy-header.cmp.js'

export default {
  name: "App",
  components: {
    Toys
  },
  data() {
    return {
      items: [{ title: "Add Item" }],
      drawer: false,
      filterItems: ["Toddlers", "Educational", "Adult", "Funny"],
      value: [],
      inStock: true
    };
  },
  
  mounted() {
    eventBus.$on("TOGGLE_DRAWER", () => {
      console.log("toggle");
      this.drawer = !this.drawer;
    });
  },
  computed: {
    toys() {
      return this.$store.getters.toys;
    },
    filters() {
      return { categories: this.value, inStock: this.inStock };
    }
  },
  methods: {
    addToy() {
      let newToy = {
        title: this.newTitle,
        isDone: false
      };

      this.$store.dispatch({
        type: "saveToy",
        toy: newToy
      });
    },
    clickMenu(item) {
      if (item.title === "Add Item") this.$router.push("/edit/");
    },
    queryDB(filters) {
     filters = this.filters;
      this.$store.dispatch({ type: "loadToys", filters });
    },
    toggleFilterDrawer() {
      this.drawer = !this.drawer;
    }
  
  }
};
</script>
<style scoped>
.form-container {
  padding: 20px;
}
h4 {
  font-weight: normal;
  margin-top: 20px;
  margin-bottom: 10px;
}
</style>




      

   