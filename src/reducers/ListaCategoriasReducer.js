import { LISTA_CATEGORIAS } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_CATEGORIAS:
            return action.payload;
        default:
            return state;
    }
}