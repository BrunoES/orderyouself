import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { pratosFetch, modificaPrato } from '../actions/AppActions'
import { getValuesFromObj } from '../utils/objutils';

class Pratos extends Component {
    
    componentWillMount() {
       this.props.pratosFetch();
    }

    _renderItems(pratos) {
        const pickerItems = _.map(pratos, (val, uid) => {
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
                <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 12 }}>Pratos</Text>
                <Picker
                    selectedValue={this.props.prato}
                    style={{ height: 50, marginLeft: 12 }}
                    onValueChange={(value) => this.props.modificaPrato(value)}>
                    {this._renderItems(this.props.pratos)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const pratos = _.map(state.ListaPratosReducer, (val, uid) => {
        let desc = getValuesFromObj(getValuesFromObj(val)).desc;
        return { desc, uid };
    });
    const prato = state.AppReducer.prato;
    return { pratos, prato };
}

export default connect(mapStateToProps, { pratosFetch, modificaPrato })(Pratos);