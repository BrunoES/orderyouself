import React, { Component } from 'react';
import { View, Text, ListView, Button, TextInput, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { modificaQuantidadeBebida, adicionaBebida, removeBebida, bebidasPedidoFetch } from '../actions/AppActions'
import CategoriaBebidas from './CategoriaBebidas';
import Bebidas from './Bebidas';

class MyListItem extends Component {
    render() {
      const textColor = "red";
      return (
        <TouchableOpacity>
          <View>
            <Text style={{ color: textColor }}>
              {this.props.title}
            </Text>
          </View>
        </TouchableOpacity>
      );
    }
  }

class BebidasPedido extends Component {

    constructor(props){
        super(props);
        this._renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        this.props.bebidasPedidoFetch();
        this.criaFonteDeDados(this.props.bebidas);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.bebidas.length != nextProps.bebidas.length){
            this.props.bebidasPedidoFetch();
        }
        this.criaFonteDeDados(nextProps.bebidas);
    }

    criaFonteDeDados(bebidas) {
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
        this.dataSource = ds.cloneWithRows(bebidas);
    }

    _adicionaBebida() {
        this.props.adicionaBebida({
            key: '1',
            categoriaBebidasId: this.props.categoriaBebidas.id,
            categoriaBebidas: this.props.categoriaBebidas.descricao,
            bebidaId: this.props.bebida.id,
            bebida: this.props.bebida.descricao,
            desc: this.props.bebida.descricao,
            quantidade: this.props.quantidadeBebida
        });
    }

    _removeBebida(bebidaId) {
        this.props.removeBebida(bebidaId);
    }

    _renderRow(item) {
        return (
            <View>
                <TouchableHighlight onPress={ () => this._removeBebida(item.uid) }>
                    <Text>{item.desc}</Text>
                </TouchableHighlight>
            </View>
        );
    }

    render() {
        return (
            <View>
                <View>
                    <CategoriaBebidas />
                    <Bebidas />
                    <TextInput
                        value={this.props.quantidadeBebida}
                        onChangeText={text => this.props.modificaQuantidadeBebida(text) }
                        placeholder={"Quantidade"}
                    />
                    <Button
                        //onPress={() => this._adicionaBebida()}
                        onPress={ () => Actions.pratoprincipal() }
                        title="Adicionar"
                        color="#841584"
                        accessibilityLabel="Adicione uma bebida ao seu pedido."
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
    const categoriaBebidas = state.AppReducer.categoriaBebidas;
    const bebida = state.AppReducer.bebida;
    const quantidadeBebida = state.AppReducer.quantidadeBebida;
    
    const bebidas = _.map(state.ListaBebidasPedidoReducer, (val, uid) => {
        return { ...val, uid }
    });
    
    return { bebidas, categoriaBebidas, bebida, quantidadeBebida };
}

export default connect(mapStateToProps, { modificaQuantidadeBebida, adicionaBebida, removeBebida, bebidasPedidoFetch })(BebidasPedido);