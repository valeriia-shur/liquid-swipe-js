import React, { useEffect } from "react"
import { StyleSheet } from "react-native"
import Animated, {
    runOnJS,
    useAnimatedGestureHandler,
    useAnimatedStyle,
    useSharedValue,
    withSpring,
} from "react-native-reanimated"
import { PanGestureHandler } from "react-native-gesture-handler"
import { snapPoint, useVector } from "react-native-redash"

import Wave, { HEIGHT, MARGIN_WIDTH, Side, WIDTH } from "./Wave"
import Button from "./Button"

const PREV = WIDTH
const NEXT = 0
const LEFT_SNAP_POINTS = [MARGIN_WIDTH, PREV]
const RIGHT_SNAP_POINTS = [NEXT, WIDTH - MARGIN_WIDTH]

const Slider = ({ index, children: current, prev, next, setIndex }) => {
    const hasPrev = !!prev
    const hasNext = !!next
    const zIndex = useSharedValue(0)
    const left = useVector(0, HEIGHT / 2)
    const right = useVector(0, HEIGHT / 2)
    const activeSide = useSharedValue(Side.none)
    const isTransitioningLeft = useSharedValue(false)
    const isTransitioningRight = useSharedValue(false)
    const onGestureEvent = useAnimatedGestureHandler({
        onStart: ({ x }) => {
            if (x <= MARGIN_WIDTH && hasPrev) {
                activeSide.value = Side.left
                zIndex.value = 100
            } else if (x >= WIDTH - MARGIN_WIDTH && hasNext) {
                activeSide.value = Side.right
            } else {
                activeSide.value = Side.none
            }
        },
        onActive: ({ x, y }) => {
            if (activeSide.value === Side.left) {
                left.x.value = Math.max(x, MARGIN_WIDTH)
                left.y.value = y
            } else if (activeSide.value === Side.right) {
                right.x.value = Math.max(WIDTH - x, MARGIN_WIDTH)
                right.y.value = y
            }
        },
        onEnd: ({ velocityX, velocityY, x }) => {
            if (activeSide.value === Side.left) {
                const dest = snapPoint(x, velocityX, LEFT_SNAP_POINTS)
                isTransitioningLeft.value = dest === PREV
                left.x.value = withSpring(
                    dest,
                    {
                        velocity: velocityX,
                        overshootClamping: isTransitioningLeft.value
                            ? true
                            : false,
                        restSpeedThreshold: isTransitioningLeft.value
                            ? 100
                            : 0.01,
                        restDisplacementThreshold: isTransitioningLeft.value
                            ? 100
                            : 0.01,
                    },
                    () => {
                        if (isTransitioningLeft.value) {
                            runOnJS(setIndex)(index - 1)
                        } else {
                            zIndex.value = 0
                            activeSide.value = Side.none
                        }
                    },
                )
                left.y.value = withSpring(HEIGHT / 2, { velocity: velocityY })
            } else if (activeSide.value === Side.right) {
                const dest = snapPoint(x, velocityX, RIGHT_SNAP_POINTS)
                isTransitioningRight.value = dest === NEXT
                right.x.value = withSpring(
                    WIDTH - dest,
                    {
                        velocity: velocityX,
                        overshootClamping: isTransitioningRight.value
                            ? true
                            : false,
                        restSpeedThreshold: isTransitioningRight.value
                            ? 100
                            : 0.01,
                        restDisplacementThreshold: isTransitioningRight.value
                            ? 100
                            : 0.01,
                    },
                    () => {
                        if (isTransitioningRight.value) {
                            runOnJS(setIndex)(index + 1)
                        } else {
                            activeSide.value = Side.none
                        }
                    },
                )
                right.y.value = withSpring(HEIGHT / 2, { velocity: velocityY })
            }
        },
    })

    const leftStyle = useAnimatedStyle(() => ({
        zIndex: zIndex.value,
    }))

    useEffect(() => {
        left.x.value = withSpring(MARGIN_WIDTH)
        right.x.value = withSpring(MARGIN_WIDTH)
    }, [index, left, right])

    return (
        <PanGestureHandler onGestureEvent={onGestureEvent}>
            <Animated.View style={StyleSheet.absoluteFill}>
                {current}
                {prev && (
                    <Animated.View style={[StyleSheet.absoluteFill, leftStyle]}>
                        <Wave
                            position={left}
                            side={Side.left}
                            isTransitioning={isTransitioningLeft}
                        >
                            {prev}
                        </Wave>
                        <Button
                            position={left}
                            side={Side.left}
                            activeSide={activeSide}
                        />
                    </Animated.View>
                )}
                {next && (
                    <Animated.View style={StyleSheet.absoluteFill}>
                        <Wave
                            position={right}
                            side={Side.right}
                            isTransitioning={isTransitioningRight}
                        >
                            {next}
                        </Wave>
                        <Button
                            position={right}
                            side={Side.right}
                            activeSide={activeSide}
                        />
                    </Animated.View>
                )}
            </Animated.View>
        </PanGestureHandler>
    )
}

export default Slider
