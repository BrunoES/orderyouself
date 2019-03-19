import React, { Component } from 'react';
import { View, Text, Button, ListView, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { meusPedidosFetch } from '../../actions/AppActions';
import MyListItem from '../MyListItem';

import { Actions } from 'react-native-router-flux';

class MeusPedidos extends Component {
    
    componentWillMount() {
        this.buildDataSourceRefeicoes(this.props.meusPedidos);
    }

    componentWillReceiveProps(nextProps) {
        this.buildDataSourceRefeicoes(nextProps.meusPedidos);
    }

    buildDataSourceRefeicoes(data) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSourcePedidos = ds.cloneWithRows(data);
    }

    _renderRowPedido(item) {
        console.log(item);
        return (
            <View>
                <TouchableHighlight>
                    <MyListItem desc={item.mesa} quantidade={0} />
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View style={{ flex: 1 }}>
                <View style={{ flex: 0.3 }}>
                    <Text style={{ fontSize: 18, marginTop: 2, marginLeft: 12 }}>Pedidos</Text>
                    <ListView 
                        enableEmptySections
                        dataSource={this.dataSourcePedidos}
                        renderRow={this._renderRowPedido}
                    />   
                </View>
                <View style={{ flex: 0.1, marginTop: 1, flexDirection: 'row' }}>
                    <View style={{ flex: 0.5, marginTop: 7, marginRight: 5, marginLeft: 5 }}>
                        <Button
                            onPress={() => Actions.pratoPrincipal()}
                            title="Voltar"
                            color="#841584"
                            accessibilityLabel="Voltar"
                        />
                    </View>
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => {
    const localId = state.initQRCodeReducer.localId;

    const meusPedidos = _.map(state.MeusPedidosReducer.pedidos, (val, uid) => {
        return { ...val, uid }
    });

    return { localId, meusPedidos };
}

export default connect(mapStateToProps, { meusPedidosFetch })(MeusPedidos);