import clsx from "clsx"
import style from "./style.module.css"

const Nav = () => {
  return (
    <nav class={clsx(style.nav, 'container')}>
      <div>Sazaana</div>
    </nav>
  )
}

export default Nav
