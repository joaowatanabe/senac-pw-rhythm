import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import Home from "./pages/Home/Home";
import Inclusion from "./pages/Inclusion/Inclusion";
import Search from "./pages/Search/Search";
import MySongs from "./pages/MySongs/MySongs";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/inclusion" element={<Inclusion />} />
          <Route path="/my-songs" element={<MySongs />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
