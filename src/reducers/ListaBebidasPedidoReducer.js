import { LISTA_BEBIDASPEDIDO } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_BEBIDASPEDIDO:
            return action.payload;
        default:
            return state;
    }
}