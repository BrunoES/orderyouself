import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { acompanhamentosFetch, modificaAcompanhamento } from '../../actions/AppActions'

class Acompanhamentos extends Component {
    
    componentWillMount() {
        if(this.props.categoriaAcompanhamentos.id != ''){
            this.props.acompanhamentosFetch(this.props.categoriaAcompanhamentos.id);
        }
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.categoriaAcompanhamentos.id != nextProps.categoriaAcompanhamentos.id){
            this.props.acompanhamentosFetch(nextProps.categoriaAcompanhamentos.id);
        }
    }

    _renderItems(acompanhamentos) {
        const pickerItems = _.map(acompanhamentos, (val, uid) => {
            let id = _.values(val)[1];
            let desc = _.values(val)[0];
            return <Picker.Item key={id} value={id} label={desc} />;
        });
        return pickerItems;
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 12 }}>Acompanhamentos</Text>
                <Picker
                    selectedValue={this.props.acompanhamento.id}
                    style={{ height: 50, marginLeft: 12 }}
                    onValueChange={(value) => this.props.modificaAcompanhamento(value, this.props.categoriaAcompanhamentos.id)}>
                    <Picker.Item label="Selecione um prato" value="0" />
                    {this._renderItems(this.props.acompanhamentos)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const acompanhamentos = _.map(state.ListaAcompanhamentosReducer, (val, uid) => {
        let desc = val.desc;
        return { desc, uid };
    });
    const categoriaAcompanhamentos = state.AppReducer.categoriaAcompanhamentos;
    const acompanhamento = state.AppReducer.acompanhamento;

    return { acompanhamentos, acompanhamento, categoriaAcompanhamentos };
}

export default connect(mapStateToProps, { acompanhamentosFetch, modificaAcompanhamento })(Acompanhamentos);