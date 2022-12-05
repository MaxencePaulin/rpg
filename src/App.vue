<template>
  <v-app>
    <v-app-bar
      app
      color="primary"
      dark
    >
      <NavBar :titles="[
          {text: 'Personnages', color: 'red'},
          {text: 'Ville', color: 'green'}
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
        this.$router.push('/persos').catch(() => {
          alert('Vous êtes déjà sur la page des personnages')
        })
      }else if (idx === 1) {
        this.$router.push('/towns').catch(() => {
          alert('Vous êtes déjà sur la page des villes')
        })
      }
    }
  },
  mounted() {
    this.getAllTowns();
    this.getAllCharacs();
  }
};
</script>
