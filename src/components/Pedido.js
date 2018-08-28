import React, { Component } from 'react';
import { View, Text, ListView, Button, TouchableOpacity } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { adicionaRefeicao } from '../actions/AppActions'
import Categorias from './Categorias';
import Pratos from './Pratos';

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

class Pedido extends Component {

    _adicionaRefeicao() {
        this.props.adicionaRefeicao({
            key: '1',
            categoria: this.props.categoria.descricao,
            prato: this.props.prato.descricao,
            desc: this.props.prato.descricao,
            quantidade: 1
        });
    }

    renderRow(item) {
        return (
            <Text>{item.desc}</Text>
        );
    }

    render() {
        return (
            <View>
                <View>
                    <Categorias />
                    <Pratos />
                    <Button
                        onPress={() => this._adicionaRefeicao()}
                        title="Adicionar"
                        color="#841584"
                        accessibilityLabel="Adicione um prato ao seu pedido de refeição."
                    />
                </View>
                <View>
                    
                    <ListView 
                     dataSource={this.props.dataSource}
                     renderRow={(rowData) => <Text>{rowData.desc}</Text>}
                    />   

                </View>
            </View>
        );
    }
}

mapStateToProps = state => {
    const refeicoes = state.AppReducer.refeicoes;
    const categoria = state.AppReducer.categoria;
    const prato = state.AppReducer.prato;
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    const dataSource = ds.cloneWithRows(refeicoes);

    return { refeicoes, categoria, prato, dataSource };
}

export default connect(mapStateToProps, { adicionaRefeicao })(Pedido);