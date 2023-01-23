<template>
    <div>
        <h1>{{slotName}}</h1>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "SlotEdit",
    props: {
        slotName: String,
    },
    computed: {
        ...mapState(['currentPerso']),
        slot () {
            return this.currentPerso[this.slotName]
        }
    }
}
</script>

<style scoped>

</style>