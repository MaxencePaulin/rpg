<template>
  <v-container>
    <div style="display: flex">
      <!-- partie gauche -->
      <div style="text-align: left; width: 30%">
        <h1>Les personnages</h1>
        <select v-model="selected" class="persoselect" @change="setcurrentPerso(selected)">
          <option disabled value="-1" selected>Sélectionner un personnage</option>
          <option v-for="(perso, index) in persos" :key="index" :value="perso">{{perso.nom}}</option>
        </select>
      </div>
      <!-- partie droite -->
      <div v-if="currentPerso != null">
          <PersoCaracs :change="selected === -1 ? {} : selected">
              <template #skills="{niveau, vie, vitalite}">
                  <div class="mx-2">
                      <v-icon v-for="i in niveau" :key="i" color="orange">mdi-star</v-icon>
                      <br>
                      Vie : {{vie}} / {{vitalite}}
                      <div style="display: flex"><v-icon color="red" class="mr-1">mdi-heart</v-icon>
                          <v-progress-linear
                              :value="(vie/vitalite * 100)"
                              color="green"
                              background-color="red"
                              height="10"
                              class="mt-2"
                          ></v-progress-linear>
                      </div>
                  </div>

              </template>
              <template #gold="{or}">
                    <div class="mx-2">
                        <!-- Vous devez installer @iconify/vue2 pour utiliser les icones (vous avez juste à faire npm i) -->
                        <Icon icon="clarity:coin-bag-solid" color="orange" width="30" height="30"/> :
                        {{Romain(or)}} po
                    </div>
              </template>
          </PersoCaracs>
      </div>
    </div>
  </v-container>

</template>

<script>

import {mapState, mapMutations} from 'vuex'
import PersoCaracs from "@/components/PersoCaracs";
import { Icon } from '@iconify/vue2'

export default {
  name: 'PersosView',
  components: {PersoCaracs, Icon},
  data: () => ({
    selected: -1,
  }),
  computed: {
    ...mapState(['persos', "currentPerso"]),
  },
  methods: {
    ...mapMutations(['setCurrentPerso']),
    setcurrentPerso (perso) {
        if (perso !== null) {
            this.$router.push({name: 'persos' }).catch(() => {})
          return this.setCurrentPerso(perso)
        }
        return null
    },
      Romain(or) {
        let chiffre = or
        let romain = ''
        let tab = [
          {valeur: 1000, lettre: 'M'},
          {valeur: 900, lettre: 'CM'},
          {valeur: 500, lettre: 'D'},
          {valeur: 400, lettre: 'CD'},
          {valeur: 100, lettre: 'C'},
          {valeur: 90, lettre: 'XC'},
          {valeur: 50, lettre: 'L'},
          {valeur: 40, lettre: 'XL'},
          {valeur: 10, lettre: 'X'},
          {valeur: 9, lettre: 'IX'},
          {valeur: 5, lettre: 'V'},
          {valeur: 4, lettre: 'IV'},
          {valeur: 1, lettre: 'I'},
        ]
        for (let i = 0; i < tab.length; i++) {
          while (chiffre >= tab[i].valeur) {
            romain += tab[i].lettre
            chiffre -= tab[i].valeur
          }
        }
        return romain
      }
  },
}
</script>

<style>
.persoselect {
  background-color: #AB6A00;
    opacity: 0.75;
    border-radius: 10px;
    padding: 5px;
}
</style>