import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { bebidasFetch, modificaBebida } from '../../actions/AppActions'

class Bebidas extends Component {
    
    componentWillMount() {
        if(this.props.categoriaBebidas.id != ''){
            this.props.bebidasFetch(this.props.categoriaBebidas.id, this.props.localId);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.categoriaBebidas.id != nextProps.categoriaBebidas.id){
            this.props.bebidasFetch(nextProps.categoriaBebidas.id, this.props.localId);
        }
    }

    _renderItems(bebidas) {
        const pickerItems = _.map(bebidas, (val, uid) => {
            let id = _.values(val)[1];
            let desc = _.values(val)[0];
            return <Picker.Item key={id} value={id} label={desc} />;
        });
        return pickerItems;
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 12 }}>Bebidas</Text>
                <Picker
                    selectedValue={this.props.bebida.id}
                    style={{ height: 50, marginLeft: 12 }}
                    onValueChange={(value) => this.props.modificaBebida(value, this.props.categoriaBebidas.id, this.props.localId)}>
                    <Picker.Item label="Selecione um prato" value="0" />
                    {this._renderItems(this.props.bebidas)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const localId = state.initQRCodeReducer.localId;
    const bebidas = _.map(state.ListaBebidasReducer, (val, uid) => {
        let desc = val.desc;
        return { desc, uid };
    });
    const categoriaBebidas = state.AppReducer.categoriaBebidas;
    const bebida = state.AppReducer.bebida;

    return { localId, bebidas, bebida, categoriaBebidas };
}

export default connect(mapStateToProps, { bebidasFetch, modificaBebida })(Bebidas);