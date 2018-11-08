import React, { Component } from 'react';
import { View, Text, ListView, Button, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { modificaQuantidade, adicionaRefeicao, removeRefeicao, refeicoesFetch, getCurrentOrder } from '../../actions/AppActions';
import Categorias from './Categorias';
import Pratos from './Pratos';
import MyListItem from './../MyListItem';

import _ from 'lodash';

class PratoPrincipal extends Component {

    constructor(props){
        super(props);
        this._renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        this.props.refeicoesFetch(this.props.pedidoAtual);
        this.criaFonteDeDados(this.props.refeicoes);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.refeicoes.length != nextProps.refeicoes.length){
            this.props.refeicoesFetch(this.props.pedidoAtual);
        }
        this.criaFonteDeDados(nextProps.refeicoes);
    }

    criaFonteDeDados(refeicoes) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(refeicoes);
    }

    _adicionaRefeicao() {
        this.props.adicionaRefeicao({
            key: '1',
            categoriaId: this.props.categoria.id,
            categoria: this.props.categoria.descricao,
            pratoId: this.props.prato.id,
            prato: this.props.prato.descricao,
            desc: this.props.prato.descricao,
            quantidade: this.props.quantidade
        },
        this.props.pedidoAtual);
    }

    _removeRefeicao(refeicaoId) {
        this.props.removeRefeicao(refeicaoId, this.props.pedidoAtual);
    }

    _renderRow(item) {
        return (
            <View>
                <TouchableHighlight onPress={ () => this._removeRefeicao(item.uid) }>
                    <MyListItem desc={item.desc} quantidade={item.quantidade} />
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View>
                <View>
                    <Categorias />
                    <Pratos />
                    <TextInput
                        value={this.props.quantidade}
                        onChangeText={text => this.props.modificaQuantidade(text) }
                        placeholder={"Quantidade"}
                    />
                    <Button
                        onPress={() => this._adicionaRefeicao()}
                        title="Adicionar"
                        color="#841584"
                        accessibilityLabel="Adicione um prato ao seu pedido de refeição."
                    />
                    <Button
                        onPress={ () => Actions.acompanhamentosPedido() }
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
    const categoria = state.AppReducer.categoria;
    const prato = state.AppReducer.prato;
    const quantidade = state.AppReducer.quantidade;

    const pedidoAtual = _.map(state.PedidoReducer, (val, uid) => {
        return uid;
    })[0];

    const refeicoes = _.map(state.ListaRefeicoesReducer, (val, uid) => {
        return { ...val, uid }
    });

    return { refeicoes, categoria, prato, quantidade, pedidoAtual };
}

export default connect(mapStateToProps, { modificaQuantidade, adicionaRefeicao, removeRefeicao, refeicoesFetch, getCurrentOrder })(PratoPrincipal);