import React from 'react';
import { BrowserRouter as Router, Route} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';

import Navbar from "./components/Navbar";
import ExercisesList from "./components/ExercisesList";
import EditExercise from "./components/EditExercise.js";
import CreateExercise from "./components/CreateExercise.js";
import CreateUser from "./components/CreateUser.js";
function App() {
  return (
    <Router >
      <Navbar/>
      <div className="container">
        <Route path="/" exact component={ExercisesList} />
        <Route path="/edit/:id" exact component={EditExercise} />
        <Route path="/create" exact component={CreateExercise} />
        <Route path="/user" exact component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
