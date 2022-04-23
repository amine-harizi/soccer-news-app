import "./App.css";
import News from "./Components/News/News";
import Standings from "./Components/Standings/Standings";
import Home from "./Components/Home/Home";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/news" element={<News />} />
        <Route path="/standings" element={<Standings />} />
      </Routes>
    </div>
  );
}

export default App;
