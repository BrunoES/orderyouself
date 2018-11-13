import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MyListItem extends Component {
    render() {
        const textColor = "#fff";
        return (
            <View style={{ flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                padding: 10,
                marginLeft: 15,
                marginRight: 15,
                marginTop: 5,
                marginBottom: 5,
                borderColor: '#2a4944',
                borderWidth: 1,
                backgroundColor: '#f46e41',
                borderRadius: 8 }}
            >
                <Text style={{ color: textColor, fontSize: 18, marginLeft: 20, marginRight: 20 }}>
                    {this.props.desc}
                </Text>
                <Text style={{ color: textColor, fontSize: 18 }}>
                    {this.props.quantidade}
                </Text>
            </View>
        );
    }
}