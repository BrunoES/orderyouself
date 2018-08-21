import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { categoriasFetch, modificaCategoria } from '../actions/AppActions'
import { getValuesFromObj } from '../utils/objutils';

class Categorias extends Component {
    
    componentWillMount() {
       this.props.categoriasFetch();
    }

    _renderItems(categorias) {
        const pickerItems = _.map(categorias, (val, uid) => {
            let id = _.values(val)[1];
            let desc = _.values(val)[0];
            console
            return <Picker.Item key={id} value={id} label={desc} />;
        });
        return pickerItems;
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 12 }}>Categorias</Text>
                <Picker
                    selectedValue={this.props.categoria}
                    style={{ height: 50, marginLeft: 12 }}
                    onValueChange={(value) => this.props.modificaCategoria(value)}>
                    {this._renderItems(this.props.categorias)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const categorias = _.map(state.ListaCategoriasReducer, (val, uid) => {
        let desc = getValuesFromObj(val).desc;
        return { desc, uid };
    });
    const categoria = state.AppReducer.categoria;
    return { categorias, categoria };
}

export default connect(mapStateToProps, { categoriasFetch, modificaCategoria })(Categorias);