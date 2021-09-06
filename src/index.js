import React from "react";
import Calendar from "./components/calendar/calendar";
import { BrowserRouter as Router } from "react-router-dom";

function App() {
  return (
    <Router>
      <Calendar />
    </Router>
  );
}

export default App;
