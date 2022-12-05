<template>
  <v-container>
    <div style="float:left;">
      <h1>Les villes</h1>
      <label for="filteractive">filtrage possible : </label><input type="checkbox" v-model="filterActive" id="filteractive">
      <div v-if="filterActive">
        <label for="filtertown">filtre : </label><input v-model="filter" id="filtertown">
        <ul>
          <li v-for="(ville, index) in villesFiltre" :key="index">{{ ville.nom }}</li>
        </ul>
      </div>
      <div v-else>
        <ul>
          <li v-for="(ville, index) in villes" :key="index">{{ ville.nom }}</li>
        </ul>
      </div>
    </div>
    <div style="float:right;">
      <div v-if="villesFiltre.length === 1">
        <h2>{{ villesFiltre[0].nom }}</h2>
        <table style="border: 1px solid black; border-collapse: collapse;">
          <tr>
            <td class="pl-2 pr-2" style="border: 1px solid black; padding: 5px">rues : {{villesFiltre[0].rues.length}}</td>
            <td class="pl-2 pr-2" style="border: 1px solid black;">boutiques</td>
          </tr>
          <tr v-for="(rue, index) in villesFiltre[0].rues" :key="index">
            <td class="pl-2 pr-2" style="border: 1px solid black;">{{rue.nom}} : {{rue.boutiques.length}} boutiques</td>
            <td style="border: 1px solid black;">
              <CheckedList
                :data="rue.boutiques"
                :fields="['nom']"
                :itemCheck="false"
                :checked="selectedItems"
                :itemButton="{show: true, text: 'Sélectionner'}"
                :listButton="{show: false, text: ''}"
              />
            </td>
          </tr>
        </table>
      </div>
    </div>
  </v-container>
</template>

<script>

import {mapState} from 'vuex'
import CheckedList from "@/components/CheckedList";

export default {
  name: 'TownsView',
  components: {CheckedList},
  data: () => ({
    filter: '',
    filterActive: false,
  }),
  computed: {
    ...mapState(['villes']),
    villesFiltre() {
      return this.villes.filter(v => v.nom.includes(this.filter))
    },
    selectedItems() {
      let selectedItems = []
      this.villesFiltre.forEach(v => {
        v.rues.forEach(r => {
          r.boutiques.forEach(b => {
            b.itemStock.forEach(() => {
              selectedItems.push(false)
            })
          })
        })
      })
      return selectedItems;

    }

  }

}
</script>
