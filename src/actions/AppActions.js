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
    MODIFICA_QUANTIDADEACOMPANHAMENTO
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

export const modificaQuantidade = (quantidade) => {
    return {
        type: MODIFICA_QUANTIDADE,
        payload: quantidade
    };
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
                payload: ''
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

/* --------------------------------------------------------------------------------------------------- */

export const categoriasBebidasFetch = () => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/categoriasBebidas/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIASBEBIDAS, payload: snapshot.val() });
            })
    }
}

export const bebidasFetch = (bebidasCategoriaId) => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/bebidas/${usuarioLogado}/${bebidasCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_BEBIDAS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoriaBebidas = bebidasCategoriaId => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
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
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
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

export const adicionaBebida = bebidaPedido => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/`)
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

export const removeBebida = bebidaId => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/${bebidaId}`)
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

export const bebidasPedidoFetch = () => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/bebidaspedido/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_BEBIDASPEDIDO, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */

export const categoriasAcompanhamentosFetch = () => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/categoriasAcompanhamentos/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_CATEGORIASACOMPANHAMENTOS, payload: snapshot.val() });
            })
    }
}

export const acompanhamentosFetch = (acompanhamentosCategoriaId) => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/acompanhamentos/${usuarioLogado}/${acompanhamentosCategoriaId}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_ACOMPANHAMENTOS, payload: snapshot.val() });
            })
    }
}

export const modificaCategoriaAcompanhamentos = acompanhamentosCategoriaId => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
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
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
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

export const adicionaAcompanhamento = acompanhamentoPedido => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/`)
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

export const removeAcompanhamento = acompanhamentoId => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${acompanhamentoId}`)
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

export const acompanhamentosPedidoFetch = () => {
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/`)
            .on("value", snapshot => {
                dispatch({ type: LISTA_ACOMPANHAMENTOSPEDIDO, payload: snapshot.val() });
            })
    };
}

/* --------------------------------------------------------------------------------------------------- */

export const cancelaPedido = acompanhamentoId => {
    alert("cancelaPedido");
    return;
    /*
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/${acompanhamentoId}`)
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
    */
}

export const confirmaPedido = acompanhamentoPedido => {
    alert("confirmaPedido");
    return;
    /*
    let usuarioLogado = "6abe636d-f47a-415e-9493-ac89db41361f";
    return dispatch => {
        firebase.database().ref(`/acompanhamentosPedido/${usuarioLogado}/`)
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
    */
}
