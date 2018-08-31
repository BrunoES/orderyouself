import { 
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO,
    ADICIONA_REFEICAO,
    REMOVE_REFEICAO
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
    refeicoes: [{
        key: '0',
        uid: '',
        categoriaId: '',
        categoria: '',
        pratoId: '',
        prato: '',
        desc: 'Selecione sua refeição',
        quantidade: 0

    }]
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){
        case MODIFICA_CATEGORIA:
            return { ...state, categoria: action.payload };
        case MODIFICA_PRATO:
            return { ...state, prato: action.payload };
        case REMOVE_REFEICAO:
            return { ...state, prato: action.payload };
        case ADICIONA_REFEICAO:
            INITIAL_STATE.refeicoes.push(action.payload);
            return { ...state, refeicoes: INITIAL_STATE.refeicoes };
        default:
            return state;
    }
}