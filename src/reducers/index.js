import { combineReducers } from 'redux';
import AppReducer from './AppReducer';
import ListaCategoriasReducer from './ListaCategoriasReducer';
import ListaPratosReducer from './ListaPratosReducer';
import ListaRefeicoesReducer from './ListaRefeicoesReducer';

export default combineReducers({
    AppReducer,
    ListaCategoriasReducer,
    ListaPratosReducer,
    ListaRefeicoesReducer
});