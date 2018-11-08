import {
    LISTA_CATEGORIAS,
    LISTA_PRATOS,
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO,
    ADICIONA_REFEICAO,
    LISTA_REFEICOES,
    REMOVE_REFEICAO,
    MODIFICA_QUANTIDADE,

    LISTA_CATEGORIASBEBIDAS,
    LISTA_BEBIDAS,
    MODIFICA_CATEGORIABEBIDAS,
    MODIFICA_BEBIDA,
    ADICIONA_BEBIDA,
    LISTA_BEBIDASPEDIDO,
    REMOVE_BEBIDA,
    MODIFICA_QUANTIDADEBEBIDA,

    LISTA_CATEGORIASACOMPANHAMENTOS,
    LISTA_ACOMPANHAMENTOS,
    MODIFICA_CATEGORIAACOMPANHAMENTOS,
    MODIFICA_ACOMPANHAMENTO,
    ADICIONA_ACOMPANHAMENTO,
    LISTA_ACOMPANHAMENTOSPEDIDO,
    REMOVE_ACOMPANHAMENTO,
    MODIFICA_QUANTIDADEACOMPANHAMENTO,
    CANCELA_PEDIDO,
    CONFIRMA_PEDIDO,
    CRIA_NOVO_PEDIDO,
    RECUPERA_PEDIDO_ATUAL
} from './types';

import _ from 'lodash';
import firebase from 'firebase';

const usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
const pedido = "b68cf9a9-c745-4752-95c2-8638732a94ce";

export const getCurrentOrder = () => {
    return dispatch => {
        firebase.database().ref(`/pedidoAtual/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: RECUPERA_PEDIDO_ATUAL, payload: snapshot.val() });
            })
    }
}

export const categoriasFetch = () => {

    return dispatch => {
        firebase.database().ref(`/categoriasPratos/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIAS, payload: snapshot.val() });
            })
    }
}

export const pratosFetch = (idCategoria) => {

    return dispatch => {
        firebase.database().ref(`/pratos/${usuarioLogado}/${idCategoria}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_PRATOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoria = idCategoria => {

    return dispatch => {
        firebase.database().ref(`/categoriasPratos/${usuarioLogado}/${idCategoria}/`)
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

export const modificaQuantidade = (quantidade) => {
    return {
        type: MODIFICA_QUANTIDADE,
        payload: quantidade
    };
}

export const modificaPrato = (idPrato, idCategoria) => {

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

export const adicionaRefeicao = (refeicao, pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/${pedidoAtual}/`)
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

export const removeRefeicao = (refeicaoId, pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/${pedidoAtual}/${refeicaoId}`)
            .remove()
            .then(() => dispatch({
                type: REMOVE_REFEICAO,
                payload: ''
            }))
            .catch((erro) => dispatch({
                type: REMOVE_REFEICAO,
                payload: ''
            }))
    };
}

export const refeicoesFetch = (pedidoAtual) => {
    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/${pedidoAtual}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_REFEICOES, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */

export const categoriasBebidasFetch = () => {

    return dispatch => {
        firebase.database().ref(`/categoriasBebidas/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIASBEBIDAS, payload: snapshot.val() });
            })
    }
}

export const bebidasFetch = (bebidasCategoriaId) => {

    return dispatch => {
        firebase.database().ref(`/bebidas/${usuarioLogado}/${bebidasCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_BEBIDAS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoriaBebidas = bebidasCategoriaId => {

    return dispatch => {
        firebase.database().ref(`/categoriasBebidas/${usuarioLogado}/${bebidasCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_CATEGORIABEBIDAS,
                    payload: {
                        id: bebidasCategoriaId,
                        descricao: _.values(snapshot.val())[0]
                    }
                });
            })
    }
}

export const modificaQuantidadeBebida = (quantidade) => {
    return {
        type: MODIFICA_QUANTIDADEBEBIDA,
        payload: quantidade
    };
}

export const modificaBebida = (bebidaId, bebidasCategoriaId) => {

    return dispatch => {
        firebase.database().ref(`/bebidas/${usuarioLogado}/${bebidasCategoriaId}/${bebidaId}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_BEBIDA,
                    payload: {
                        id: bebidaId,
                        descricao: _.values(snapshot.val())[0]
                    }
                });
            })
    }
}

export const adicionaBebida = (bebidaPedido, pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/${pedidoAtual}/`)
            .push(bebidaPedido)
            .then(() => dispatch({
                type: ADICIONA_BEBIDA,
                payload: bebidaPedido
            }))
            .catch((erro) => dispatch({
                type: ADICIONA_BEBIDA,
                payload: ''
            }))
    };
}

