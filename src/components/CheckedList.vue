<template>
  <div>
    <p v-for="(item, indexRow) in data" :key="indexRow">
      <input type="checkbox"
             v-if="itemCheck"
             :checked="checked[indexRow]"
             @click="$emit('checked-changed',indexRow)"
      >
      <slot name="item" :item="item" :indexRow="indexRow"></slot>
<!--      <span v-for="(field, index) in fields" :key="index">-->
<!--        {{item[field]}}-->
<!--      </span>-->
        <span v-if="itemButton"><slot name="item-button" :item="item" :indexRow="indexRow"></slot></span>
      <v-btn v-if="equipButton && equipButton.show" class="ml-5" color="amber" @click="$emit('equip-button-clicked',indexRow)">{{equipButton.text}}</v-btn>
      <v-btn v-if="sellButton && sellButton.show" class="ml-5 mr-2" color="red" @click="$emit('sell-button-clicked',indexRow)">{{sellButton.text}}</v-btn>
    </p>
    <span v-if="listButton"><slot name="list-button"></slot></span>
  </div>
</template>

<script>
export default {
  name: "CheckedList",
  props: {
    data: Array, // les données sources
    // fields: Array, // le tableau contenant le nom des champs
    itemCheck: Boolean, // s'il y a des case à cocher
    checked: Array, // le tableau des cases cochées
/*    itemButton: Object, // l'objet pour les boutons d'items
    listButton: Object, // l'objet pour le bouton de liste*/
    itemButton: Boolean, // l'objet pour les boutons d'items
    listButton: Boolean, // l'objet pour le bouton de liste
    sellButton: Object, // l'objet pour le bouton de vente
    equipButton: Object, // l'objet pour le bouton d'équipement
  },
  data : () => {
    return {
    }
  }
}
</script>