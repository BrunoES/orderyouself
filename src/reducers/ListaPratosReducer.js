import { LISTA_PRATOS } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_PRATOS:
            return action.payload;
        default:
            return state;
    }
}