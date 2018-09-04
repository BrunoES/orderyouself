import { 
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO,
    MODIFICA_QUANTIDADE,
    REMOVE_REFEICAO,
    MODIFICA_CATEGORIABEBIDAS,
    MODIFICA_BEBIDA,
    MODIFICA_QUANTIDADEBEBIDA,
    REMOVE_BEBIDA
 } from '../actions/types';
import { Actions } from 'react-native-router-flux';

const INITIAL_STATE = {
    categoria: {
        id: '',
        descricao: ''
    },
    prato: {
        id: '',
        descricao: ''
    },
    categoriaBebidas: {
        id: '',
        descricao: ''
    },
    bebida: {
        id: '',
        descricao: ''
    },
    quantidade: '',
    quantidadeBebida: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MODIFICA_CATEGORIABEBIDAS:
            return { ...state, categoriaBebidas: action.payload };
        case MODIFICA_BEBIDA:
            return { ...state, bebida: action.payload };
        case MODIFICA_QUANTIDADEBEBIDA:
            return { ...state, quantidadeBebida: action.payload };
        case REMOVE_BEBIDA:
            return { ...state, prato: action.payload };

        case MODIFICA_CATEGORIA:
            return { ...state, categoria: action.payload };
        case MODIFICA_PRATO:
            return { ...state, prato: action.payload };
        case MODIFICA_QUANTIDADE:
            return { ...state, quantidade: action.payload };
        case REMOVE_REFEICAO:
            return { ...state, prato: action.payload };
        

        default:
            return state;
    }
}