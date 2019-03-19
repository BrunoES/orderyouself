import React, { Component } from 'react';
import { View, Text,  Button, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

import {  getCurrentOrder, meusPedidosFetch, setUidLocal, setNumMesa } from '../actions/AppActions';

import QRCodeScanner from 'react-native-qrcode-scanner';

import _ from 'lodash';

import SideBarMenu from './menu/sidebarmenu';

class InitQRCode extends Component {

    /*
    onSuccess(e) {
        alert("Success");
        console.log(e);
        Linking
          .openURL(e.data)
          .catch(err => console.error('An error occured', err));
    }
    */
/*
    onSuccess(e) {
        //alert("Success");
        let data = e.data;
        //data = "NMajCK3oEvhj2XhyCzbf2bxj73H3|1";

        Alert.alert(
            'Alert Title',
            e.data,
            [
              {text: 'Ask me later', onPress: () => console.log('Ask me later pressed')},
            ],
            { cancelable: false }
        );

        // Codigo Local | Mesa

        const localId = data.split("|")[0];
        const numMesa = data.split("|")[1];

        this.props.setUidLocal(localId);
        this.props.setNumMesa(numMesa);
        Actions.pratoPrincipal();
    }*/
    
    onSuccess(e) {
        //alert("Success");
        let data = e.data;
        data = "NMajCK3oEvhj2XhyCzbf2bxj73H3|1";

        const localId = data.split("|")[0];
        const numMesa = data.split("|")[1];

        this.props.meusPedidosFetch(localId);
        
        this.props.setUidLocal(localId);
        this.props.setNumMesa(numMesa);
        
        //Actions.pratoPrincipal();

        Actions.meusPedidos();
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
                    onPress={ () => this.onSuccess({})}
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

export default connect(mapStateToProps, { getCurrentOrder, meusPedidosFetch, setUidLocal, setNumMesa })(InitQRCode);