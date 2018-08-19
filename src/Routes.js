import React from 'react';
import { Router, Scene } from 'react-native-router-flux';

import Pedido from './components/Pedido';
import Menu from './components/Menu';

export default props => (
    <Router navigationBarStyle={{ backgroundColor: '#115E54'}} titleStyle={{ color: '#fff' }} >
        <Scene key="root">
            <Scene key='pedido' component={Pedido} title="Pedido" initial />
            <Scene key='menu' component={Menu} title="Menu" />
        </Scene>
    </Router>
);
