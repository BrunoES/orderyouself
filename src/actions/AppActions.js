import {
    LISTA_CATEGORIAS,
    LISTA_PRATOS,
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO,
    ADICIONA_REFEICAO
} from './types';

import _ from 'lodash';
import firebase from 'firebase';

export const categoriasFetch = () => {
    return dispatch => {
        firebase.database().ref("/categorias/6abe636d-f47a-415e-9493-ac89db41361f/")
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIAS, payload: snapshot.val() });
            })
    }
}

export const pratosFetch = (idCategoria) => {
    return dispatch => {
        firebase.database().ref(`/pratos/6abe636d-f47a-415e-9493-ac89db41361f/${idCategoria}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_PRATOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoria = itemValue => {
    return dispatch => {
        firebase.database().ref(`/categorias/6abe636d-f47a-415e-9493-ac89db41361f/${itemValue}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_CATEGORIA,
                    payload: {
                         id: itemValue,
                         descricao: _.values(snapshot.val())[0]
                    }
                 });
            })
    }
}

export const modificaPrato = itemValue => {
    return dispatch => {
        firebase.database().ref(`/pratos/6abe636d-f47a-415e-9493-ac89db41361f/0e935802-b991-4cab-8474-9727f8c4bcc0/${itemValue}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_PRATO,
                    payload: {
                         id: itemValue,
                         descricao: _.values(snapshot.val())[0]
                    }
                 });
            })
    }
}

export const adicionaRefeicao = refeicao => {
    return ({
        type: ADICIONA_REFEICAO,
        payload: refeicao
    });
}