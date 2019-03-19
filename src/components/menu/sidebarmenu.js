import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {Drawer, Container } from 'native-base';
class SideBar extends Component {
    render(){
        return (
            <View style={[ styles.container, { backgroundColor: '#fff' } ]}>
                <Text>
                    <Icon name="rocket" size={30} color="#900" />
                    Conteúdo side bar
                </Text>
            </View>
        );
    } 
};

export default class SideBarMenu extends Component {
  closeDrawer = () => {
      this.drawer._root.close()
  };
  openDrawer = () => {
      this.drawer._root.open()
  };    
  render() {
    return (
        <Drawer
            ref={(ref) => { this.drawer = ref; }}
            content={<SideBar navigator={this.navigator} />}
            onClose={() => this.closeDrawer()}>
            <Container style={{flexDirection: 'row'}}>
                    <Icon onPress={() => this.openDrawer()} name="bars" size={30} color="#fff" />
            </Container>
        </Drawer>      
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF'
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  }
});