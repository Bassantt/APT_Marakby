import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";
import Home from "../views/Home.vue";
import Login from "../views/Login.vue";
import Admin from "../views/Admin.vue";
import Manager from "../views/Manager.vue";
import SearchResult from "../views/SearchResult.vue";
import Signup from "../views/Signup.vue";
import Shipview from "../views/Shipview.vue";
import Book from "../views/Book.vue";
import EditUser from "../views/EditUser.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/login",
    name: "Login",
    component: Login,
  },
  {
    path: "/Admin/:AdminID",
    name: "Admin",
    component: Admin,
  },
  {
    path: "/SearchResult/:Searchvalue/:searchwith",
    name: "SearchResult",
    component: SearchResult,
  },
  {
    path: "/Manager/:mangerID",
    name: "Manager",
    component: Manager,
  },
  {
    path: "/EditUser/:EditUserID",
    name: "EditUserr",
    component: EditUser,
  },
  {
    path: "/Signup",
    name: "Signup",
    component: Signup,
  },
  {
    path: "/Shipview/:shipID",
    name: "Shipview",
    component: Shipview,
  },
  {
    path: "/Book/:shipID",
    name: "Book",
    component: Book,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
  store,
});

router.beforeEach((to, from, next) => {
  console.log(store.getters["Authorization/GetStatus"]);
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    var status = localStorage.getItem("Authorization");
    if (!status) {
      next("/UnAuthorized");
      return;
    }
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.toArtist)) {
    if (store.getters["Authorization/GetStatus"] != "success") {
      next("/login");
      return;
    }
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.ismanager)) {
    status = localStorage.getItem("Authorization");
    var ismanager = localStorage.getItem("is-manager");
    if (!status || ismanager != "manager") {
      next("/UnAuthorized");
      return;
    }
  } else {
    next();
  }
  if (to.matched.some((record) => record.meta.isLogged)) {
    if (store.getters["Authorization/GetStatus"] == "success") {
      next("/");
      return;
    }
  } else {
    next();
  }
});
export default router;
