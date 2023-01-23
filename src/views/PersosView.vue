<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <select v-model="selected" class="persoselect" @change="setcurrentPerso(selected)">
          <option disabled value="">Sélectionner un personnage</option>
          <option v-for="(perso, index) in persos" :key="index" :value="perso">{{perso.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="currentPerso != null">
          <PersoCaracs />
      </div>
    </div>
  </v-container>

</template>

<script>

import {mapState, mapMutations} from 'vuex'
import PersoCaracs from "@/components/PersoCaracs";

export default {
  name: 'PersosView',
  components: {PersoCaracs},
  data: () => ({
    selected: null,
  }),
  computed: {
    ...mapState(['persos', "currentPerso"]),
  },
  methods: {
    ...mapMutations(['setCurrentPerso']),
    setcurrentPerso (perso) {
        if (perso !== null) {
          return this.setCurrentPerso(perso)
        }
        return null
    },
  },
}
</script>

<style>
.persoselect {
  background-color: lightgray;
}
</style>