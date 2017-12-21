import React from 'react';

import { StyleSheet, View, Dimensions, ActivityIndicator } from 'react-native';

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    bootPage: {
        width: width,
        height: height,
        backgroundColor: '#fff',
        justifyContent: 'center'
    }
});

const Boot = () => (
    <View style={styles.bootPage}>
        <ActivityIndicator color="#ee735c" />
    </View>
);

export default Boot;
