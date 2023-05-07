import { useEffect, useState } from "react";
import "../App.scss";
import Header from "./Header";
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route } from "react-router";
import NewNote from "./NewNote";
import Sidebar from "./Sidebar";
import WorkSpace from "./WorkSpace";

const messageData = [
  {
    id: uuidv4(),
    text: "Wow, what a cool note. Wow. This is amazing note. Can you believe how grate this note is? It`s the best note."
  },
  {
    id: uuidv4(),
    text: "Can you check the flight schedule? How?"
  },
  {
    id: uuidv4(),
    text: "OSX.com daily example Locked"
  },
]

const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;

const createCollection = () => {
  if (!idb) {
    console.log("Error browser");
    return
  }
  // console.log(idb);
  const request = idb.open("MessagesDB", 2);

  request.onerror = (event) => {
    console.log("Error", event);
  };

  request.onupgradeneeded = (event) => {
    const db = request.result;

    if (!db.objectStoreNames.contains("MessageStore")) {
      const objectStore = db.createObjectStore("MessageStore", { keyPath: "id" });

    }
  };

  request.onsuccess = () => {
    console.log("Succsses");
  }
}

function App() {
  const [notes, setNotes] = useState(messageData);

  useEffect(() => {
    createCollection()
  }, [])
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="/" element={<Sidebar />} >
            <Route path="/main" element={<WorkSpace />} />
            <Route path="/new" element={<NewNote setNotes={setNotes}/>} />

          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
