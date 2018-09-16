import React, {Component} from 'react';
import {Animated, Dimensions, LayoutAnimation, PanResponder, UIManager, View} from 'react-native';

/**
 * Created by Fatih Taşdemir on 15.09.2018
 */

const SCREEN_WIDTH = Dimensions.get('window').width;
const SWIPE_THRESHOLD = SCREEN_WIDTH * 0.25;

export default class Deck extends Component {

    static defaultProps = {
        onSwipeRight: () => {
        },
        onSwipeLeft: () => {
        },
        renderNoMoreCards: () => {
        }
    };

    constructor(props) {
        super(props);

        const position = new Animated.ValueXY();

        const panResponder = PanResponder.create({
            onStartShouldSetPanResponder: () => true,
            onPanResponderMove: (event, gesture) => {
                position.setValue({x: gesture.dx, y: gesture.dy})
            },
            onPanResponderRelease: (event, gesture) => {
                if (gesture.dx > SWIPE_THRESHOLD) {
                    this.forceSwipe('right');
                } else if (gesture.dx < -SWIPE_THRESHOLD) {
                    this.forceSwipe('left');
                } else {
                    this.resetPosition()
                }
            }
        });

        this.state = {panResponder, position, index: 0}
    }

    componentWillUpdate() {
        UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
        LayoutAnimation.spring()
    }

    componentWillReceiveProps(nextProps) {
        /*if (nextProps.data !== this.props.data) {
            this.setState({index: 0})
        }*/
        this.setState({index: 0})
    }

    render() {
        return (
            <View>
                {this.renderCards()}
            </View>
        );
    }

    renderCards() {
        if (this.state.index >= this.props.data.length) {
            return this.props.renderNoMoreCards()
        }

        return this.props.data.map((item, index) => {
            if (index < this.state.index) {
                return null;
            } else if (index === this.state.index) {
                return (
                    <Animated.View key={item.id}
                                   style={[this.getCardStyle(), styles.cardStyle]} {...this.state.panResponder.panHandlers}>
                        {this.props.renderCard(item)}
                    </Animated.View>
                );
            }
            return (
                <Animated.View key={item.id} style={[styles.cardStyle, {top: 10 * (index - this.state.index)}]}>
                    {this.props.renderCard(item)}
                </Animated.View>
            );
        }).reverse()
    }

    getCardStyle() {
        const {position} = this.state;
        const rotate = position.x.interpolate({
            inputRange: [-SCREEN_WIDTH, 0, SCREEN_WIDTH],
            outputRange: ['-120deg', '0deg', '120deg']
        });

        return {
            ...this.state.position.getLayout(),
            transform: [{rotate}]
        }
    }

    resetPosition() {
        Animated.spring(this.state.position, {
            toValue: {x: 0, y: 0}
        }).start()
    }

    forceSwipe(direction) {
        const x = direction === 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH;
        Animated.timing(this.state.position, {
            toValue: {x, y: 0},
            duration: 250
        }).start(() => {
            this.onSwipeCompleted(direction)
        })
    }

    onSwipeCompleted(direction) {
        const {onSwipeLeft, onSwipeRight, data} = this.props;
        const item = data[this.state.index];
        direction === 'right' ? onSwipeRight(item) : onSwipeLeft(item);

        this.state.position.setValue({x: 0, y: 0});
        this.setState({index: this.state.index + 1})
    }

}

const styles = {
    cardStyle: {
        position: 'absolute',
        width: SCREEN_WIDTH,
    }
};