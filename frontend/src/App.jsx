import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom"; // Import BrowserRouter
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Dashboard from "./components/Dashboard";
import Send from "./components/Send";
import { RecoilRoot } from "recoil";
import { Index } from "./components/Index";
function App() {

  return (
    <div>
      <RecoilRoot>
        <Router>
          <Routes>
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/signin" element={<Signin/>}/>
            <Route path="/dashboard" element={<Dashboard/>}/>
            <Route path="/send" element={<Send/>}/>
            <Route path="/" element={<Index/>}></Route>


          </Routes>
        </Router>
        </RecoilRoot>
    </div>
  )
}

export default App
