import React, { Component } from 'react';
import { View, Text, Button, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { refeicoesFetch, acompanhamentosPedidoFetch, bebidasPedidoFetch, cancelaPedido, confirmaPedido, criaNovoPedido, buscaPedidoAtual } from '../../actions/AppActions';
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
                    <MyListItem desc={item.desc} quantidade={item.quantidadeBebida} />
                </TouchableHighlight>
            </View>
        );
    }

    _renderRowAcompanhamentos(item) {
        return (
            <View>
                <TouchableHighlight>
                    <MyListItem desc={item.desc} quantidade={item.quantidadeBebida} />
                </TouchableHighlight>
            </View>
        );
    }

    _renderRowBebidas(item) {
        return (
            <View>
                <TouchableHighlight>
                    <MyListItem desc={item.desc} quantidade={item.quantidadeBebida} />
                </TouchableHighlight>
            </View>
        );
    }

    _cancelaPedido() {
        this.props.cancelaPedido();
        this.props.buscaPedidoAtual();
        //this.props.criaNovoPedido();
    }

    _finalizaPedido() {
        this.props.confirmaPedido();
    }


    render() {
        return (
            <View>
                <View>
                    <Text style={{ fontSize: 35, marginTop: 20, marginLeft: 12 }}>Pedido</Text>
                </View>
                <View>
                    <Text style={{ fontSize: 18, marginTop: 20, marginLeft: 12 }}>Refeições</Text>
                </View>
                <View>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSourceRefeicoes}
                        renderRow={this._renderRowRefeicoes}
                    />   
                </View>
                <View>
                    <Text style={{ fontSize: 18, marginTop: 20, marginLeft: 12 }}>Acompanhamentos</Text>
                </View>
                <View>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSourceAcompanhamentos}
                        renderRow={this._renderRowAcompanhamentos}
                    />   
                </View>
                <View>
                    <Text style={{ fontSize: 18, marginTop: 20, marginLeft: 12 }}>Bebidas</Text>
                </View>
                <View>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSourceBebidas}
                        renderRow={this._renderRowBebidas}
                    />   
                </View>
                <View style={{ marginTop: 20 }}>
                    <Button
                        onPress={() => this._cancelaPedido()}
                        title="Cancelar"
                        color="#841584"
                        accessibilityLabel="Cancelar Pedido."
                    />
                    <Button
                        onPress={() => this._finalizaPedido()}
                        title="Confirmar"
                        color="#841584"
                        accessibilityLabel="Confirmar Pedido."
                    />
                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    const refeicoes = _.map(state.ListaRefeicoesReducer, (val, uid) => {
        return { ...val, uid }
    });

    const acompanhamentos = _.map(state.ListaAcompanhamentosPedidoReducer, (val, uid) => {
        return { ...val, uid }
    });

    const bebidas = _.map(state.ListaBebidasPedidoReducer, (val, uid) => {
        return { ...val, uid }
    });

    return { refeicoes, acompanhamentos, bebidas };
}

export default connect(mapStateToProps, { refeicoesFetch, acompanhamentosPedidoFetch, bebidasPedidoFetch, cancelaPedido, confirmaPedido, criaNovoPedido, buscaPedidoAtual })(Pedido);