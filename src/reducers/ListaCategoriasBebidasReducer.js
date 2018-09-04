import { LISTA_CATEGORIASBEBIDAS } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_CATEGORIASBEBIDAS:
            return action.payload;
        default:
            return state;
    }
}