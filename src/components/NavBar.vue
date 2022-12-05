<template>
  <div>
    <span v-for="(title, index) in titles" :key="index">
      <v-btn :color="title.color" @click="$emit('menu-clicked', index)">
        {{title.text}}
      </v-btn>
    </span>
   <!-- button list, values/colors from props titles. -->
  </div>
</template>

<script>
export default {
  name: 'NavBar',
  props: { titles: Array }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.v-btn {
  margin: 5px;
}
</style>