import { LISTA_ACOMPANHAMENTOSPEDIDO } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_ACOMPANHAMENTOSPEDIDO:
            return action.payload;
        default:
            return state;
    }
}