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
      <span v-if="equipButton"><slot name="equip-button" :indexRow="indexRow"></slot></span>
      <span v-if="sellButton"><slot name="sell-button" :indexRow="indexRow"></slot></span>
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
    sellButton: Boolean, // l'objet pour le bouton de vente
    equipButton: Boolean, // l'objet pour le bouton d'équipement
  },
  data : () => {
    return {
    }
  }
}
</script>