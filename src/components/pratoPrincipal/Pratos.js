import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { pratosFetch, modificaPrato } from '../../actions/AppActions'

class Pratos extends Component {
    
    componentWillMount() {
        if(this.props.categoria.id != ''){
            this.props.pratosFetch(this.props.categoria.id, this.props.localId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.categoria.id != nextProps.categoria.id){
            this.props.pratosFetch(nextProps.categoria.id, this.props.localId);
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
                    onValueChange={(value) => this.props.modificaPrato(value, this.props.categoria.id, this.props.localId)}>
                    <Picker.Item label="Selecione um prato" value="0" />
                    {this._renderItems(this.props.pratos)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const localId = state.initQRCodeReducer.localId;
    const pratos = _.map(state.ListaPratosReducer, (val, uid) => {
        let desc = val.desc;
        return { desc, uid };
    });
    const categoria = state.AppReducer.categoria;
    const prato = state.AppReducer.prato;

    return { localId, pratos, prato, categoria };
}

export default connect(mapStateToProps, { pratosFetch, modificaPrato })(Pratos);