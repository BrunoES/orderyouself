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
    RECUPERA_PEDIDO_ATUAL,
    REMOVE_PEDIDO_ATUAL,

    UID_LOCAL,

    SET_NUM_MESA,
    SET_MESA_PEDIDO
} from './types';

import _ from 'lodash';
import firebase from 'firebase';

const usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
//const pedido = "b68cf9a9-c745-4752-95c2-8638732a94ce";
const localId = "NMajCK3oEvhj2XhyCzbf2bxj73H3";

export const categoriasFetch = (localId) => {
    return dispatch => {
        firebase.database().ref(`/categoriasPratos/${localId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIAS, payload: snapshot.val() });
            })
    }
}

export const pratosFetch = (idCategoria, localId) => {
    return dispatch => {
        firebase.database().ref(`/pratos/${localId}/${idCategoria}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_PRATOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoria = (idCategoria, localId) => {
    return dispatch => {
        firebase.database().ref(`/categoriasPratos/${localId}/${idCategoria}/`)
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

export const modificaPrato = (idPrato, idCategoria, localId) => {
    return dispatch => {
        firebase.database().ref(`/pratos/${localId}/${idCategoria}/${idPrato}/`)
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

export const adicionaRefeicao = (refeicao, pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/${localId}/${pedidoAtual}/`)
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

export const removeRefeicao = (refeicaoId, pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/${localId}/${pedidoAtual}/${refeicaoId}`)
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

export const refeicoesFetch = (pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/refeicoes/${usuarioLogado}/${localId}/${pedidoAtual}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_REFEICOES, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */

export const categoriasBebidasFetch = (localId) => {
    return dispatch => {
        firebase.database().ref(`/categoriasBebidas/${localId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIASBEBIDAS, payload: snapshot.val() });
            })
    }
}

export const bebidasFetch = (bebidasCategoriaId, localId) => {
    return dispatch => {
        firebase.database().ref(`/bebidas/${localId}/${bebidasCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_BEBIDAS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoriaBebidas = (bebidasCategoriaId, localId) => {
    return dispatch => {
        firebase.database().ref(`/categoriasBebidas/${localId}/${bebidasCategoriaId}/`)
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

export const modificaBebida = (bebidaId, bebidasCategoriaId, localId) => {
    return dispatch => {
        firebase.database().ref(`/bebidas/${localId}/${bebidasCategoriaId}/${bebidaId}/`)
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

export const adicionaBebida = (bebidaPedido, pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/${localId}/${pedidoAtual}/`)
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

export const removeBebida = (bebidaId, pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/${localId}/${pedidoAtual}/${bebidaId}`)
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

export const bebidasPedidoFetch = (pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/${localId}/${pedidoAtual}`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_BEBIDASPEDIDO, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */

export const categoriasAcompanhamentosFetch = (localId) => {
    return dispatch => {
        firebase.database().ref(`/categoriasAcompanhamentos/${localId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIASACOMPANHAMENTOS, payload: snapshot.val() });
            })
    }
}

export const acompanhamentosFetch = (acompanhamentosCategoriaId, localId) => {
    return dispatch => {
        firebase.database().ref(`/acompanhamentos/${localId}/${acompanhamentosCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_ACOMPANHAMENTOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoriaAcompanhamentos = (acompanhamentosCategoriaId, localId) => {
    return dispatch => {
        firebase.database().ref(`/categoriasAcompanhamentos/${localId}/${acompanhamentosCategoriaId}/`)
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

export const modificaAcompanhamento = (acompanhamentoId, acompanhamentosCategoriaId, localId) => {
    return dispatch => {
        firebase.database().ref(`/acompanhamentos/${localId}/${acompanhamentosCategoriaId}/${acompanhamentoId}/`)
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

export const adicionaAcompanhamento = (acompanhamentoPedido, pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${localId}/${pedidoAtual}/`)
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

export const removeAcompanhamento = (acompanhamentoId, pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${localId}/${pedidoAtual}/${acompanhamentoId}`)
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

export const acompanhamentosPedidoFetch = (pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${localId}/${pedidoAtual}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_ACOMPANHAMENTOSPEDIDO, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */
/*
export const buscaPedidoAtual = () => {
    return dispatch => {
        const pedidoId = firebase.database().ref(`/pedidos/${usuarioLogado}/${localId}/`).orderByChild("status").equalTo("opened");
    };
}
*/
export const getCurrentOrder = () => {
    return dispatch => {
        firebase.database().ref(`/pedidoAtual/${usuarioLogado}/${localId}/`)
            .on("value", snapshot => {
                dispatch({ type: RECUPERA_PEDIDO_ATUAL, payload: snapshot.val() });
            })
    }
}

export const criaNovoPedido = (localId) => {
    return dispatch => {
        const pedidoId = firebase.database().ref(`/pedidoAtual/${usuarioLogado}/${localId}/`).push({ 'desc': 'PedidoAtual' }).key;
        if(pedidoId !== ''){
            firebase.database().ref(`/pedidos/${usuarioLogado}/${localId}/`).child(pedidoId).set({ 'status': 'opened' });
        }
        dispatch({
            type: CRIA_NOVO_PEDIDO,
            payload: pedidoId
        });
    };
}

export const setMesaPedido = (pedidoAtual, numMesa, localId) => {
    return dispatch => {
        //firebase.database().ref(`/pedidos/${usuarioLogado}/${localId}/${pedidoAtual}/mesa`).setValue(numMesa)
        //firebase.database().child(`/pedidos/${usuarioLogado}/${localId}/${pedidoAtual}/`).setValue(numMesa)
        firebase.database().ref(`/pedidos/${usuarioLogado}/${localId}/${pedidoAtual}/mesa`).set(numMesa);
        /*
        .on("value", snapshot => {
            dispatch({ type: SET_MESA_PEDIDO, payload: snapshot.val() });
        })*/
    };
}

/*
export const criaNovoPedido = () => {
    return dispatch => {
        const pedidoId = firebase.database().ref(`/pedidos/${usuarioLogado}/`).push({ 'status': 'opened' }).key;
        dispatch({
            type: CRIA_NOVO_PEDIDO,
            payload: pedidoId
        });
    };
}
*/

export const deletaPedidoAtual = (pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/pedidoAtual/${usuarioLogado}/${localId}/${pedidoAtual}/`)
            .remove()
            .then(() => dispatch({
                type: REMOVE_PEDIDO_ATUAL,
                payload: ''
            }))
            .catch((erro) => dispatch({
                type: REMOVE_PEDIDO_ATUAL,
                payload: ''
            }))
    };
}

export const cancelaPedido = (pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/pedidos/${usuarioLogado}/${localId}/${pedidoAtual}/`)
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

export const confirmaPedido = (pedidoAtual, localId) => {
    return dispatch => {
        firebase.database().ref(`/pedidos/${usuarioLogado}/${localId}/${pedidoAtual}/`)
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

/* --------------------------------------------------------------------------------------------------- */
export const setUidLocal = (localId) => {
    return {
        type: UID_LOCAL,
        payload: localId
    };
}

export const setNumMesa = (numMesa) => {
    return {
        type: SET_NUM_MESA,
        payload: numMesa
    };
}