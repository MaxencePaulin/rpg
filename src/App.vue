<template>
  <v-app>
    <v-app-bar
      app
      color="dark"
      dark
    >
      <NavBar :titles="titles" @menu-clicked="goTo">
        <template #link-to="{link}">
          <v-btn :color="link.color" rounded text>{{link.text}}</v-btn>
        </template>
      </NavBar>
    </v-app-bar>

    <v-main class="mainPage">
      <router-view name="central"/>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from 'vuex'
import NavBar from "@/components/NavBar";

export default {
  name: 'App',
  components: {NavBar},
  data: () => ({
    titles: [
        {text:'Accueil', color: 'green', path: '/'},
        {text:'Personnages', color: 'blue', path: '/persos'},
      {text:'Villes', color: 'red', path: '/towns'},

    ],
    currentIndex: -1
  }),
  methods: {
    ...mapActions(['getAllTowns', 'getAllCharacs']),
    goTo(index) {
      console.log(index)
    }
  },
  mounted() {
    this.getAllTowns()
    this.getAllCharacs()
  }
};
</script>

<style>
.mainPage{
  background-image: url('@/assets/background.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
}
</style>
