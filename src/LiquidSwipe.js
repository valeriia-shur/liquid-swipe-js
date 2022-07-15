import React, { useState } from "react"
import Slider from "./Slider"
import Slide from "./Slide"

const slides = [
    {
        title: "Sun",
        picture: require("../assets/Sun.jpg"),
    },
    {
        title: "Mercury",
        picture: require("../assets/Mercury.jpg"),
    },
    {
        title: "Venus",
        picture: require("../assets/Venus.jpg"),
    },
    {
        title: "Earth",
        picture: require("../assets/Earth.jpg"),
    },
    {
        title: "Moon",
        picture: require("../assets/Moon.jpg"),
    },
    {
        title: "Mars",
        picture: require("../assets/Mars.jpg"),
    },
    {
        title: "Jupiter",
        picture: require("../assets/Jupiter.jpg"),
    },
    {
        title: "Saturn",
        picture: require("../assets/Saturn.jpg"),
    },
    {
        title: "Uranus",
        picture: require("../assets/Uranus.jpg"),
    },
    {
        title: "Neptune",
        picture: require("../assets/Neptune.jpg"),
    },
]

export const assets = slides.map(({ picture }) => picture)

const LiquidSwipe = () => {
    const [index, setIndex] = useState(0)
    const prev = slides[index - 1]
    const next = slides[index + 1]
    return (
        <Slider
            key={index}
            index={index}
            setIndex={setIndex}
            prev={prev && <Slide slide={prev} />}
            next={next && <Slide slide={next} />}
        >
            <Slide slide={slides[index] ? slides[index] : false} />
        </Slider>
    )
}

export default LiquidSwipe
