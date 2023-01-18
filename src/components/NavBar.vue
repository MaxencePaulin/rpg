<template>
  <div>
    <v-btn class="navbtn" rounded v-for="(but, index) in titles" :key="index" :color="but.color" @click="go(but.path, index)">
      {{but.text}}
    </v-btn>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  props: { titles: Array},
  methods: {
    go(path, index) {
      this.$emit('menu-clicked', index)
      this.$router.push(path).catch(() => {})
    }
  }
}
</script>

<style scoped>
.navbtn {
    margin: 5px;
}
</style>