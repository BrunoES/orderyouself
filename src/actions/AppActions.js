import {
    LISTA_CATEGORIAS,
    LISTA_PRATOS,
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO,
    ADICIONA_REFEICAO,
    LISTA_REFEICOES,
    REMOVE_REFEICAO
} from './types';

import _ from 'lodash';
import firebase from 'firebase';

export const categoriasFetch = () => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/categorias/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIAS, payload: snapshot.val() });
            })
    }
}

export const pratosFetch = (idCategoria) => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/pratos/${usuarioLogado}/${idCategoria}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_PRATOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoria = idCategoria => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/categorias/${usuarioLogado}/${idCategoria}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_CATEGORIA,
                    payload: {
                         id: idCategoria,
                         descricao: _.values(snapshot.val())[0]
                    }
                 });
            })
    }
}

export const modificaPrato = (idPrato, idCategoria) => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/pratos/${usuarioLogado}/${idCategoria}/${idPrato}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_PRATO,
                    payload: {
                         id: idPrato,
                         descricao: _.values(snapshot.val())[0]
                    }
                 });
            })
    }
}

export const adicionaRefeicao = refeicao => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/`)
            .push(refeicao)
            .then(() => dispatch({
                type: ADICIONA_REFEICAO,
                payload: refeicao
            }))
            .catch((erro) => dispatch({
                type: ADICIONA_REFEICAO,
                payload: ''
            }))
    };
}

export const removeRefeicao = refeicaoId => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/${refeicaoId}`)
            .remove()
            .then(() => dispatch({
                type: REMOVE_REFEICAO,
                payload: refeicao
            }))
            .catch((erro) => dispatch({
                type: REMOVE_REFEICAO,
                payload: ''
            }))
    };
}

export const refeicoesFetch = () => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_REFEICOES, payload: snapshot.val() });
            })
    };
}