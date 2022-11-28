<template>
  <v-container>
    <div style="float: left;">
      <h1>Les personnages</h1>
      <select v-model="idSelected">
        <option value="-1">Choisissez un personnage</option>
        <option v-for="(perso, index) in persos" :key="index" :value="index">{{perso.nom}}</option>
      </select>
    </div>
    <div style="float: right;">
      <div v-if="currentPerso">
        <h2>{{ currentPerso.nom }}</h2>
        <table style="border: 1px solid black; border-collapse: collapse;">
          <tr>
            <td class="pl-2 pr-2" style="border: 1px solid black;">Attributs</td>
            <td class="pl-2 pr-2" style="border: 1px solid black;">Emplacements</td>
          </tr>
          <tr>
            <td style="border: 1px solid black;">
              <ul>
                <li class="pl-2 pr-2" v-for="(valeur, attribut) in currentPerso.attributs" :key="attribut">{{attribut}} : {{valeur}}</li>
              </ul>
            </td>
            <td style="border: 1px solid black;">
              <ul>
                <li class="pl-2 pr-2" v-for="(emplacement, index) in currentPerso.emplacements" :key="index">{{emplacement.nom}} <span v-if="emplacement.items.length > 0">
                  [{{emplacement.items.length}}] </span>: <span v-for="(item, index) in emplacement.items" :key="index">{{item.nom}}
                  <span v-if="index < (emplacement.items.length-1)">, </span></span></li>
              </ul>
            </td>
          </tr>
          <tr>
            <td class="pl-2 pr-2" style="border: 1px solid black;">or : {{currentPerso.or}}</td>
            <td class="pl-2 pr-2" style="border: 1px solid black;">items achetés <span v-if="currentPerso.itemsAchetes.length > 0">
              [{{currentPerso.itemsAchetes.length}}] </span>:
              <CheckedList @checked-changed="updateTable($event)" @item-button-clicked="alertItem($event)" @list-button-clicked="alertSelectedItems()" :data="currentPerso.itemsAchetes" :fields="currentPerso.emplacements" :itemCheck="itemCheck" :checked="checked" :itemButton="itemButton" :listButton="listButton"></CheckedList>

              <span v-for="(item, index) in currentPerso.itemsAchetes" :key="index">{{item.nom}}
              <span v-if="index < (currentPerso.itemsAchetes.length-1)">, </span></span></td>
          </tr>
        </table>
      </div>
    </div>
  </v-container>
</template>

<script>
import CheckedList from '@/components/CheckedList.vue'

import {mapState} from 'vuex'
export default {
  name: 'PersosView',
  components: {
    CheckedList
  },
  data: () => ({
    currentPerso: null,
    idSelected: -1,
    fields: ['nom', 'attributs', 'emplacements', 'or', 'itemsAchetes'],
    itemCheck: true,
    checked: [false, false, false, false, false],
    itemButton: {
      show: true,
      text: 'itemButton'
    },
    listButton: {
      show: true,
      text: 'listButton'
    }
  }),
  computed: {
    ...mapState(['persos']),
    nbPersos() {
      return this.persos.length
    }
  },
  methods: {
    setCurrentPerso(idx) {
      if ((idx >= 0) && (idx < this.nbPersos)) {
        this.currentPerso = this.persos[idx]
      }else {
        this.currentPerso = null
      }
    },
    updateTable(idx) {
      console.log('updateTable', idx)
    },
    alertItem(idx) {
      alert('Item : ' + this.currentPerso.itemsAchetes[idx].nom + ' ' + this.currentPerso.itemsAchetes[idx].prix)
      console.log('alertItem', idx)
    },
    alertSelectedItems() {
      let selectedItems = []
      for (let i = 0; i < this.checked.length; i++) {
        if (this.checked[i]) {
          selectedItems.push(this.currentPerso.itemsAchetes[i].nom)
        }
      }
      alert('Selected items : ' + selectedItems.join(', '))
      console.log('alertSelectedItems')
    }
  },
  watch: {
    idSelected(newVal) {
      console.log("nouvelle sélection : " + newVal);
      this.setCurrentPerso(newVal);
    }
  },
  mounted() {
    this.currentPerso = null
    this.idSelected = -1
  }
}
</script>
