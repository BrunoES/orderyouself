import { LISTA_BEBIDAS } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_BEBIDAS:
            return action.payload;
        default:
            return state;
    }
}