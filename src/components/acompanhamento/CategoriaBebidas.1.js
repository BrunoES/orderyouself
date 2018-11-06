import React, { Component } from 'react';
import { View, Text, Picker } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { categoriasBebidasFetch, modificaCategoriaBebidas } from '../../actions/AppActions'

class CategoriaBebidas extends Component {
    
    componentWillMount() {
       this.props.categoriasBebidasFetch();
    }

    _renderItems(categoriasBebidas) {
        const pickerItems = _.map(categoriasBebidas, (val, uid) => {
            let id = _.values(val)[1];
            let desc = _.values(val)[0];
            return <Picker.Item key={id} value={id} label={desc} />;
        });
        return pickerItems;
    }

    render() {
        return (
            <View>
                <Text style={{ fontSize: 20, marginTop: 20, marginLeft: 12 }}>Categorias</Text>
                <Picker
                    selectedValue={this.props.categoriaBebidas.id}
                    style={{ height: 50, marginLeft: 12 }}
                    onValueChange={(value) => this.props.modificaCategoriaBebidas(value)}>
                    <Picker.Item label="Selecione uma categoria" value="0" />
                    {this._renderItems(this.props.categoriasBebidas)}
                </Picker>
            </View>
        );
    }
}

mapStateToProps = state => {
    const categoriasBebidas = _.map(state.ListaCategoriasBebidasReducer, (val, uid) => {
        let desc = val.desc;
        return { desc, uid };
    });
    const categoriaBebidas = state.AppReducer.categoriaBebidas;
    return { categoriasBebidas, categoriaBebidas };
}

export default connect(mapStateToProps, { categoriasBebidasFetch, modificaCategoriaBebidas })(CategoriaBebidas);