import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Menu from './components/Menu';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';
import InitQRCode from './components/initQRCode';

import PratoPrincipal from './components/pratoPrincipal/PratoPrincipal';
import BebidasPedido from './components/bebidas/BebidasPedido';
import AcompanhamentosPedido from './components/acompanhamentos/AcompanhamentosPedido';
import Pedido from './components/Pedido/Pedido';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#f46e41'}} titleStyle={{ color: '#ffffff' }} >
        <Scene key="root">
            <Scene key='formLogin' component={FormLogin} title="Login" />
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" />
            <Scene key='iniciar' component={InitQRCode} title="Iniciar" initial />
            <Scene key='pratoPrincipal' component={PratoPrincipal} title="Prato Principal" />
            <Scene key='bebidasPedido' component={BebidasPedido} title="Bebidas Pedido"  />
            <Scene key='acompanhamentosPedido' component={AcompanhamentosPedido} title="Acompanhamentos" />
            <Scene key='finalizar' component={Pedido} title="Finalizar Pedido" />
            <Scene key='menu' component={Menu} title="Menu" />
        </Scene>
    </Router>
);
