import {
    LISTA_CATEGORIAS,
    LISTA_PRATOS,
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO
} from './types';

import firebase from 'firebase';

export const categoriasFetch = () => {
    return dispatch => {
        firebase.database().ref("/categorias/")
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIAS, payload: snapshot.val() });
            })
    }
}

export const pratosFetch = () => {
    return dispatch => {
        firebase.database().ref("/pratos/")
            .on("value", snapshot => {
                dispatch({ type: LISTA_PRATOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoria = itemValue => {
    return ({
       type: MODIFICA_CATEGORIA,
       payload: itemValue 
    });
}

export const modificaPrato = itemValue => {
    return ({
        type: MODIFICA_PRATO,
        payload: itemValue
    })
}