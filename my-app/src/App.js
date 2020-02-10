import React from 'react';
import { ToastContainer } from "react-toastify";
import './App.css';
import {Redirect} from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import SimpleTabs from './component/navBar';
function App() {
  return (
    <div className="App">
     
<SimpleTabs></SimpleTabs>
<ToastContainer />
      <Redirect from="/" exact to="/home" />

    </div>
  );
}

export default App;
