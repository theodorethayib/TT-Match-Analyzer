import './App.css';
import React from "react";
import {Helmet} from "react-helmet";
import VideoNotesView from "./Views/VideoNotesView";

function App() {
  return (
    <div className="App">
        <Helmet>
            <title>TT Match Analyzer</title>
        </Helmet>
        <VideoNotesView />
    </div>
  );
}

export default App;
