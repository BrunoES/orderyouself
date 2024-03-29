import React, { Component } from 'react';
import { View, Text, ListView, Button, TextInput, TouchableHighlight } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import { modificaQuantidade, adicionaRefeicao, removeRefeicao, refeicoesFetch, getCurrentOrder } from '../../actions/AppActions';
import Categorias from './Categorias';
import Pratos from './Pratos';
import MyListItem from './../MyListItem';

//import NavigationBar from 'react-native-navbar';
/*
import SideMenu from 'react-native-side-menu';
import Menu from './Menu';
*/

import _ from 'lodash';

/*

const styles = {
    container: {
        flex: 1,
    },
};

const leftButtonConfig = {
    title: 'Meus Pedidos',
    handler: () => alert('hello!'),
};
  
const titleConfig = {
    title: 'Order YouSelf',
};

<NavigationBar
    title={titleConfig}
    leftButton={leftButtonConfig}
/>

class ContentView extends Component {
    render() {
        return (
            <View>
                <Text>
                    Welcome to React Native!
                </Text>
                <Text>
                    To get started, edit index.ios.js
                </Text>
                <Text>
                    Press Cmd+R to reload,{'\n'}
                    Cmd+Control+Z for dev menu
                </Text>
            </View>
        );
    }
}

<SideMenu menu={menu}>
    <ContentView />
</SideMenu>
*/

class PratoPrincipal extends Component {

    constructor(props) {
        super(props);
        this._renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        this.props.refeicoesFetch(this.props.pedidoAtual, this.props.localId);
        this.criaFonteDeDados(this.props.refeicoes);
    }

    componentWillReceiveProps(nextProps) {
        if (this.props.refeicoes.length != nextProps.refeicoes.length) {
            this.props.refeicoesFetch(this.props.pedidoAtual, this.props.localId);
        }
        this.criaFonteDeDados(nextProps.refeicoes);
    }

    criaFonteDeDados(refeicoes) {
        const ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });
        this.dataSource = ds.cloneWithRows(refeicoes);
    }

    _adicionaRefeicao() {
        if ((this.props.categoria.id && this.props.categoria.id != 0) &&
            (this.props.prato.id && this.props.prato.id != 0) &&
            (this.props.quantidade && this.props.quantidade != 0)) {
            this.props.adicionaRefeicao({
                key: '1',
                categoriaId: this.props.categoria.id,
                categoria: this.props.categoria.descricao,
                pratoId: this.props.prato.id,
                prato: this.props.prato.descricao,
                desc: this.props.prato.descricao,
                quantidade: this.props.quantidade,
                numMesa: this.props.numMesa
            },
                this.props.pedidoAtual,
                this.props.localId);
        } else {
            alert("Por favor, informe a Categoria, Prato, e Quantidade.");
        }
    }

    _removeRefeicao(refeicaoId) {
        this.props.removeRefeicao(refeicaoId, this.props.pedidoAtual, this.props.localId);
    }

    _renderRow(item) {
        return (
            <View>
                <TouchableHighlight onPress={() => this._removeRefeicao(item.uid)}>
                    <MyListItem desc={item.desc} quantidade={item.quantidade} />
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        //const menu = <Menu navigator={navigator} />;
        return (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <View style={{ flex: 0.4 }}>
                    <Categorias />
                    <Pratos />
                    <TextInput
                        value={this.props.quantidade}
                        onChangeText={text => this.props.modificaQuantidade(text)}
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
                            onPress={() => this._adicionaRefeicao()}
                            title="Adicionar"
                            color="#841584"
                            accessibilityLabel="Adicione um prato ao seu pedido de refeição."
                        />
                    </View>
                    <View style={{ flex: 0.5, marginTop: 7, marginRight: 5, marginLeft: 5 }}>
                        <Button
                            onPress={() => Actions.acompanhamentosPedido()}
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
    const localId = state.initQRCodeReducer.localId;
    const numMesa = state.initQRCodeReducer.numMesa;
    const categoria = state.AppReducer.categoria;
    const prato = state.AppReducer.prato;
    const quantidade = state.AppReducer.quantidade;

    const pedidoAtual = _.map(state.PedidoReducer, (val, uid) => {
        return uid;
    })[0];

    const refeicoes = _.map(state.ListaRefeicoesReducer, (val, uid) => {
        return { ...val, uid }
    });

    console.log(pedidoAtual);

    return { localId, numMesa, refeicoes, categoria, prato, quantidade, pedidoAtual };
}

export default connect(mapStateToProps, { modificaQuantidade, adicionaRefeicao, removeRefeicao, refeicoesFetch, getCurrentOrder })(PratoPrincipal);