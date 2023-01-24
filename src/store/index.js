import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import TownService from '../services/towns.service'
import CharacService from '../services/persos.service'
import { itemLimits } from '@/services/data.service'

export default new Vuex.Store({
  // state = les données centralisées
  state: () => ({
    villes: [],
    persos: [],
    currentPerso: null,
    currentShop: null,
    possibleSlots: [],
    currentTown: null,
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
      state.currentShop.itemStock = state.currentShop.itemStock.filter(i => i._id !== item._id);
    },
    setCurrentShop(state, shop) {
      state.currentShop = shop;
    },
    stock(state, item) {
      state.currentShop.itemStock.push(item);
    },
    resell(state, data) {
      if (!state.currentShop) {
        return null;
      }
      state.currentPerso.itemsAchetes = state.currentPerso.itemsAchetes.filter(i => i._id !== data.item._id);
      state.currentShop.itemStock.push(data.item);
      state.currentPerso.or += data.gold;
    },
    setPossibleSlot(state, item) {
      state.possibleSlots = itemLimits.filter(i => i.types.includes(item.type))
    },
    equipItem(state, data) {
      console.log(data.slot)
      if (data.size >= data.slot.limit) {
        return;
      }
      state.currentPerso.emplacements.forEach(e => {
        if (e.nom === data.slot.slot) {
          e.items.push(data.item);
        }
      });
      // retirer l'item des items achetés
      state.currentPerso.itemsAchetes = state.currentPerso.itemsAchetes.filter(i => i._id !== data.item._id);
    },
    unsetItem(state, data) {
      console.log(data.index)
      state.currentPerso.emplacements.filter(s => s.nom === data.slotName)[0].items = state.currentPerso.emplacements.filter(s => s.nom === data.slotName)[0].items.filter(i => i._id !== data.item._id);
      state.currentPerso.itemsAchetes.push(data.item);
    },
    setCurrentTown (state, town) {
      state.currentShop = null;
      state.currentTown = town;
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
