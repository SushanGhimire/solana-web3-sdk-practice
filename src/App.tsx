import AppNavbar from "./components/static/AppNavbar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/home/Home";

function App() {
  return (
    <div className="App">
      <AppNavbar />
      <div className="container p-5">
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
