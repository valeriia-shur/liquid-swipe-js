import React from "react"
import { View, Text, Dimensions, StyleSheet, Image, ImageBackground } from "react-native"
import Svg, { RadialGradient, Defs, Rect, Stop } from "react-native-svg"

export const { width, height } = Dimensions.get("screen")
const SIZE = width - 75

const Slide = ({ slide: { picture, color, title, description } }) => {
    const lighterColor = color
    return (
        <>
            <Svg style={StyleSheet.absoluteFill}>
                <Defs>
                    <RadialGradient id="gradient" cx="50%" cy="35%">
                        <Stop offset="0%" stopColor={lighterColor} />
                        <Stop offset="100%" stopColor={color} />
                    </RadialGradient>
                </Defs>
                <Rect
                    x={0}
                    y={0}
                    width={width}
                    height={height}
                    fill="url(#gradient)"
                />
            </Svg>
            <View style={styles.container}>
                {/* <View style={styles.title}>
                    <Text>{title}</Text>
                </View> */}
                <ImageBackground source={picture} style={styles.image}>
                    <View style={styles.title}>
                        <Text>{title}</Text>
                    </View> 
                </ImageBackground>
            </View>
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        ...StyleSheet.absoluteFillObject,
        flex: 1,
        
    },
    image: {
        flex: 1,
        resizeMode: "cover",
    },
    title: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'flex-end', 
        alignItems: 'center',
        fontSize: 48,
        color: "white",
        marginBottom: "35%",
    },
})

export default Slide
