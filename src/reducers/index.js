import { combineReducers } from 'redux';
import ListaCategoriasReducer from './ListaCategoriasReducer';
import ListaPratosReducer from './ListaPratosReducer';

export default combineReducers({
    ListaCategoriasReducer,
    ListaPratosReducer
});