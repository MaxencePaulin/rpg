<template>
  <v-container>
    <h1>Les personnages</h1>
    <ul>
      <li v-for="(perso, index) in persos" :key="index">{{ perso.nom }}</li>
    </ul>
  </v-container>

</template>

<script>

import {mapState} from 'vuex'
export default {
  name: 'PersosView',
  data: () => ({

  }),
  computed: {
    ...mapState(['persos'])
  }

}
</script>
