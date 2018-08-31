import React, { Component } from 'react';
import { View, Text, ListView, Button, TouchableOpacity, TouchableHighlight } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Actions } from 'react-native-router-flux';
import { adicionaRefeicao, removeRefeicao, refeicoesFetch } from '../actions/AppActions'
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

    constructor(props){
        super(props);
        this._renderRow = this._renderRow.bind(this);
    }

    componentWillMount() {
        this.props.refeicoesFetch();
        this.criaFonteDeDados(this.props.refeicoes);
    }

    componentWillReceiveProps(nextProps) {
        if(this.props.refeicoes.length != nextProps.refeicoes.length){
            this.props.refeicoesFetch();
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
            quantidade: 1
        });
    }

    _removeRefeicao(refeicaoId) {
        this.props.removeRefeicao(refeicaoId);
    }

    _renderRow(item) {
        return (
            <View>
                <TouchableHighlight onPress={ () => this._removeRefeicao(item.uid) }>
                    <Text>{item.desc}</Text>
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
                    <Button
                        onPress={() => this._adicionaRefeicao()}
                        title="Adicionar"
                        color="#841584"
                        accessibilityLabel="Adicione um prato ao seu pedido de refeição."
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
    
    const refeicoes = _.map(state.ListaRefeicoesReducer, (val, uid) => {
        return { ...val, uid }
    });
    
    return { refeicoes, categoria, prato };
}

export default connect(mapStateToProps, { adicionaRefeicao, removeRefeicao, refeicoesFetch })(Pedido);