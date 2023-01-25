<template>
  <div>
    <span class="navbtn" v-for="(link, index) in titles" :key="index" @click="goTo(index)">
      <slot name="link-to" :link="link">{{link.text}}</slot>
    </span>
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
    },
      goTo(index) {
          this.$emit('menu-clicked', index)
          this.$router.push(this.titles[index].path).catch(() => {})
      }
  }
}
</script>

<style scoped>
.navbtn {
    margin: 5px;
}
</style>