import clsx from "clsx"
import { Motion } from "@motionone/solid";
import style from "./style.module.css"
import { spring } from "motion";

const transition = {
  delay: 2.5,
  easing: spring({ stiffness: 350, damping: 28 })
};

const Hero = () => {

  return (
    <section class={style.hero}>
      <h1>Personlised Playlist <Motion.div animate={{ y: [-33, 0], opacity: [0, 1] }}
        transition={{ duration: 1.618, easing: spring({ stiffness: 200, damping: 12, velocity: 100 }) }}
      >Inspired</Motion.div> by Your Favorite Artists...</h1>
      <h4>Type in an artist, and we'll curate the perfect playlist that echoes their style, just for you.</h4>
    </section>
  )
}

export default Hero
