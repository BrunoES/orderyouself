import React, { Component } from 'react';
import { View, Text, TextInput, Picker, FlatList, Button } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { categoriasFetch} from '../actions/AppActions'
import Categorias from './Categorias';
import Pratos from './Pratos';

export default class Pedido extends Component {
    render() {
        return (
            <View>
                <Categorias />
                <Pratos />
            </View>
        );
    }
}