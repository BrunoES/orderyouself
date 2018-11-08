import React, { Component } from 'react';
import { View, Text, ListView, Button, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import { Actions } from 'react-native-router-flux';

import { modificaQuantidadeAcompanhamento, adicionaAcompanhamento, removeAcompanhamento, acompanhamentosPedidoFetch } from '../../actions/AppActions'
import CategoriaAcompanhamentos from './CategoriaAcompanhamentos';
import Acompanhamentos from './Acompanhamentos';
import MyListItem from './../MyListItem';

import _ from 'lodash';

class AcompanhamentosPedido extends Component {

    constructor(props){
        super(props);
        this._renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        this.props.acompanhamentosPedidoFetch();
        this.criaFonteDeDados(this.props.acompanhamentos);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.acompanhamentos.length != nextProps.acompanhamentos.length){
            this.props.acompanhamentosPedidoFetch();
        }
        this.criaFonteDeDados(nextProps.acompanhamentos);
    }

    criaFonteDeDados(acompanhamentos) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(acompanhamentos);
    }

    _adicionaAcompanhamento() {
        this.props.adicionaAcompanhamento({
            key: '1',
            categoriaAcompanhamentosId: this.props.categoriaAcompanhamentos.id,
            categoriaAcompanhamentos: this.props.categoriaAcompanhamentos.descricao,
            acompanhamentoId: this.props.acompanhamento.id,
            acompanhamento: this.props.acompanhamento.descricao,
            desc: this.props.acompanhamento.descricao,
            quantidade: this.props.quantidadeAcompanhamento
        });
    }

    _removeAcompanhamento(acompanhamentoId) {
        this.props.removeAcompanhamento(acompanhamentoId);
    }

    _renderRow(item) {
        return (
            <View>
                <TouchableHighlight onPress={ () => this._removeAcompanhamento(item.uid) }>
                    <MyListItem desc={item.desc} quantidade={item.quantidadeAcompanhamento} />
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View>
                <View>
                    <CategoriaAcompanhamentos />
                    <Acompanhamentos />
                    <TextInput
                        value={this.props.quantidadeAcompanhamento}
                        onChangeText={text => this.props.modificaQuantidadeAcompanhamento(text) }
                        placeholder={"Quantidade"}
                    />
                    <Button
                        onPress={() => this._adicionaAcompanhamento()}
                        title="Adicionar"
                        color="#841584"
                        accessibilityLabel="Adicione uma acompanhamento ao seu pedido."
                    />
                    <Button
                        onPress={ () => Actions.bebidasPedido() }
                        title="Avançar"
                        color="#841584"
                        accessibilityLabel="Avançe para a tela de acompanhamentos."
                    />
                </View>
                <View>
                    <ListView 
                     enableEmptySections
                     dataSource={this.dataSource}
                     renderRow={this._renderRow}
                    />   
                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    const categoriaAcompanhamentos = state.AppReducer.categoriaAcompanhamentos;
    const acompanhamento = state.AppReducer.acompanhamento;
    const quantidadeAcompanhamento = state.AppReducer.quantidadeAcompanhamento;
    
    const pedidoAtual = _.map(state.PedidoReducer, (val, uid) => {
        return uid;
    })[0];

    const acompanhamentos = _.map(state.ListaAcompanhamentosPedidoReducer, (val, uid) => {
        return { ...val, uid }
    });
    
    return { acompanhamentos, categoriaAcompanhamentos, acompanhamento, quantidadeAcompanhamento, pedidoAtual };
}

export default connect(mapStateToProps, { modificaQuantidadeAcompanhamento, adicionaAcompanhamento, removeAcompanhamento, acompanhamentosPedidoFetch })(AcompanhamentosPedido);