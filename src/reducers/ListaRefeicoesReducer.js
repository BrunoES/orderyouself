import { LISTA_REFEICOES } from '../actions/types';

const INITIAL_STATE = {

}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case LISTA_REFEICOES:
            return action.payload;
        default:
            return state;
    }
}