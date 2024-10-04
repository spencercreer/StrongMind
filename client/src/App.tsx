import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import PizzasPage from "./pages/PizzasPage/PizzasPage";
import ToppingsPage from "./pages/ToppingsPage/ToppingsPage";
import ErrorPage from "./pages/ErrorPage/ErrorPage";
import Header from "./components/Header";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
      <div className="flex flex-col h-screen">
        <Header />
        <Routes>
          <Route path="/" element={<PizzasPage />} />
          <Route path="/toppings" element={<ToppingsPage />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
