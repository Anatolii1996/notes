import { useEffect, useState } from "react";
import "../App.scss";
import Header from "./Header";
import { v4 as uuidv4 } from 'uuid';
const messageData = [
  {
    id: uuidv4(),
    title: "Wow, what a cool note. Wow",
    text: "This is amazing note. Can you believe how grate this note is? It`s the best note."
  },
  {
    id: uuidv4(),
    title: "Can you check the flight schedule?",
    text: "How?"
  },
  {
    id: uuidv4(),
    title: "OSX.com daily example",
    text: "Locked"
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
  const [notes, setNotes] = useState("");

  useEffect(() => {
    createCollection()
  }, [])
  return (
    <div className="App">
      <Header />
    </div>
  );
}

export default App;
