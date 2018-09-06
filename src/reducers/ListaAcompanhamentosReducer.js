import { LISTA_ACOMPANHAMENTOS } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_ACOMPANHAMENTOS:
            return action.payload;
        default:
            return state;
    }
}