<template>
  <div>
    <table v-if="shop">
      <tr>
        <td colspan="2">{{shop.nom}}</td>
      </tr>
      <tr>
        <td>Stock : {{shop.itemStock.length}} items</td>
        <td>Sur commande : {{shop.itemCommande.length}} items</td>
      </tr>
      <tr>
        <td>
          <CheckedList
              :data="shop.itemStock"
              :fields="['text']"
              :checked="checkedItemsStock"
              item-check
              :item-button="{show: true, text: 'acheter'}"
              :list-button="{show: true, text: 'acheter sélectionnés'}"
              @checked-changed="toggleItemStock"
              @item-button-clicked="buyOneItem"
              @list-button-clicked="buySelectedItems"
          >
              <template #item="{item}">
                  {{item.nom}} : {{item.prix}} po
              </template>
              <template #item-button="{item, indexRow}">
                  <v-btn :color="indexRow % 2 === 0 ? 'red' : 'blue'" x-small @click="buyOneItem(item)">Buy</v-btn>
              </template>
              <template #list-button>
                  <v-btn color="green" x-small @click="buySelectedItems">Buy selected</v-btn>
              </template>
          </CheckedList>
        </td>
        <td>
          <CheckedList
              :data="shop.itemCommande"
              :fields="['text']"
              :item-button="{show: true, text: 'commander'}"
              @item-button-clicked="orderOneItem"
          >
              <template #item="{item}">
                  {{item.nom}} : {{item.time = Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000}} ms
              </template>
              <template #item-button="{item}">
                  <v-btn :color="['red', 'green', 'blue', 'orange', 'yellow', 'magenta', 'ligthgray', 'lime', 'purple', 'lightblue'][itemCats.indexOf(item.type)]" x-small @click="orderOneItem(item)">Order</v-btn>
              </template>
          </CheckedList>
        </td>
      </tr>
    </table>
  </div>
</template>

<script>
import CheckedList from "@/components/CheckedList";
import {mapGetters, mapMutations} from 'vuex'
import { itemCats } from "@/services/data.service";

export default {
  name: "ShopDetails",
  components: {CheckedList},
  props: {
    shop: Object,
  },
  data: () => ({
    idSelectedItemsStock: [],
      itemCats:itemCats,
  }),
  computed: {
    checkedItemsStock() {
      let tab = []
      for(let i=0;i<this.shop.itemStock.length;i++) {
        if (this.idSelectedItemsStock.includes(i)) tab.push(true)
        else tab.push(false)
      }
      return tab
    },
    // d'après l'énoncé, chaque item apparaît sous la forme nom : prix po.
    // il n'est donc pas possible d'utiliser directement les champs d'un item dans CheckedList,
    // puisque les : et le po sont des données statiques externes aux tableaux d'items de la boutique.
    // C'est pourpqui les 2 fonctions suivantes recalculent un noveau tableau avec le texte qui va bien.
    // itemsStock() {
    //   return this.shop.itemStock.map(e => ({text: e.nom+' : '+e.prix+' po'}) )
    // },
    // itemsCommande() {
    //   return this.shop.itemCommande.map(e => ({text: e.nom+' : '+e.prix+' po'}) )
    // },
  },
  methods: {
    toggleItemStock(index) {
      let id = this.idSelectedItemsStock.indexOf(index)
      if (id === -1) {
        // ajoute index
        this.idSelectedItemsStock.push(index)
      }
      else {
        // enleve index
        this.idSelectedItemsStock.splice(id,1)
      }
    },
    ...mapGetters(['getOrCurrentPerso']),
    ...mapMutations(['sell']),
    buyOneItem(index) {
      console.log('achat de '+this.shop.itemStock[index].nom)
        if (this.getOrCurrentPerso() === 0) {
            alert('Vous devez sélectionner un personnage avant de pouvoir acheter des objets.')
        }
        else if (this.getOrCurrentPerso() < this.shop.itemStock[index].prix) {
            alert('Vous n\'avez pas assez d\'argent pour acheter cet objet.')
        }
        else {
            return this.sell(this.shop.itemStock[index])
        }
    },
    buySelectedItems() {
      console.log('achat des items d\'indice '+this.idSelectedItemsStock)
    },
    orderOneItem(index) {
      console.log('commande de '+this.shop.itemCommande[index].nom)
      let time = Math.floor(Math.random() * (10000 - 2000 + 1)) + 2000;
      if (confirm('Commande de '+this.shop.itemCommande[index].nom+'. Temps estimé : '+time+' ms. Continuer ?')) {
        this.$store.dispatch('order', {item: this.shop.itemCommande[index], time: this.shop.itemCommande[index].time})
      }
    }
  },
  watch: {
    // Si on change de boutique, le tableau idSelectedItemStock ne va pas changer.
    // Il y a donc toujours des items sélectionnés quand on clique sur une nouvelle boutique.
    // Cela peut amener une erreur si leur indice n'existe pas. Il faut donc vider ce tableau,
    // mais comme c'est une variable locale, le seul moyen de le modifier "simplement" en cas
    // de changement de boutique, c'est d'observer un changement de la props shop grâce à un watcher.
    shop() {
      this.idSelectedItemsStock.splice(0)
    }
  }
}
</script>

<style scoped>

</style>