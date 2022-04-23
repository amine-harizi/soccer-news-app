import { Link } from "react-router-dom"
import logo from "../logoo.png";

const LogoLink = () => {
  return (
    <Link to='/' className="logo-container">
    <img src={logo} alt="logo" />
    <span>LIVE SOCCER</span>
  </Link >
    )
}

export default LogoLink