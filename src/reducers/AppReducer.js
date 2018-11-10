import { 
    MODIFICA_CATEGORIA,
    MODIFICA_PRATO,
    MODIFICA_QUANTIDADE,
    REMOVE_REFEICAO,

    MODIFICA_CATEGORIABEBIDAS,
    MODIFICA_BEBIDA,
    MODIFICA_QUANTIDADEBEBIDA,
    REMOVE_BEBIDA,

    MODIFICA_CATEGORIAACOMPANHAMENTOS,
    MODIFICA_ACOMPANHAMENTO,
    MODIFICA_QUANTIDADEACOMPANHAMENTO,
    REMOVE_ACOMPANHAMENTO
 } from '../actions/types';

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
    categoriaAcompanhamentos: {
        id: '',
        descricao: ''
    },
    acompanhamento: {
        id: '',
        descricao: ''
    },
    quantidade: '',
    quantidadeBebida: '',
    quantidadeAcompanhamento: ''
}

export default (state = INITIAL_STATE, action) => {
    switch(action.type){

        case MODIFICA_CATEGORIA:
            return { ...state, categoria: action.payload };
        case MODIFICA_PRATO:
            return { ...state, prato: action.payload };
        case MODIFICA_QUANTIDADE:
            return { ...state, quantidade: action.payload };
        case REMOVE_REFEICAO:
            return { ...state, prato: action.payload, quantidade: '' };
        
        case MODIFICA_CATEGORIABEBIDAS:
            return { ...state, categoriaBebidas: action.payload };
        case MODIFICA_BEBIDA:
            return { ...state, bebida: action.payload };
        case MODIFICA_QUANTIDADEBEBIDA:
            return { ...state, quantidadeBebida: action.payload };
        case REMOVE_BEBIDA:
            return { ...state, bebida: action.payload, quantidadeBebida: '' };

        case MODIFICA_CATEGORIAACOMPANHAMENTOS:
            return { ...state, categoriaAcompanhamentos: action.payload };
        case MODIFICA_ACOMPANHAMENTO:
            return { ...state, acompanhamento: action.payload };
        case MODIFICA_QUANTIDADEACOMPANHAMENTO:
            return { ...state, quantidadeAcompanhamento: action.payload };
        case REMOVE_ACOMPANHAMENTO:
            return { ...state, acompanhamento: action.payload, quantidadeAcompanhamento: '' };

        default:
            return state;
    }
}