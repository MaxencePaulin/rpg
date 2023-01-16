<template>
  <div>
    <v-btn class="navbtn" rounded v-for="(but, index) in titles" :key="index" :color="but.color" @click="$emit('menu-clicked', index)">
      {{but.text}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: { titles: Array}
}
</script>

<style scoped>
.navbtn {
    margin: 5px;
}
</style>