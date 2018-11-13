import React, { Component } from 'react';
import { View, Text, ListView, Button, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';

import { modificaQuantidadeBebida, adicionaBebida, removeBebida, bebidasPedidoFetch } from '../../actions/AppActions'
import CategoriaBebidas from './CategoriaBebidas';
import Bebidas from './Bebidas';
import MyListItem from './../MyListItem';

import _ from 'lodash';
import { Actions } from 'react-native-router-flux';

class BebidasPedido extends Component {

    constructor(props){
        super(props);
        this._renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        this.props.bebidasPedidoFetch(this.props.pedidoAtual);
        this.criaFonteDeDados(this.props.bebidas);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.bebidas.length != nextProps.bebidas.length){
            this.props.bebidasPedidoFetch(this.props.pedidoAtual);
        }
        this.criaFonteDeDados(nextProps.bebidas);
    }

    criaFonteDeDados(bebidas) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(bebidas);
    }

    _adicionaBebida() {
        if ((this.props.categoriaBebidas.id && this.props.categoriaBebidas.id != 0) &&
            (this.props.bebida.id && this.props.bebida.id != 0) &&
            (this.props.quantidadeBebida && this.props.quantidadeBebida != 0)){
            this.props.adicionaBebida({
                key: '1',
                categoriaBebidasId: this.props.categoriaBebidas.id,
                categoriaBebidas: this.props.categoriaBebidas.descricao,
                bebidaId: this.props.bebida.id,
                bebida: this.props.bebida.descricao,
                desc: this.props.bebida.descricao,
                quantidade: this.props.quantidadeBebida
            },
            this.props.pedidoAtual);
        } else {
            alert("Por favor, informe a Categoria, Prato, e Quantidade.");
        }
    }

    _removeBebida(bebidaId) {
        this.props.removeBebida(bebidaId, this.props.pedidoAtual);
    }

    _renderRow(item) {
        return (
            <View>
                <TouchableHighlight onPress={ () => this._removeBebida(item.uid) }>
                    <MyListItem desc={item.desc} quantidade={item.quantidade} />
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <View style={{ flex: 0.4 }}>
                    <CategoriaBebidas />
                    <Bebidas />
                    <TextInput
                        value={this.props.quantidadeBebida}
                        onChangeText={text => this.props.modificaQuantidadeBebida(text) }
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
                            onPress={() => this._adicionaBebida()}
                            title="Adicionar"
                            color="#841584"
                            accessibilityLabel="Adicione uma bebida ao seu pedido."
                        />
                    </View>
                    <View style={{ flex: 0.5, marginTop: 7, marginRight: 5, marginLeft: 5 }}>
                        <Button
                            onPress={ () => Actions.finalizar()}
                            title="Finalizar"
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
    const categoriaBebidas = state.AppReducer.categoriaBebidas;
    const bebida = state.AppReducer.bebida;
    const quantidadeBebida = state.AppReducer.quantidadeBebida;
    
    const pedidoAtual = _.map(state.PedidoReducer, (val, uid) => {
        return uid;
    })[0];

    const bebidas = _.map(state.ListaBebidasPedidoReducer, (val, uid) => {
        return { ...val, uid }
    });
    
    return { bebidas, categoriaBebidas, bebida, quantidadeBebida, pedidoAtual };
}

export default connect(mapStateToProps, { modificaQuantidadeBebida, adicionaBebida, removeBebida, bebidasPedidoFetch })(BebidasPedido);