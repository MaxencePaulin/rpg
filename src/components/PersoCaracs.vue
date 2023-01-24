<template>
    <div>
        <div style="text-align: left; width: 100%">
            <h1>{{currentPerso.nom}}</h1>
            <table>
                <tr>
                    <th>Attributs</th>
                    <th>Emplacements</th>
                </tr>
                <tr>
                    <td>
                        <ul>
                            <li>niveau : {{ currentPerso.niveau}}</li>
                            <li>vie : {{ currentPerso.attributs.vie}}</li>
                            <li>vitalité : {{ currentPerso.attributs.vitalite}}</li>
                            <li>force : {{ currentPerso.attributs.force}}</li>
                            <li>armure : {{ currentPerso.attributs.protection}}</li>
                        </ul>
                    </td>
                    <td>

                        <ul>
                            <li v-for="(slot, index) in slots" :key="index">
                                <v-btn rounded color="primary" class="mt-1 mb-1" small @click="lvl2(slot)">
                                    {{slot.label}}
                                </v-btn>
                            </li>
                        </ul>
                    </td>
                </tr>
                <tr>
                    <td> or : {{currentPerso.or}}</td>
                    <td>
                        <CheckedList
                            :data="currentPerso.itemsAchetes"
                            :fields="['nom','type']"
                            :checked="checkedBoughtItems"
                            item-check
                            :item-button="{show: true, text: 'price'}"
                            :list-button="{show: true, text: 'Infos'}"
                            :sell-button="{show: true, text: 'Sell'}"
                            :equip-button="{show: true, text: 'Set'}"
                            @checked-changed="toggleItem"
                            @item-button-clicked="showItemPrice"
                            @list-button-clicked="showItemsInfo"
                            @sell-button-clicked="sellItem"
                            @equip-button-clicked="equipParams"
                        >
                        </CheckedList>
                    </td>
                </tr>
            </table>
        </div>
        <div style="display:flex">
            <router-view name="slot" @unset-event="unset"></router-view>
            <div class="mx-auto mt-2" style="text-align: center;">
                <table v-if="curItem">
                    <tr>
                        <td colspan="2">Liste des endroits où vous pouvez équiper : {{ curItem.nom }}</td>
                    </tr>
                    <tr>
                        <td>Slot : {{possibleSlots.length}} slot possible</td>
                    </tr>
                    <tr>
                        <td>
                            <span v-for="(slot, index) in possibleSlots" :key="index">{{slot.slot}} <v-btn color="amber" x-small @click="equipItem(slot)">Set</v-btn>, </span>
                        </td>
                    </tr>
                </table>
            </div>
        </div>
    </div>
</template>

<script>
import {mapState} from "vuex";

export default {
    name: "PersoCaracs",
    components: {
        CheckedList: () => import('./CheckedList.vue'),
    },
    data: () => ({
        idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
        curItem: null,
        display: false,
    }),
    computed: {
        ...mapState(['currentPerso', 'possibleSlots']),
        checkedBoughtItems() {
            if (this.currentPerso === null) return []
            // construit un tableau contenant autant de cases qu'il y a d'items achetés
            // chaque case contient true/false en fonction du fait que l'item est sélectionné ou non
            let tab = []
            for(let i=0;i<this.currentPerso.itemsAchetes.length;i++) {
                if (this.idSelectedBoughtItems.includes(i)) tab.push(true)
                else tab.push(false)
            }
            return tab
        },
        // récupère la liste des emplacements du personnage courant afin de
        // les classer dans l'ordre qu'il convient pour l'affichage, avec le nom en français.
        slots() {
            if (this.currentPerso) {
                let tab = [];
                let slot = this.currentPerso.emplacements.find(s => s.nom === 'head')
                slot.label = 'tête'
                tab.push(slot)
                slot = this.currentPerso.emplacements.find(s => s.nom === 'body')
                slot.label = 'corps'
                tab.push(slot)
                slot = this.currentPerso.emplacements.find(s => s.nom === 'hands')
                slot.label = 'mains'
                tab.push(slot)
                slot = this.currentPerso.emplacements.find(s => s.nom === 'belt')
                slot.label = 'ceinture'
                tab.push(slot)
                slot = this.currentPerso.emplacements.find(s => s.nom === 'bag')
                slot.label = 'sac à dos'
                tab.push(slot)
                return tab
            }
            return []
        }
    },
    methods: {
        showItemPrice(index) {
            alert(this.currentPerso.itemsAchetes[index].nom+' : '+ this.currentPerso.itemsAchetes[index].prix)
        },
        showItemsInfo() {
            let items = ""
            this.idSelectedBoughtItems.forEach(e => items += ' '+this.currentPerso.itemsAchetes[e].nom)
            if (items === "") items = "Aucun item sélectionné"
            alert(items)
        },
        toggleItem(index) {
            let id = this.idSelectedBoughtItems.indexOf(index)
            if (id === -1) {
                // ajoute index
                this.idSelectedBoughtItems.push(index)
            }
            else {
                // enleve index
                this.idSelectedBoughtItems.splice(id,1)
            }
        },
        sellItem(index) {
            if (this.$store.state.currentShop === null) {
                return alert("Vous devez d'abord séléctionner une boutique")
            }
            let prix = Math.floor(this.currentPerso.itemsAchetes[index].prix * (0.4 + Math.random() * 0.5))
            if (confirm('Vendre '+this.currentPerso.itemsAchetes[index].nom+' pour '+prix+' or ?')) {
                this.$store.commit('resell', {item: this.currentPerso.itemsAchetes[index], gold: prix})
            }
        },
        equipParams(index) {
            this.$store.commit('setPossibleSlot',this.currentPerso.itemsAchetes[index])
            this.curItem = this.currentPerso.itemsAchetes[index]
        },
        equipItem(selectedSlot) {
            let size = this.currentPerso.emplacements.find(s => s.nom === selectedSlot.slot).items.length
            console.log(size)
            if (size >= selectedSlot.limit) {
                return alert("Vous ne pouvez pas mettre d'avantage d'item dans cet emplacement")
            }
            this.$store.commit('equipItem', {slot: selectedSlot, item: this.curItem, size: size})
            this.curItem = null;
            this.$router.push({name: 'slot', params: {name: selectedSlot.slot}}).catch(() => {})
        },
        unset(event) {
            this.$store.commit('unsetItem', {slotName: event.slotName, item: event.item})
        },
        lvl2(slot) {
            console.log(slot.nom)
            this.display = true
            this.$router.push({name: 'slot', params: {name: slot.nom}}).catch(() => 
            {this.$router.push({name: 'persos'})})
        }
    }
}
</script>

<style scoped>

</style>