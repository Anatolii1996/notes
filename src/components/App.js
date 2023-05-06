import { useEffect } from "react";
import "../App.scss";
import Header from "./Header";

// const=[{
  
// }]

const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;

const createCollection = () => {
  if (!idb) {
    console.log("Error browser");
    return
  }
  console.log(idb);
  const request = idb.open("MessagesDB", 2);

  request.onerror = (event) => {
    console.log("Error", event);
  };

  request.onupgradeneeded = (event) => {
    const db = request.result;

    if(!db.objectStoreNames.contains("MessageStore")){
      db.createObjectStore("MessageStore")
    }
  };

  request.onsuccess = () => {

  }
}

function App() {
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
