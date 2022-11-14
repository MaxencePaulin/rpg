import LocalSource from "@/datasource/controller";
import {Perso} from './data.service'

async function getAllCharacsFromLocalSource() {
    // rÃ©cupÃ©ration auprÃ¨s de la source locale
    return LocalSource.getAllCharacs()
}

/*
async function getAllCharacsFromAPI() {
  // a Ã©crire quand l'API est fonctionnelle
  return {}
}
*/

async function getAllCharacs() {
    let response = null;
    try {
        // changer la mÃ©thode appelÃ©e quand cette fonctionnalitÃ© l'API est prÃªte
        response = await getAllCharacsFromLocalSource()
        // test si la requÃªte a rÃ©ussi et si oui, conversion du format des donnÃ©es.
        // NB : pour la liste des villes, il ne devrait jamais y avoir d'erreur. Au pire,
        // on obtient un tableau vide.
        if (response.error === 0) {
            // les donnÃ©es de la rÃ©ponse sont un tableau contenant les villes
            let persos = []
            response.data.forEach(c => persos.push(Perso.fromAPI(c)))
            response.data = persos
        }
        // s'il y avait une erreur, le champ response.error > 0 et response.data contient le message d'erreur.
        // on renvoie donc directement response.
    }
        // NB: le catch n'aura lieu que pour des requÃªte vers l'API, s'il y a une erreur rÃ©seau
    catch(err) {
        response = {error: 1, data: 'erreur réseau, impossible de récupérer la liste des personnages'  }
    }
    return response
}

export default {
    getAllCharacs
}