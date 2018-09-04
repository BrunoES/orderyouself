import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import PratoPrincipal from './components/PratoPrincipal';
import BebidasPedido from './components/BebidasPedido';
import Menu from './components/Menu';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54'}} titleStyle={{ color: '#fff' }} >
        <Scene key="root">
            <Scene key='bebidaspedido' component={BebidasPedido} title="Bebidas Pedido" />
            <Scene key='pratoprincipal' component={PratoPrincipal} title="Prato Principal" initial />
            <Scene key='menu' component={Menu} title="Menu" />
        </Scene>
    </Router>
);
