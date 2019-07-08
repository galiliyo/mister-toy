<template>
  <v-container fluid grid-list-md>
    <v-layout justify-center>
      <v-spacer></v-spacer>
      <v-flex xs10 sm8 md6 mt-2>
        <v-text-field
          @input="searchList"
          v-model="filters.srchStr"
          class="mx-auto"
          autofocus
          single-line
          solo
          dark
          prepend-inner-icon="search"
          background-color="blue"
          color="white"
          max-width="120px"
          height="36px"
          label="Search Toys"
          text
          clearable
        ></v-text-field>
      </v-flex>
      <v-flex>
        <div class="text-xs-center">
          <v-menu offset-y>
            <template v-slot:activator="{ on }">
              <v-btn
                flat
                large
                outline
                right
                absolute
                icon
                color="blue"
                v-on="on"
                @click.native="toggleFilterDrawer"
              >
                <v-icon lg>filter_list</v-icon>
              </v-btn>
            </template>
          </v-menu>
        </div>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md4 lg3 v-for="(toy,idx) in toys" :key="idx">
        <toy-card :toy="toy" />
      </v-flex>
    </v-layout>
    <v-layout v-if="emptyState">
      <v-flex>
        <v-card class="mx-auto" max-width="500px" flat color="#fafafa">
          <v-img src="../assets/imgs/emptyState.jpg" width="50%" class="mx-auto"></v-img>
          <h2 class="text-xs-center">
            Oops... nothing to show.
            Try modifying your search or filter to find what you're looking for
          </h2>
          <v-card-title primary-title></v-card-title>
        </v-card>
      </v-flex>
    </v-layout>

  </v-container>
</template>


<script>
import ToyCard from "../components/ToyCard";
import eventBus from "../eventBus";
const Toys = {
  data() {
    return {
      filters: {
        srchStr: '',
        categories: "all",
        inStock: true
      }
    };
  },

  components: {
    ToyCard
  },
  computed: {
    toys() {
      var toys = this.$store.getters.toys;
      return toys;
    },

    emptyState() {
      return this.toys.length === 0;
    }
  },
  created() {
    // let nullFilters = { srchStr: "", filterBy: "none" };
    let filters = this.$store.getters.getFilters;
    this.$store.dispatch({ type: "loadToys", filters });
  },
  methods: {
    toyClicked(toy) {
      this.$router.push(`/todo-app/${id}`);
    },
    searchList() {
      this.$store.dispatch({ type: "loadToys", filters: this.filters });
    },
    toggleFilterDrawer() {
      eventBus.$emit("TOGGLE_DRAWER", null);
    }
  }
};

export default Toys;
</script>
<style scoped></style>