export const removeBebida = (bebidaId, pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/${pedidoAtual}/${bebidaId}`)
            .remove()
            .then(() => dispatch({
                type: REMOVE_BEBIDA,
                payload: ''
            }))
            .catch((erro) => dispatch({
                type: REMOVE_BEBIDA,
                payload: ''
            }))
    };
}

export const bebidasPedidoFetch = (pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/${pedidoAtual}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_BEBIDASPEDIDO, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */

export const categoriasAcompanhamentosFetch = () => {

    return dispatch => {
        firebase.database().ref(`/categoriasAcompanhamentos/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIASACOMPANHAMENTOS, payload: snapshot.val() });
            })
    }
}

export const acompanhamentosFetch = (acompanhamentosCategoriaId) => {

    return dispatch => {
        firebase.database().ref(`/acompanhamentos/${usuarioLogado}/${acompanhamentosCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_ACOMPANHAMENTOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoriaAcompanhamentos = acompanhamentosCategoriaId => {

    return dispatch => {
        firebase.database().ref(`/categoriasAcompanhamentos/${usuarioLogado}/${acompanhamentosCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_CATEGORIAACOMPANHAMENTOS,
                    payload: {
                        id: acompanhamentosCategoriaId,
                        descricao: _.values(snapshot.val())[0]
                    }
                });
            })
    }
}

export const modificaQuantidadeAcompanhamento = (quantidade) => {
    return {
        type: MODIFICA_QUANTIDADEACOMPANHAMENTO,
        payload: quantidade
    };
}

export const modificaAcompanhamento = (acompanhamentoId, acompanhamentosCategoriaId) => {

    return dispatch => {
        firebase.database().ref(`/acompanhamentos/${usuarioLogado}/${acompanhamentosCategoriaId}/${acompanhamentoId}/`)
            .on("value", snapshot => {
                dispatch({
                    type: MODIFICA_ACOMPANHAMENTO,
                    payload: {
                        id: acompanhamentoId,
                        descricao: _.values(snapshot.val())[0]
                    }
                });
            })
    }
}

export const adicionaAcompanhamento = (acompanhamentoPedido, pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${pedidoAtual}/`)
            .push(acompanhamentoPedido)
            .then(() => dispatch({
                type: ADICIONA_ACOMPANHAMENTO,
                payload: acompanhamentoPedido
            }))
            .catch((erro) => dispatch({
                type: ADICIONA_ACOMPANHAMENTO,
                payload: ''
            }))
    };
}

export const removeAcompanhamento = (acompanhamentoId, pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${pedidoAtual}/${acompanhamentoId}`)
            .remove()
            .then(() => dispatch({
                type: REMOVE_ACOMPANHAMENTO,
                payload: ''
            }))
            .catch((erro) => dispatch({
                type: REMOVE_ACOMPANHAMENTO,
                payload: ''
            }))
    };
}

export const acompanhamentosPedidoFetch = (pedidoAtual) => {

    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${pedidoAtual}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_ACOMPANHAMENTOSPEDIDO, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */
export const buscaPedidoAtual = () => {
    return dispatch => {
        const pedidoId = firebase.database().ref(`/pedidos/${usuarioLogado}/`).orderByChild("status").equalTo("opened");
    };
}

export const criaNovoPedido = () => {
    return dispatch => {
        const pedidoId = firebase.database().ref(`/pedidos/${usuarioLogado}/`).push({ 'status': 'opened' }).key;
        dispatch({
            type: CRIA_NOVO_PEDIDO,
            payload: pedidoId
        });
    };
}

export const cancelaPedido = () => {
    return dispatch => {
        firebase.database().ref(`/pedidos/${usuarioLogado}/${pedido}/`)
            .update({ 'status': 'canceled' })
            .then(() => dispatch({
                type: CANCELA_PEDIDO,
                payload: ''
            }))
            .catch((erro) => dispatch({
                type: CANCELA_PEDIDO,
                payload: ''
            }))
    };
}

export const confirmaPedido = () => {
    return dispatch => {
        firebase.database().ref(`/pedidos/${usuarioLogado}/${pedido}/`)
            .update({ 'status': 'confirmed' })
            .then(() => dispatch({
                type: CONFIRMA_PEDIDO,
                payload: ''
            }))
            .catch((erro) => dispatch({
                type: CONFIRMA_PEDIDO,
                payload: ''
            }))
    };
}
