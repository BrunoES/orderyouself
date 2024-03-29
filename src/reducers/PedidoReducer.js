import { CANCELA_PEDIDO, CONFIRMA_PEDIDO, CRIA_NOVO_PEDIDO, RECUPERA_PEDIDO_ATUAL, REMOVE_PEDIDO_ATUAL, SET_MESA_PEDIDO } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case CANCELA_PEDIDO:
            return action.payload;            
        case CONFIRMA_PEDIDO:
            return action.payload;
        case CRIA_NOVO_PEDIDO:
            return action.payload;
        case RECUPERA_PEDIDO_ATUAL:
            return action.payload;
        case REMOVE_PEDIDO_ATUAL:
            return action.payload;
        case SET_MESA_PEDIDO:
            return action.payload;
        default:
            return state;
    }
}