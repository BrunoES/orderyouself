import { combineReducers } from 'redux';
import AppReducer from './AppReducer';

import ListaPratosReducer from './ListaPratosReducer';
import ListaBebidasReducer from './ListaBebidasReducer';
import ListaAcompanhamentosReducer from './ListaAcompanhamentosReducer';

import ListaRefeicoesReducer from './ListaRefeicoesReducer';
import ListaBebidasPedidoReducer from './ListaBebidasPedidoReducer';
import ListaAcompanhamentosPedidoReducer from './ListaAcompanhamentosPedidoReducer';

import ListaCategoriasReducer from './ListaCategoriasReducer';
import ListaCategoriasBebidasReducer from './ListaCategoriasBebidasReducer';
import ListaCategoriasAcompanhamentosReducer from './ListaCategoriasAcompanhamentosReducer';


export default combineReducers({
    AppReducer,
    ListaPratosReducer,
    ListaBebidasReducer,
    ListaAcompanhamentosReducer,

    ListaRefeicoesReducer,
    ListaBebidasPedidoReducer,
    ListaAcompanhamentosPedidoReducer,

    ListaCategoriasReducer,
    ListaCategoriasBebidasReducer,
    ListaCategoriasAcompanhamentosReducer
});