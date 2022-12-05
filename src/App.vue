<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <NavBar :titles="[
          {text: 'Personnages', color: 'red'},
          {text: 'Ville', color: 'yellow'}
        ]" @menu-clicked='menuClicked'
      />
    </v-app-bar>

    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>

import {mapActions} from 'vuex'
import NavBar from '@/components/NavBar.vue'

export default {
  name: 'App',

  data: () => ({
    //
  }),
  components: {
    NavBar
  },
  methods: {
    ...mapActions(['getAllTowns']),
    ...mapActions(['getAllCharacs']),
    menuClicked(idx) {
      console.log('menuClicked', idx)
      if (idx === 0) {
        this.$router.push('/persos')
      }else if (idx === 1) {
        this.$router.push('/towns')
      }
    }
  },
  mounted() {
    this.getAllTowns();
    this.getAllCharacs();
  }
};
</script>
