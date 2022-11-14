<template>
  <v-container>
    <h1>Les personnages</h1>
    <label for="filterperso">filtre : </label><input v-model="filter" id="filterperso">
    <ul>
      <li v-for="(perso, index) in persosFiltre" :key="index">{{ perso.nom }}</li>
    </ul>
  </v-container>

</template>

<script>

import {mapState} from 'vuex'
export default {
  name: 'PersosView',
  data: () => ({
    filter: '',
    filterActive: false
  }),
  computed: {
    ...mapState(['persos']),
    persosFiltre() {
      return this.persos.filter(c => c.nom.includes(this.filter))
    }
  }

}
</script>
