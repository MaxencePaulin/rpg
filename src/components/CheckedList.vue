<template>
  <div>
    <ul>
      <li v-for="(itemsAchetes, index) in data" :key="index" :value="index">
        <input v-if="itemCheck === true" type="checkbox" :checked="checked[index]" :value="index" @change="$emit('checked-changed', index)">
        {{itemsAchetes[index].nom}} {{itemsAchetes[index].type}}
        <button v-if="itemButton.show === true" :value="index" @click="$emit('item-button-clicked', index)">{{itemButton.text}}</button>
      </li>
    </ul>
    <button v-if="listButton.show === true" @click="$emit('list-button-clicked')">{{listButton.text}}</button>
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
  },
  data: () => {
    return {
    }
  },
  methods: {
  }

}
</script>

<style scoped>

</style>