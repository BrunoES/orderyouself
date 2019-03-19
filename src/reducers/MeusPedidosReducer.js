import { MEUS_PEDIDOS_FETCH } from '../actions/types';

const INITIAL_STATE = {
    pedidos: [ { mesa: 0, status: "", uid: ""} ]
};

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MEUS_PEDIDOS_FETCH:
            return { ...state, pedidos: action.payload};
        default:
            return state;
    }
}