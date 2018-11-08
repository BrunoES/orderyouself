import React, { Component } from 'react';
import { View, Text,  Button, } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {  getCurrentOrder } from '../actions/AppActions';

import _ from 'lodash';

class InitQRCode extends Component {

    constructor(props){
        super(props);
    }


    componentWillMount(){
        this.props.getCurrentOrder();
    }

    render() {
        return (
            <View>
                <Button
                        onPress={ () => Actions.pratoPrincipal()}
                        title="Iniciar"
                        color="#841584"
                        accessibilityLabel="Iniciar Processo de Pedido."
                    />
            </View>
        );
    }
}

mapStateToProps = state => {
    const pedidoAtual = _.map(state.PedidoReducer, (val, uid) => {
        return uid;
    })[0];

    return { pedidoAtual };
}

export default connect(mapStateToProps, { getCurrentOrder })(InitQRCode);