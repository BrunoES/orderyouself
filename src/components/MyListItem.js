import React, { Component } from 'react';
import { View, Text } from 'react-native';

export default class MyListItem extends Component {
    render() {
        const textColor = "red";
        return (
            <View>
                <Text style={{ color: textColor }}>
                    {this.props.desc}
                    {this.props.quantidade}
                </Text>
            </View>
        );
    }
}