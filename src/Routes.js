import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Menu from './components/Menu';
import PratoPrincipal from './components/pratoPrincipal/PratoPrincipal';
import BebidasPedido from './components/bebidas/BebidasPedido';
import AcompanhamentosPedido from './components/acompanhamentos/AcompanhamentosPedido';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54'}} titleStyle={{ color: '#fff' }} >
        <Scene key="root">
            <Scene key='bebidaspedido' component={BebidasPedido} title="Bebidas Pedido" />
            <Scene key='pratoprincipal' component={PratoPrincipal} title="Prato Principal" />
            <Scene key='acompanhamentospedido' component={AcompanhamentosPedido} title="Acompanhamentos" initial />
            <Scene key='menu' component={Menu} title="Menu" />
        </Scene>
    </Router>
);
