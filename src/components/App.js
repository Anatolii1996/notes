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
    console.log("Success");
    const db = request.result;
    const tx = db.transaction("MessageStore", "readwrite");
    const store = tx.objectStore("MessageStore");

    messageData.forEach((message) => {
      store.put(message, message.id);
    });

    tx.oncomplete = () => {
      db.close();
      console.log("Messages added");
    };
  };
};

function App() {
  const [notes, setNotes] = useState(messageData);

  useEffect(() => {
    createCollection()
  }, []);

  // useEffect(() => {
  //   const dbPromise = idb.open("MessagesDB", 2);
  //   dbPromise.onsuccess = () => {
  //     const db = dbPromise.result;

  //     const tx = db.transaction("MessageStore", "readwrite");
  //     const MessageStore = tx.objectStore("MessageStore");
  //     const message=MessageStore.put({
  //       id: 1,
  //       text: notes
  //     });
  //     message.onsuccess=()=>{
  //       tx.oncomplete=()=>{
  //         db.close();
  //       }
  //       console.log("mes added");
  //     };
  //     message.onerror=(event)=>{
       
  //       console.log(event);
  //     }
  //   }
  // }, [notes])

  // useEffect(() => {
  //   const updateDatabase = async () => {
  //     try {
  //       const db = await idb.open("MessagesDB", 2);
  //       const tx = db.transaction("MessageStore", "readwrite");
  //       const messageStore = tx.objectStore("MessageStore");
  //       const message = { id: uuidv4(), notes };
  //       await messageStore.put(message);
  //       console.log("Message added");
  //       tx.oncomplete = () => db.close();
  //     } catch (error) {
  //       console.log("Error:", error);
  //     }
  //   };

  //   updateDatabase();
  // }, [notes]);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="/" element={<Sidebar />} >
            <Route path="/main" element={<WorkSpace />} />
            <Route path="/new" element={<NewNote setNotes={setNotes} />} />

          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
