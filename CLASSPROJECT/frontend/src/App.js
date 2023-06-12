import "./App.css";
import Navbar from "./components/Navbars/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Signup from "./screens/Auth/Signup";
import PrivateComponent from "./components/Private/PrivateComponent";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route element={<PrivateComponent />}>
            <Route path="/" element={<h1>ALL PRODUCTS</h1>} />
            <Route path="/addProducts" element={<h1>Add PRODUCTS</h1>} />
            <Route path="/updateProducts" element={<h1>Update PRODUCTS</h1>} />
            <Route path="/profile" element={<h1>Profile</h1>} />
            <Route path="/logout" element={<h1>Logout</h1>} />
          </Route>
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
