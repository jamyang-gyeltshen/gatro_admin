
import React from "react";
import ReactDOM from "react-dom/client";
import { Route, Routes, BrowserRouter} from "react-router-dom";
import './App.css';
import AddEdit from "./pages/AddEdit";
import Dashboard from "./pages/Dashboard";
import View from "./pages/View";
import Layout from "./pages/layout";
import About from "./pages/About";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";




export default function App() {
  const root = ReactDOM.createRoot(document.getElementById('root'));
  return (
    root.render(
      <BrowserRouter>
      <div>
      <Header position="top-center" />
      <ToastContainer position="top-center"/>
      <Routes position="center"> 
       <Route path="/" element={<Layout />}>
          <Route exact index element={<Dashboard />} />
          <Route path="/add" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<View />} />
          <Route path="/about" element={<About/>}/>
        </Route>
      </Routes>
      </div>
    </BrowserRouter>
  

    )
    
  );
}


 
