import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { categoriasAcompanhamentosFetch, modificaCategoriaAcompanhamentos } from '../../actions/AppActions'

class CategoriaAcompanhamentos extends Component {
    
    componentWillMount() {
       this.props.categoriasAcompanhamentosFetch(this.props.localId);
    }

    _renderItems(categoriasAcompanhamentos) {
        const pickerItems = _.map(categoriasAcompanhamentos, (val, uid) => {
            let id = _.values(val)[1];
            let desc = _.values(val)[0];
            return <Picker.Item key={id} value={id} label={desc} />;
        });
        return pickerItems;
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 12 }}>Categorias</Text>
                <Picker
                    selectedValue={this.props.categoriaAcompanhamentos.id}
                    style={{ height: 50, marginLeft: 12 }}
                    onValueChange={(value) => this.props.modificaCategoriaAcompanhamentos(value, this.props.localId)}>
                    <Picker.Item label="Selecione uma categoria" value="0" />
                    {this._renderItems(this.props.categoriasAcompanhamentos)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const localId = state.initQRCodeReducer.localId;
    const categoriasAcompanhamentos = _.map(state.ListaCategoriasAcompanhamentosReducer, (val, uid) => {
        let desc = val.desc;
        return { desc, uid };
    });
    const categoriaAcompanhamentos = state.AppReducer.categoriaAcompanhamentos;
    return { localId, categoriasAcompanhamentos, categoriaAcompanhamentos };
}

export default connect(mapStateToProps, { categoriasAcompanhamentosFetch, modificaCategoriaAcompanhamentos })(CategoriaAcompanhamentos);