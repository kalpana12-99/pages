import { useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import "./App.css";
import authService from "./appwrite/auth";
import { login, logout } from "./store/authSlice";
import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";

function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false)); //will always run when there is error or not
  }, []);

  return !loading ? (
    <div className="min-h-screen flex flex-wrap content-between bg-gray-400">
      <div className="w-full block">
        <Header />
        <main>TODO: {/* <Outlet/> */}</main>
        <Footer />
      </div>
    </div>
  ) : null;
}

export default App;
