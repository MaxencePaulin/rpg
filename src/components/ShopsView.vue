<template>
    <!-- partie gauche -->
    <div style="text-align: left; width: 100%">
        <h1>Les boutiques de {{this.selectedStreet.nom}}:</h1>
        <select v-model="selectedShop" class="villeselect" @change="currentShop(selectedShop)">
            <option disabled value="" >Sélectionner une boutique</option>
            <option v-for="shop in this.selectedStreet.boutiques" :key="shop._id" :value="shop">{{shop.nom}}</option>
        </select>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: "ShopsView",
    props: {
        idTown: Number,
        idStreet: Number,
    },
    data: () => ({
        selectedShop: null,
    }),
    computed: {
        ...mapState(['villes']),
        selected() {
            return this.villes.find(v => v._id === this.idTown)
        },
        selectedStreet() {
            return this.selected.rues.find(r => r._id === this.idStreet)
        },
    },
    methods: {
        ...mapMutations(['setCurrentShop']),
        currentShop(shop) {
            if (shop !== null) {
                this.setCurrentShop(shop)
            }
        }
    }
}
</script>

<style scoped>

</style>