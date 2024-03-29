import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import AutenticacaoReducer from './AutenticacaoReducer';

import ListaPratosReducer from './ListaPratosReducer';
import ListaBebidasReducer from './ListaBebidasReducer';
import ListaAcompanhamentosReducer from './ListaAcompanhamentosReducer';

import ListaRefeicoesReducer from './ListaRefeicoesReducer';
import ListaBebidasPedidoReducer from './ListaBebidasPedidoReducer';
import ListaAcompanhamentosPedidoReducer from './ListaAcompanhamentosPedidoReducer';

import ListaCategoriasReducer from './ListaCategoriasReducer';
import ListaCategoriasBebidasReducer from './ListaCategoriasBebidasReducer';
import ListaCategoriasAcompanhamentosReducer from './ListaCategoriasAcompanhamentosReducer';

import PedidoReducer from './PedidoReducer';
import MeusPedidosReducer from './MeusPedidosReducer';

import initQRCodeReducer from '../components/initQRCodeReducer';

export default combineReducers({
    AppReducer,
    AutenticacaoReducer,
    
    ListaPratosReducer,
    ListaBebidasReducer,
    ListaAcompanhamentosReducer,

    ListaRefeicoesReducer,
    ListaBebidasPedidoReducer,
    ListaAcompanhamentosPedidoReducer,

    ListaCategoriasReducer,
    ListaCategoriasBebidasReducer,
    ListaCategoriasAcompanhamentosReducer,

    PedidoReducer,
    MeusPedidosReducer,

    initQRCodeReducer
});