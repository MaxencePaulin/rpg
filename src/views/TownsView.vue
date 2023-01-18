<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les villes</h1>
        <select v-model="selected" class="villeselect" @change="currentTown(selected)">
          <option disabled value="">Sélectionner une ville</option>
          <option v-for="(ville, index) in villes" :key="index" :value="ville">{{ville.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="selected" style="text-align: left; width: 80%">
        <h1>{{this.selected.nom}}</h1>
        <table>
          <tr>
          <th>rues: {{this.selected.rues.length}}</th>
          <th>boutiques</th>
          </tr>
          <tr v-for="(street, index) in this.selected.rues" :key="index">
            <td>
              {{street.nom}} : {{ street.boutiques.length }} boutiques
            </td>
            <td>
              <CheckedList
                  :data="street.boutiques"
                  :fields="['nom']"
                  :item-button="{show: true, text: 'select'}"
                  @item-button-clicked="shopSelected(index, $event)"
              >
              </CheckedList>
            </td>
          </tr>
        </table>
        <ShopDetails :shop="currentShop"></ShopDetails>
      </div>
    </div>
  </v-container>
</template>

<script>
import CheckedList from "@/components/CheckedList";
import ShopDetails from "@/components/ShopDetails";
import {mapState, mapMutations} from 'vuex'
export default {
  name: 'TownsView',
  components: {CheckedList, ShopDetails},
  data: () => ({
    filter: '',
    filterActive: false,
    currentShop: null,
    selected: null,
  }),
  computed: {
    ...mapState(['villes']),
    villesFiltre() {
      if (this.filterActive) {
        return this.villes.filter(v => v.nom.includes(this.filter))
      }
      else {
        return this.villes
      }
    },
  },
  methods: {
    townSelected(evt) {
      this.filter = evt
      this.currentShop = null // pour enlever la boutique courante affichée si on change de ville
    },
    ...mapMutations(['setCurrentShop', 'setCurrentTown']),
    shopSelected(streetIndex, shopIndex) {
      this.currentShop = this.selected.rues[streetIndex].boutiques[shopIndex]
      this.setCurrentShop(this.currentShop);
    },
    currentTown (ville) {
        if (ville !== null) {
          this.setCurrentTown(ville)
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
