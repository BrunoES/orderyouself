import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Menu from './components/Menu';

import FormLogin from './components/FormLogin';
import FormCadastro from './components/FormCadastro';

import PratoPrincipal from './components/pratoPrincipal/PratoPrincipal';
import BebidasPedido from './components/bebidas/BebidasPedido';
import AcompanhamentosPedido from './components/acompanhamentos/AcompanhamentosPedido';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54'}} titleStyle={{ color: '#fff' }} >
        <Scene key="root">
            <Scene key='formLogin' component={FormLogin} title="Login" initial />
            <Scene key='formCadastro' component={FormCadastro} title="Cadastro" />
            <Scene key='pratoPrincipal' component={PratoPrincipal} title="Prato Principal" />
            <Scene key='bebidasPedido' component={BebidasPedido} title="Bebidas Pedido"  />
            <Scene key='acompanhamentosPedido' component={AcompanhamentosPedido} title="Acompanhamentos" />
            <Scene key='menu' component={Menu} title="Menu" />
        </Scene>
    </Router>
);
