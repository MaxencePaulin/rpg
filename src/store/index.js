import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TownService from '../services/towns.service'
import CharacService from '../services/persos.service'
import { itemLimits, itemCats } from '@/services/data.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    villes: [],
    persos: [],
    currentPerso: null,
    currentShop: null,
    possibleSlots: [],
    currentTown: null,
    possibleItems: [],
    curLimit: null,
  }),
  getters: {
    getOrCurrentPerso (state) {
      if (!state.currentPerso) {
        return 0;
      }
      return state.currentPerso.or;
    }
  },
  // mutations = fonctions synchrones pour mettre à jour le state (!!! interdit de modifier directement le state)
  mutations: {
    updateVilles(state, villes) {
      state.villes = villes
    },
    updatePersos(state, persos) {
      state.persos = persos
    },
    setCurrentPerso(state, perso) {
      state.currentPerso = perso
      console.log('currentPerso : ', state.currentPerso.nom)
    },
    sell (state, item) {
      if (!state.currentPerso || !state.currentShop) {
        return null;
      }
      if (!state.currentPerso.itemsAchetes) {
        state.currentPerso.itemsAchetes = [];
      }
      state.currentPerso.or -= item.prix;
      state.currentPerso.itemsAchetes.push(item);
      let index = state.currentShop.itemStock.indexOf(item);
      state.currentShop.itemStock.splice(index, 1);
    },
    setCurrentShop(state, shop) {
      state.currentShop = shop;
      if (shop !== null) {
        let color = ['red', 'green', 'blue', 'orange', 'yellow', 'magenta', 'ligthgray', 'lime', 'purple', 'lightblue']
        // ['red', 'blue', 'green', 'yellow', 'purple', 'orange', 'pink', 'brown', 'grey', 'lightblue'];
        state.currentShop.itemCommande.forEach(item => {
          item.color = color[itemCats.indexOf(item.type)]
        })
      }
    },
    stock(state, item) {
      state.currentShop.itemStock.push(item);
    },
    resell(state, data) {
      if (!state.currentShop) {
        return null;
      }
      let index = state.currentPerso.itemsAchetes.indexOf(data.item);
      state.currentPerso.itemsAchetes.splice(index, 1);
      state.currentShop.itemStock.push(data.item);
      state.currentPerso.or += data.gold;
    },
    setPossibleSlot(state, item) {
      state.possibleSlots = itemLimits.filter(i => i.types.includes(item.type))
    },
    equipItem(state, data) {
      if (data.slot2 !== undefined) {
        data.slot = itemLimits.filter(i => i.slot === data.slot2.nom)[0];
      }
      if (data.size >= data.slot.limit) {
        return;
      }
      state.currentPerso.emplacements.forEach(e => {
        if (e.nom === data.slot.slot) {
          e.items.push(data.item);
        }
      });
      // retirer l'item des items achetés
      let index = state.currentPerso.itemsAchetes.indexOf(data.item);
      state.currentPerso.itemsAchetes.splice(index, 1);
    },
    unsetItem(state, data) {
      let index = state.currentPerso.emplacements.filter(s => s.nom === data.slotName)[0].items.indexOf(data.item);
      state.currentPerso.emplacements.filter(s => s.nom === data.slotName)[0].items.splice(index, 1);
      state.currentPerso.itemsAchetes.push(data.item);
    },
    setCurrentTown (state, town) {
      state.currentShop = null;
      state.currentTown = town;
    },
    setPossibleItems (state, data) {
      // data.slot, data.items
      if (data.slot === null) {
        state.possibleItems = [];
        return;
      }
      let availableTypes = itemLimits.filter(i => i.slot === data.slot.nom)[0]?.types;
      state.possibleItems = data.items.filter(i => availableTypes.includes(i.type));
    },
    setCurLimit (state, slot) {
      if (slot === null) {
        state.curLimit = null;
        return;
      }
      let limit = itemLimits.find(i => i.slot === slot.nom).limit;
      state.curLimit = limit;
    }
  },
  // actions = fonctions asynchrone pour mettre à jour le state, en faisant appel aux mutations, via la fonction commit()
  actions: {
    async getAllTowns({commit}) {
      console.log('récupération des villes');
      let response = await TownService.getAllTowns()
      if (response.error === 0) {
        commit('updateVilles', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async getAllCharacs({commit}) {
      console.log('récupération des personnages');
      let response = await CharacService.getAllCharacs()
      if (response.error === 0) {
        commit('updatePersos', response.data)
      }
      else {
        console.log(response.data)
      }
    },
    async order(context, data) {
      setTimeout(() => {
        context.commit('stock', data.item);
      }, data.time);
    }
  }
})
