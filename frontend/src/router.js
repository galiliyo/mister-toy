import Vue from "vue";
import Router from "vue-router";
import Toys from "./views/Toys.vue";
import ToyEdit from "./views/ToyEdit.vue";
import ToyDetails from "./views/ToyDetails.vue";

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: "/",
      name: "Toys",
      component: Toys
    },
    {
      path: "/edit/:id?",
      name: "ToyEdit",
      component: ToyEdit
    },
    {
      path: "/:id",
      name: "ToyDetails",
      component: ToyDetails
    }
  ]
});
