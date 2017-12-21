import React from 'react';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';

import Swiper from 'react-native-swiper';
// const Swiper = require('react-native-swiper');
const { width, height } = Dimensions.get('window');

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { banners, enteredSlide, sliderLoop } = this.props;
        const bannersSlider = banners.map((item, i) => {
            let innerButton = null;

            if (i + 1 === banners.length) {
                innerButton = (
                    <Button
                        raised
                        buttonStyle={{
                            borderRadius: 4,
                            backgroundColor: '#aaaaaa'
                        }}
                        containerViewStyle={{
                            position: 'absolute',
                            bottom: 60,
                            borderRadius: 4,
                            width: width - 40,
                            marginLeft: 20,
                            marginRight: 20
                        }}
                        fontSize={14}
                        onPress={enteredSlide}
                        title={'马上体验'}
                    />
                );
            }

            return (
                <ImageBackground key={i} style={styles.image} source={item}>
                    {innerButton}
                </ImageBackground>
            );
        });

        return (
            <Swiper
                dot={<View style={styles.dot} />}
                activeDot={<View style={styles.activeDot} />}
                paginationStyle={styles.pagination}
                loop={sliderLoop}
            >
                {bannersSlider}
            </Swiper>
        );
    }
}

const styles = StyleSheet.create({
    image: {
        flex: 1,
        width: width,
        height: height
    },
    dot: {
        width: 14,
        height: 14,
        backgroundColor: 'transparent',
        borderColor: '#ff6600',
        borderRadius: 7,
        borderWidth: 1,
        marginLeft: 12,
        marginRight: 12
    },

    activeDot: {
        width: 14,
        height: 14,
        borderWidth: 1,
        marginLeft: 12,
        marginRight: 12,
        borderRadius: 7,
        borderColor: '#eeeeee',
        backgroundColor: '#eeeeee'
    },

    pagination: {
        bottom: 30
    }
});
