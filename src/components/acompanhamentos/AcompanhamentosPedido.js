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
        this.props.acompanhamentosPedidoFetch(this.props.pedidoAtual);
        this.criaFonteDeDados(this.props.acompanhamentos);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.acompanhamentos.length != nextProps.acompanhamentos.length){
            this.props.acompanhamentosPedidoFetch(this.props.pedidoAtual);
        }
        this.criaFonteDeDados(nextProps.acompanhamentos);
    }

    criaFonteDeDados(acompanhamentos) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(acompanhamentos);
    }

    _adicionaAcompanhamento() {
        if ((this.props.categoriaAcompanhamentos.id && this.props.categoriaAcompanhamentos.id != 0) &&
            (this.props.acompanhamento.id && this.props.acompanhamento.id != 0) &&
            (this.props.quantidadeAcompanhamento && this.props.quantidadeAcompanhamento != 0)){
            this.props.adicionaAcompanhamento({
                key: '1',
                categoriaAcompanhamentosId: this.props.categoriaAcompanhamentos.id,
                categoriaAcompanhamentos: this.props.categoriaAcompanhamentos.descricao,
                acompanhamentoId: this.props.acompanhamento.id,
                acompanhamento: this.props.acompanhamento.descricao,
                desc: this.props.acompanhamento.descricao,
                quantidade: this.props.quantidadeAcompanhamento
            },
            this.props.pedidoAtual);
        } else {
            alert("Por favor, informe a Categoria, Prato, e Quantidade.");
        }
    }

    _removeAcompanhamento(acompanhamentoId) {
        this.props.removeAcompanhamento(acompanhamentoId, this.props.pedidoAtual);
    }

    _renderRow(item) {
        return (
            <View>
                <TouchableHighlight onPress={ () => this._removeAcompanhamento(item.uid) }>
                    <MyListItem desc={item.desc} quantidade={item.quantidade} />
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
                
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <View style={{ flex: 0.4 }}>
                    <CategoriaAcompanhamentos />
                    <Acompanhamentos />
                    <TextInput
                        value={this.props.quantidadeAcompanhamento}
                        onChangeText={text => this.props.modificaQuantidadeAcompanhamento(text) }
                        placeholder={"Quantidade"}
                        style={{ marginHorizontal: 20, fontSize: 17 }}
                    />
                </View>
                <View style={{ flex: 0.5 }}>
                    <ListView 
                        style={{ marginBottom: 5, marginTop: 5 }}
                        enableEmptySections
                        dataSource={this.dataSource}
                        renderRow={this._renderRow}
                    />   
                </View>
                <View style={{ flex: 0.1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, marginTop: 7, marginRight: 5, marginLeft: 5 }}>
                        <Button
                            onPress={() => this._adicionaAcompanhamento()}
                            title="Adicionar"
                            color="#841584"
                            accessibilityLabel="Adicione uma acompanhamento ao seu pedido."
                        />
                    </View>
                    <View style={{ flex: 0.5, marginTop: 7, marginRight: 5, marginLeft: 5 }}>
                        <Button
                            onPress={ () => Actions.bebidasPedido() }
                            title="Avançar"
                            color="#841584"
                            accessibilityLabel="Avançe para a tela de acompanhamentos."
                        />
                    </View>
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