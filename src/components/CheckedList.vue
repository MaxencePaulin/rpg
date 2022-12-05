<template>
  <div>
    <ul>
      <li v-for="(item, index) in data" :key="index" :value="item">
        <input v-if="itemCheck === true" type="checkbox" :checked="checked[index]" :value="index" @change="$emit('checked-changed', index)">
        <span v-for="(field, index2) in fields" :key="index2">
            {{field}} : {{item[field]}}<span v-if="fields[index2+1]">,</span>
        </span>
        <v-btn x-small class="grey" v-if="itemButton.show === true" :value="index" @click="$emit('item-button-clicked', index)">{{itemButton.text}}</v-btn>
      </li>
    </ul>
    <v-btn x-small class="grey" v-if="listButton.show === true" @click="$emit('list-button-clicked')">{{listButton.text}}</v-btn>
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
.v-btn {
  margin: 5px;
}
</style>