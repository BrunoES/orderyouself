import React, { Component } from 'react';
import { View, Text, Button, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { refeicoesFetch, acompanhamentosPedidoFetch, bebidasPedidoFetch, cancelaPedido, confirmaPedido, criaNovoPedido, buscaPedidoAtual, deletaPedidoAtual } from '../../actions/AppActions';
import MyListItem from './../MyListItem';

class Pedido extends Component {
    
    componentWillMount() {
       this.props.refeicoesFetch();
       this.props.acompanhamentosPedidoFetch();
       this.props.bebidasPedidoFetch();
       this.buildDataSourceRefeicoes(this.props.refeicoes);
       this.buildDataSourceAcompanhamentos(this.props.acompanhamentos);
       this.buildDataSourceBebidas(this.props.bebidas);
    }

    buildDataSourceRefeicoes(data) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSourceRefeicoes = ds.cloneWithRows(data);
    }

    buildDataSourceAcompanhamentos(data) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSourceAcompanhamentos = ds.cloneWithRows(data);
    }

    buildDataSourceBebidas(data) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSourceBebidas = ds.cloneWithRows(data);
    }

    _renderRowRefeicoes(item) {
        return (
            <View>
                <TouchableHighlight>
                    <MyListItem desc={item.desc} quantidade={item.quantidade} />
                </TouchableHighlight>
            </View>
        );
    }

    _renderRowAcompanhamentos(item) {
        return (
            <View>
                <TouchableHighlight>
                    <MyListItem desc={item.desc} quantidade={item.quantidade} />
                </TouchableHighlight>
            </View>
        );
    }

    _renderRowBebidas(item) {
        return (
            <View>
                <TouchableHighlight>
                    <MyListItem desc={item.desc} quantidade={item.quantidade} />
                </TouchableHighlight>
            </View>
        );
    }

    _cancelaPedido() {
        this.props.cancelaPedido(this.props.pedidoAtual);
        this.props.deletaPedidoAtual(this.props.pedidoAtual);
        this.props.criaNovoPedido();
    }

    _finalizaPedido() {
        this.props.confirmaPedido(this.props.pedidoAtual);
        this.props.deletaPedidoAtual(this.props.pedidoAtual);
        this.props.criaNovoPedido();
    }


    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.3 }}>
                    <Text style={{ fontSize: 18, marginTop: 2, marginLeft: 12 }}>Refeições</Text>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSourceRefeicoes}
                        renderRow={this._renderRowRefeicoes}
                    />   
                </View>
                <View style={{ flex: 0.3 }}>
                    <Text style={{ fontSize: 18, marginTop: 2, marginLeft: 12 }}>Acompanhamentos</Text>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSourceAcompanhamentos}
                        renderRow={this._renderRowAcompanhamentos}
                    />   
                </View>
                <View style={{ flex: 0.3 }}>
                    <Text style={{ fontSize: 18, marginTop: 2, marginLeft: 12 }}>Bebidas</Text>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSourceBebidas}
                        renderRow={this._renderRowBebidas}
                    />   
                </View>
                <View style={{ flex: 0.1, marginTop: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, marginTop: 7, marginRight: 5, marginLeft: 5 }}>
                        <Button
                            onPress={() => this._cancelaPedido()}
                            title="Cancelar"
                            color="#841584"
                            accessibilityLabel="Cancelar Pedido."
                        />
                    </View>
                    <View style={{ flex: 0.5, marginTop: 7, marginRight: 5, marginLeft: 5 }}>
                        <Button
                            onPress={() => this._finalizaPedido()}
                            title="Confirmar"
                            color="#841584"
                            accessibilityLabel="Confirmar Pedido."
                        />
                    </View>
                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    const refeicoes = _.map(state.ListaRefeicoesReducer, (val, uid) => {
        return { ...val, uid }
    });

    const pedidoAtual = _.map(state.PedidoReducer, (val, uid) => {
        return uid;
    })[0];

    const acompanhamentos = _.map(state.ListaAcompanhamentosPedidoReducer, (val, uid) => {
        return { ...val, uid }
    });

    const bebidas = _.map(state.ListaBebidasPedidoReducer, (val, uid) => {
        return { ...val, uid }
    });

    return { refeicoes, acompanhamentos, bebidas, pedidoAtual };
}

export default connect(mapStateToProps, { refeicoesFetch, acompanhamentosPedidoFetch, bebidasPedidoFetch, cancelaPedido, confirmaPedido, criaNovoPedido, buscaPedidoAtual, deletaPedidoAtual })(Pedido);