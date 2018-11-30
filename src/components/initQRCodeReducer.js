import { UID_LOCAL } from '../actions/types';

const INITIAL_STATE = {
    localId: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case UID_LOCAL:
            return { ...state, localId: action.payload };
        default:
            return state;
    }
}