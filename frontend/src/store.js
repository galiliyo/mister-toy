import Vue from "vue";
import Vuex from "vuex";
import toyService from "./services/toy.service.js";

Vue.use(Vuex);

export default new Vuex.Store({
  strict: true,
  state: {
    toys: [],
    filters: {
      categories: "all",
      srchStr: "",
      inStock: true
    },
    currToy: null,
    user: {
      fullName: "Puki Ben David",
      activities: [
        {
          txt: "Added a Toy",
          at: 1523873242735
        }
      ]
    }
  },
  mutations: {
    setToys(state, { toys }) {
      state.toys = toys;
    },
    setCurrToy(state, { toy }) {
      state.currToy = toy;
    },

    deleteToy(state, { toyId }) {
      const idx = state.toys.findIndex(item => item._id === toyId);
      state.toys.splice(idx, 1);
    },
    addToy(state, { toy }) {
      state.toys.unshift(toy);
    },

    updateToy(state, { toy }) {
      const idx = state.toys.findIndex(item => item._id === toy._Id);
      state.toys.splice(idx, 1, toy);
    },
    setFilters(state, {filters}){
      state.filters.categories = filters.categories
      state.filters.inStock = filters.inStock
    }

  
  },
  actions: {
    toggleToy(context, payload) {
      let prm = toyService.getById(payload.id);
      prm.then(toy => {
        toy.isDone = !toy.isDone;
        toyService
          .save(toy)
          .then(toy =>
            context.commit({ type: "toddgleIsDone", toyId: toy._id })
          );
      });
      //   ;
    },

    loadToys(context, { filters }) {
      toyService.query(filters).then(toys => {
        context.commit({
          type: "setToys",
          toys
        });
      });
    },
    deleteToy(context, { id }) {
      toyService.remove(id).then(() => {
        context.commit({
          type: "deleteToy",
          id: id
        });
      });
    },
    saveToy(context, { toy }) {
      if (!toy._id) {
        return toyService.save(toy).then(addedToy => {
          context.commit({
            type: "addToy",
            toy: addedToy
          });
          return addedToy;
        });
      } else {
        return toyService.update(toy).then(updatedToy => {
          context.commit({
            type: "updateToy",
            toy: toy
          });
          return toy;
        });
      }
    },
    setCurrToy(context, { id }) {
      return toyService.getById(id).then(toy => {
        context.commit({
          type: "setCurrToy",
          toy: toy
        });
        return toy;
      });
    }
  },
  getters: {
    toys(state) {
      return state.toys;
    },

    getCurrToy(state) {
      return state.currToy;
    },

    getUser(state) {
      return state.user;
    },
    getFilters(state) {
      return state.filters;
    }
  }
});
