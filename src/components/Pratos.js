import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { pratosFetch, modificaPrato } from '../actions/AppActions'
import { getValuesFromObj } from '../utils/objutils';

class Pratos extends Component {
    
    componentWillMount() {
       this.props.pratosFetch(this.props.categoria.id);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.categoria.id != nextProps.categoria.id){
            this.props.pratosFetch(nextProps.categoria.id);
        }
    }

    _renderItems(pratos) {
        const pickerItems = _.map(pratos, (val, uid) => {
            let id = _.values(val)[1];
            let desc = _.values(val)[0];
            return <Picker.Item key={id} value={id} label={desc} />;
        });
        return pickerItems;
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 12 }}>Pratos</Text>
                <Picker
                    selectedValue={this.props.prato.id}
                    style={{ height: 50, marginLeft: 12 }}
                    onValueChange={(value) => this.props.modificaPrato(value, this.props.categoria.id)}>
                    <Picker.Item label="Selecione um prato" value="0" />
                    {this._renderItems(this.props.pratos)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const pratos = _.map(state.ListaPratosReducer, (val, uid) => {
        let desc = val.desc;
        return { desc, uid };
    });
    const categoria = state.AppReducer.categoria;
    const prato = state.AppReducer.prato;

    console.log(categoria);

    return { pratos, prato, categoria };
}

export default connect(mapStateToProps, { pratosFetch, modificaPrato })(Pratos);