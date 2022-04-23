import "./LeagueLoading.css";
import logo from "../../../logoo.png";
const LeagueLoading = () => {
  return (
    <div className="loading">
        <img className="loading-ring" src={logo} alt="ball" />
    </div>
  );
};

export default LeagueLoading;
