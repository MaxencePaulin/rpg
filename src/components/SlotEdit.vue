<template>
    <div>
        <h1>Nombre d'item sur l'emplacement "{{slot.label}}" : {{slot.items.length}}</h1>
        <ul v-if="slot.items.length > 0">
            <li v-for="(item, index) in slot.items" :key="index">
                {{ item.nom }} <v-btn v-if="slot.items.length > 0" color="amber" x-small @click="$emit('unset-event', {index, item})">Unset</v-btn>
            </li>
        </ul>
        <ul v-else>
            <li>Empty</li>
        </ul>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: "SlotEdit",
    props: {
        slotName: String,
    },
    computed: {
        ...mapState(['currentPerso', 'possibleSlots']),
        slot () {
            return this.currentPerso.emplacements.filter(s => s.nom === this.slotName)[0]
        },
    },
    methods: {
        ...mapMutations(['setPossibleSlot']),

    },
}
</script>

<style scoped>

</style>