<template>
  <div>
    <p v-for="(item, indexRow) in data" :key="indexRow">
      <input type="checkbox"
             v-if="itemCheck"
             :checked="checked[indexRow]"
             @click="$emit('checked-changed',indexRow)"
      >
      <span v-for="(field, index) in fields" :key="index">
        {{item[field]}}
      </span>
      <v-btn v-if="itemButton && itemButton.show" color="grey" @click="$emit('item-button-clicked',indexRow)">{{itemButton.text}}</v-btn>
      <v-btn v-if="sellButton && sellButton.show" class="ml-5 mr-2" color="red" @click="$emit('sell-button-clicked',indexRow)">{{sellButton.text}}</v-btn>
    </p>
    <v-btn v-if="listButton && listButton.show" color="green" @click="$emit('list-button-clicked')">{{listButton.text}}</v-btn>
  </div>
</template>

<script>
export default {
  name: "CheckedList",
  props: {
    data: Array, // les données sources
    fields: Array, // le tableau contenant le nom des champs
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste
    sellButton: Object, // l'objet pour le bouton de vente
  },
  data : () => {
    return {
    }
  }
}
</script>