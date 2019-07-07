<template>
  <section pl-5>
    <div class="container">
      <v-layout row wrap justify-center>
        <v-flex xs12 sm6>
          <v-card height="100%" pa-5>
            <img
              :src="require('../assets/imgs/'+toy.img+'.webp')"
              v-if="toy.img"
              mx-auto
              contain
              position="center center"
              width="80%"
              style="padding:10% 10% "
            />
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 pl-5>
          <form>
            <v-text-field
              v-model="toy.name"
              v-validate="'required|max:20'"
              :counter="20"
              :error-messages="errors.collect('name')"
              label="Name"
              data-vv-name="name"
              required
            ></v-text-field>
            <v-text-field
              v-model="toy.price"
              type="number"
              v-validate="'required|max:20'"
              :error-messages="errors.collect('price')"
              label="Price"
              data-vv-name="price"
              required
            ></v-text-field>
            <v-select
              v-model="toy.type"
              v-validate="'required'"
              :items="items"
              :error-messages="errors.collect('select')"
              label="Type"
              data-vv-name="select"
              required
              placeholder="Select"
            ></v-select>
            <v-checkbox
              v-model="toy.inStock"
              label="In Stock"
              data-vv-name="checkbox"
              type="checkbox"
              required
            ></v-checkbox>
            <v-layout row wrap>
              <v-btn color="error" @click="deleteToy">delete</v-btn>
              <v-spacer></v-spacer>
              <div right class="controls">
                <v-btn flat @click="clear">clear</v-btn>
                <v-btn @click="submit">submit</v-btn>
              </div>
            </v-layout>
          </form>
        </v-flex>
      </v-layout>
    </div>
  </section>
</template>


 <script>
import eventBus, { SHOW_MSG } from "../eventBus.js";
import toyService from "../services/toy.service.js";
import VeeValidate from "vee-validate";

export default {
  name: "ToyDetails",
  data: () => ({
    toy: {
      name: "",
      type: "",
      price: "",
      img: "1",
      inStock: false
    },
    select: null,
    items: ["Select", "Educational", "Funny", "Adult", "Toddles"],
    checkbox: null,
    dictionary: {
      custom: {
        name: {
          required: () => "Name can not be empty",
          max: "The name field may not be greater than 10 characters"
          // custom messages
        },
        mounted() {
          this.$validator.localize("en", this.dictionary);
        },
        select: {
          required: "Select field is required",
          is_not: "Select"
        }
      }
    }
  }),
  created() {
    const id = this.$route.params.id;
    if (id) {
      this.$store.dispatch({ type: "setCurrToy", id }).then(() => {
        let currToy = this.$store.getters.getCurrToy;
        this.toy = Object.assign({}, currToy);
      });
    }
  },

  methods: {
    submit() {
      console.log("submitting this.toy", this.toy);
      this.$validator.validateAll().then(validate => {
        var prm = this.$store.dispatch({
          type: "saveToy",
          toy: this.toy
        });
        prm.then(savedItem => {
          eventBus.$emit(SHOW_MSG, {
            txt: `Item ${savedItem._id} Saved!`,
            type: "success"
          });
          this.shopItem = {};
          this.$router.push("/");
        });
      });
    },
    clear() {
      this.toy.name = "";
      this.select = null;
      this.checkbox = false;
      this.$validator.reset();
    },
    deleteToy() {
      var prm = this.$store.dispatch({
        type: "deleteToy",
        id: this.toy._id
      });
      prm.then(() => {
        eventBus.$emit(SHOW_MSG, {
          txt: `Item Deleted!`,
          type: "success"
        });
        this.shopItem = {};
        this.$router.push("/");
      });
    }
  }
};
</script>

