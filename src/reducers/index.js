import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import ListaCategoriasReducer from './ListaCategoriasReducer';
import ListaPratosReducer from './ListaPratosReducer';
import ListaRefeicoesReducer from './ListaRefeicoesReducer';
import ListaBebidasPedidoReducer from './ListaBebidasPedidoReducer';
import ListaBebidasReducer from './ListaBebidasReducer';
import ListaCategoriasBebidasReducer from './ListaCategoriasBebidasReducer';


export default combineReducers({
    AppReducer,
    ListaCategoriasReducer,
    ListaPratosReducer,
    ListaRefeicoesReducer,
    ListaBebidasPedidoReducer,
    ListaBebidasReducer,
    ListaCategoriasBebidasReducer
});