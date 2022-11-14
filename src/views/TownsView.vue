<template>
  <v-container>
    <h1>Les villes</h1>
    <ul>
      <li v-for="(ville, index) in villes" :key="index">{{ ville.nom }}</li>
    </ul>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
export default {
  name: 'TownsView',
  data: () => ({

  }),
  computed: {
    ...mapState(['villes'])
  }

}
</script>
