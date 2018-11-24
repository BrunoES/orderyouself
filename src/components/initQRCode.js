import React, { Component } from 'react';
import { View, Text,  Button, StyleSheet, TouchableOpacity } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {  getCurrentOrder } from '../actions/AppActions';

import QRCodeScanner from 'react-native-qrcode-scanner';

import _ from 'lodash';

class InitQRCode extends Component {

    onSuccess(e) {
        alert("Success");
        console.log(e);
        /*
        Linking
          .openURL(e.data)
          .catch(err => console.error('An error occured', err));
        */
    }

    constructor(props){
        super(props);
    }


    componentWillMount(){
        this.props.getCurrentOrder();
    }

    render() {
        return (
            <View style={{ flex: 1, backgroundColor: "#ffffff" }}>
                <Button
                    onPress={ () => Actions.pratoPrincipal()}
                    title="Iniciar"
                    color="#841584"
                    accessibilityLabel="Iniciar Processo de Pedido"
                />
                <QRCodeScanner
                    onRead={this.onSuccess.bind(this)}
                    topContent={
                    <Text style={styles.centerText}>
                        Go to <Text style={styles.textBold}>wikipedia.org/wiki/QR_code</Text> on your computer and scan the QR code.
                    </Text>
                    }
                    bottomContent={
                    <TouchableOpacity style={styles.buttonTouchable}>
                        <Text style={styles.buttonText}>OK. Got it!</Text>
                    </TouchableOpacity>
                    }
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    centerText: {
      flex: 1,
      fontSize: 18,
      padding: 32,
      color: '#777',
    },
    textBold: {
      fontWeight: '500',
      color: '#000',
    },
    buttonText: {
      fontSize: 21,
      color: 'rgb(0,122,255)',
    },
    buttonTouchable: {
      padding: 16,
    },
  });

mapStateToProps = state => {
    const pedidoAtual = _.map(state.PedidoReducer, (val, uid) => {
        return uid;
    })[0];

    return { pedidoAtual };
}

export default connect(mapStateToProps, { getCurrentOrder })(InitQRCode);