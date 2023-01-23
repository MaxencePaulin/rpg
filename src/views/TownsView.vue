<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les villes</h1>
        <select v-model="selected" class="villeselect" @change="currentTown(selected)">
          <option disabled value="">Sélectionner une ville</option>
          <option v-for="ville in villes" :key="ville._id" :value="ville">{{ville.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
        <div v-if="selected" style="text-align: left; width: 70%">
            <router-view name="streets"></router-view>
        </div>
    </div>
      <div v-if="currentShop" class="mt-10">
          <ShopDetails :shop="currentShop"></ShopDetails>
      </div>
  </v-container>
</template>

<script>

import {mapState, mapMutations} from 'vuex'
import ShopDetails from "@/components/ShopDetails";
export default {
  name: 'TownsView',
  components: {
    ShopDetails
  },
  data: () => ({
    filter: '',
    filterActive: false,
    selected: null,
  }),
  computed: {
      ...mapState(['currentShop']),
      ...mapState(['villes']),
  },
  methods: {
    townSelected(evt) {
      this.filter = evt
      this.currentShop = null // pour enlever la boutique courante affichée si on change de ville
    },
    ...mapMutations(['setCurrentTown']),
    currentTown (ville) {
        if (ville !== null) {
            this.setCurrentTown(ville)
            this.$router.push({name: 'streets', params: {idtown: ville._id}})
        }
    },
  },
}
</script>

<style>
table, th, td {
  border: 1px solid;
}
.townselect {
  background-color: lightgray;
}
.villeselect {
  background-color: lightgray;
}
</style>
