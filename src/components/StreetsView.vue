<template>
    <div style="display: flex">
        <!-- partie gauche -->
        <div style="text-align: left; width: 30%">
            <h1>Les rues de {{this.selected.nom}}:</h1>
            <select v-model="selectedStreets" class="villeselect" @change="currentStreet(selectedStreets)">
                <option disabled value="">Sélectionner une ville</option>
                <option v-for="street in this.selected.rues" :key="street._id" :value="street">{{street.nom}}</option>
            </select>
        </div>
        <!-- partie droite -->
        <div v-if="selectedStreets" style="text-align: left; width: 70%">
            <router-view name="shops"></router-view>
<!--            <table>-->
<!--                <tr>-->
<!--                    <th>rues: {{ this.selected.rues.length }}</th>-->
<!--                    <th>boutiques</th>-->
<!--                </tr>-->
<!--                <tr v-for="(street, index) in this.selected.rues" :key="index">-->
<!--                    <td>-->
<!--                        {{ street.nom }} : {{ street.boutiques.length }} boutiques-->
<!--                    </td>-->
<!--                    <td>-->
<!--                        <CheckedList-->
<!--                            :data="street.boutiques"-->
<!--                            :fields="['nom']"-->
<!--                            :item-button="{show: true, text: 'select'}"-->
<!--                            @item-button-clicked="shopSelected(index, $event)"-->
<!--                        >-->
<!--                        </CheckedList>-->
<!--                    </td>-->
<!--                </tr>-->
<!--            </table>-->
<!--            <ShopDetails :shop="currentShop"></ShopDetails>-->
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: "StreetsView",
    props: {
        idTown: Number,
    },
    data: () => ({
        currentShop: null,
        selectedStreets: null,
    }),
    computed: {
        ...mapState(['villes']),
        selected() {
            return this.villes.find(v => v._id === this.idTown)
        }
    },
    methods: {
        ...mapMutations(['setCurrentShop']),
        currentStreet(street) {
            if (street !== null) {
                this.setCurrentShop(null)
                this.$router.push({name: 'shops', params: {idtown: this.selected._id, idstreet: street._id}})
            }
        },
    }
}
</script>

<style scoped>

</style>