import React, {JSX, useEffect} from 'react';
import {Gesture, GestureDetector} from "react-native-gesture-handler";
import Animated, {
    runOnJS,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
    withTiming
} from "react-native-reanimated";
import {Dimensions, Pressable, StyleSheet, View} from "react-native";

interface SwipeableModalProps {
    top?: number
    visible: boolean
    onClose: () => void
    children: JSX.Element
}

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

function SwipeableModal({ top = 200, children, visible, onClose }: SwipeableModalProps) {
    const translateY = useSharedValue(SCREEN_HEIGHT);

    const pan = Gesture.Pan()
        .activeOffsetY(55)
        .onUpdate((e) => {
            if (e.translationY > 0) {
                translateY.value = e.translationY;
            }
        })
        .onEnd((e) => {
            if (e.translationY > 150 || e.velocityY > 500) {
                translateY.value = withTiming(SCREEN_HEIGHT, { duration: 200 }, () => {
                    runOnJS(onClose)();
                });
            } else {
                translateY.value = withSpring(0);
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateY: translateY.value }],
    }));

    useEffect(() => {
        if (visible) {
            translateY.value = withSpring(0);
        }
    }, [visible]);

    if (visible) {
        return (
            <View style={StyleSheet.absoluteFill}>
                <Pressable style={styles.backdrop} onPress={onClose} />
                <GestureDetector gesture={pan}>
                    <Animated.View style={[{...styles.panel, top }, animatedStyle]}>
                        <View style={styles.handle} />
                        {children}
                    </Animated.View>
                </GestureDetector>
            </View>
        )
    }

    return null
}

export default SwipeableModal;


const styles = StyleSheet.create({
    panel: {
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: '#fff',
        borderTopLeftRadius: 24,
        borderTopRightRadius: 24,
        boxShadow: '0px 5px 20px rgba(0, 0, 0, 0.4)',
    },
    handle: {
        width: 40,
        height: 5,
        borderRadius: 3,
        backgroundColor: '#ccc',
        alignSelf: 'center',
        marginTop: 12,
    },
    backdrop: {
        ...StyleSheet.absoluteFillObject,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
})