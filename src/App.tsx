
import React  from "react";

import "./App.css";
import Boards from "./components/Boards";
import Popup from "./components/Popup";
import { useAppSelector } from "./hook";

function App() {

  const isPopup = useAppSelector(state => state.popup)
  const popup = isPopup.popupAdd || isPopup.popupEdit

  return (
    <div className="App">
      <Boards />
      { popup && <Popup />}
    </div>
  );
}

export default App;
