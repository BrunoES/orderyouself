import { 
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO
 } from '../actions/types';

const INITIAL_STATE = {
    categoria: '',
    prato: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MODIFICA_CATEGORIA:
            return { ...state, categoria: action.payload };
        case MODIFICA_PRATO:
            return { ...state, prato: action.payload };
        default:
            return state;
    }
}