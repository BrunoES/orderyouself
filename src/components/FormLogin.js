import React, { Component } from 'react';
import { View, Text, TextInput, Button, TouchableHighlight, ActivityIndicator } from 'react-native';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';
import { modificaEmail, modificaSenha, autenticarUsuario } from '../actions/AutenticacaoActions';

class formLogin extends Component {

    _autenticarUsuario(){
        const { email, senha } = this.props;
        this.props.autenticarUsuario( {email, senha });
    }

    renderBtnAcessar() {
        if(this.props.loading_login){
            return (
                <ActivityIndicator size="large" />
            )
        }
        return (
            <Button
                title="Acessar"
                color='#115E54'
                onPress={() => this._autenticarUsuario()}
            />
        )
    }

    render() {
        return (
            <View style={{ flex: 1, padding: 10 }}>
                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 25, color: '#383838' }}>Order You Self</Text>
                </View>
                <View style={{ flex: 2}}>
                    <TextInput
                        value={this.props.email}
                        style={{ fontSize: 20, height: 45 }}
                        placeholder='E-mail'
                        placeholderTextColor='#383838'
                        onChangeText={texto => this.props.modificaEmail(texto) }
                    />
                    <TextInput
                        secureTextEntry
                        value={this.props.senha}
                        style={{ fontSize: 20, height: 45 }}
                        placeholder='Senha'
                        placeholderTextColor='#383838'
                        onChangeText={texto => this.props.modificaSenha(texto) }
                    />
                    <Text style={{color: '#ff0000', fontSize: 18}}>
                        {this.props.erroLogin}
                    </Text>
                    <TouchableHighlight onPress={() => Actions.formCadastro() }>
                        <Text style={{ fontSize: 20, color: '#383838' }}>Ainda não tem cadastro? Cadastre-se</Text>
                    </TouchableHighlight>
                </View>
                <View style={{ flex: 2}}>
                    {this.renderBtnAcessar()}
                </View>
            </View>
        );
    }
}

const mapStateToProps = state => (
    {
        email: state.AutenticacaoReducer.email,
        senha: state.AutenticacaoReducer.senha,
        erroLogin: state.AutenticacaoReducer.erroLogin,
        loading_login: state.AutenticacaoReducer.loading_login
    }
)

export default connect(mapStateToProps, { modificaEmail, modificaSenha, autenticarUsuario })(formLogin);