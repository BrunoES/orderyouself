import { UID_LOCAL, SET_NUM_MESA } from '../actions/types';

const INITIAL_STATE = {
    localId: '',
    numMesa: '',
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UID_LOCAL:
            return { ...state, localId: action.payload };
        case SET_NUM_MESA:
            return { ...state, numMesa: action.payload };
        default:
            return state;
    }
}