import React from 'react';
import { StyleSheet, View, ImageBackground, Dimensions } from 'react-native';
import { Button } from 'react-native-elements';
import Swiper from 'react-native-swiper';
import style from '../../common/style';
const { width, height } = Dimensions.get('window');

export default class Slider extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const { banners, enteredSlide, sliderLoop } = this.props;

        const bannersSlider = banners.map((item, i) => (
            <ImageBackground key={i} style={styles.image} source={item}>
                {i + 1 === banners.length && (
                    <Button
                        {...style.btn('马上体验', enteredSlide, {
                            position: 'absolute',
                            bottom: 60
                        })}
                    />
                )}
            </ImageBackground>
        ));

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
