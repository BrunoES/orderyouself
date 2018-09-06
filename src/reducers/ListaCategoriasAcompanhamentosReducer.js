import { LISTA_CATEGORIASACOMPANHAMENTOS } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_CATEGORIASACOMPANHAMENTOS:
            return action.payload;
        default:
            return state;
    }
}