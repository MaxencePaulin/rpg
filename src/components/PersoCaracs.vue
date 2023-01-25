<template>
    <div>
        <div style="text-align: left; width: 150%">
            <h1>{{currentPerso.nom}}</h1>
            <div style="display: flex">
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
                                :checked="checkedBoughtItems"
                                item-check
                                :item-button="true"
                                :list-button="true"
                                :sell-button="true"
                                :equip-button="true"
                                @checked-changed="toggleItem"
                            >
                                <template #item="{item}">
                                    {{ item.nom }} : {{ item.type }}
                                </template>
                                <template #item-button="{indexRow}">
                                    <v-btn color="grey" small @click="showItemPrice(indexRow)">Price</v-btn>
                                </template>
                                <template #list-button>
                                    <v-btn color="green" small class="ml-2 mb-2" @click="showItemsInfo">Infos</v-btn>
                                </template>
                                <template #equip-button="{indexRow}">
                                    <v-btn color="amber" class="ml-5" small @click="equipParams(indexRow)">Set</v-btn>
                                </template>
                                <template #sell-button="{indexRow}">
                                    <v-btn color="red" class="ml-5 mr-2" small @click="sellItem(indexRow)">Sell</v-btn>
                                </template>
                            </CheckedList>
                        </td>
                    </tr>
                </table>
                <div class="mx-auto mt-2 ml-5" style="text-align: center;">
                    <div>
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
                    <div v-if="curSlot" class="mt-5">
                        <table>
                            <tr>
                                <td colspan="2">Liste des items que vous pouvez équiper sur {{curSlot.slot}} : {{curSlot.label}}</td>
                            </tr>
                            <tr>
                                <td>Item : {{possibleItems.length}} item possible</td>
                            </tr>
                            <tr v-if="possibleItems.length > 0">
                                <td>
                                    <span v-for="(item, index) in possibleItems" :key="index">{{item.nom}} <v-btn color="amber" x-small @click="equipSelectedItem(curSlot, item)">Set</v-btn>, </span>
                                </td>
                            </tr>
                        </table>
                    </div>
                </div>
            </div>
        </div>
        <div style="display:flex">
            <router-view name="slot" @unset-event="unset"></router-view>
        </div>
    </div>
</template>

<script>
import {mapMutations, mapState} from "vuex";

export default {
    name: "PersoCaracs",
    components: {
        CheckedList: () => import('./CheckedList.vue'),
    },
    data: () => ({
        idSelectedBoughtItems: [], // ce tableau ne contient que les ids des items achetés sélectionnés.
        curItem: null,
        curSlot: null,
    }),
    computed: {
        ...mapState(['currentPerso', 'possibleSlots', 'possibleItems']),
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
            console.log("limit : "+size)
            if (size >= selectedSlot.limit) {
                return alert("Vous ne pouvez pas mettre d'avantage d'item dans cet emplacement")
            }
            this.$store.commit('equipItem', {slot: selectedSlot, item: this.curItem, size: size})
            this.curItem = null;
            if (this.curSlot) {
                this.setPossibleItems({slot: this.curSlot, items: this.currentPerso.itemsAchetes})
            }
            this.curSlot = this.slots.find(s => s.nom === selectedSlot.slot)
            this.setPossibleItems({slot: this.curSlot, items: this.currentPerso.itemsAchetes})
            this.$router.push({name: 'slot', params: {name: selectedSlot.slot}}).catch(() => {})
        },
        unset(event) {
            this.$store.commit('unsetItem', {slotName: event.slotName, item: event.item})
            if (this.curSlot) {
                this.setPossibleItems({slot: this.curSlot, items: this.currentPerso.itemsAchetes})
            }
        },
        ...mapMutations(['setPossibleItems']),
        lvl2(slot) {
            this.curSlot = slot
            this.setPossibleItems({slot: slot, items: this.currentPerso.itemsAchetes})
            this.$router.push({name: 'slot', params: {name: slot.nom}}).catch(() => 
            {
                this.curSlot = null;
                this.setPossibleItems({slot: null, items: []});
                this.$router.push({name: 'persos'})
            })
        },
        equipSelectedItem(selectedSlot, item) {
            let size = this.currentPerso.emplacements.find(s => s.nom === selectedSlot.nom).items.length
            this.$store.commit('equipItem', {slot2: selectedSlot, item: item, size: size})
            this.setPossibleItems({slot: selectedSlot, items: this.currentPerso.itemsAchetes})
            this.curItem = null;
            this.$router.push({name: 'slot', params: {name: selectedSlot.nom}}).catch(() => {})
        }
    }
}
</script>

<style scoped>

</style>