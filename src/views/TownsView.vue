<template>
  <v-container>
    <h1>Les villes</h1>
    <label for="filtertown">filtre : </label><input v-model="filter" id="filtertown">
    <ul>
      <li v-for="(ville, index) in villesFiltre" :key="index">{{ ville.nom }}</li>
    </ul>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
export default {
  name: 'TownsView',
  data: () => ({
    filter: '',
    filterActive: false
  }),
  computed: {
    ...mapState(['villes']),
    villesFiltre() {
      return this.villes.filter(v => v.nom.includes(this.filter))
    }
  }

}
</script>
