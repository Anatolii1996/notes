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
    date: "8/21/16",
    text: `#### Wow, what a cool note. Wow.

**8/21/16** This is amazing note. Can you believe how grate this note is? It\`s the best note.`,
  
  },
  {
    id: uuidv4(),
    date: "5/15/16",
    text: `#### Can you check the flight schedule?
    
**5/15/16** how`,
    
  },
  {
    id: uuidv4(),
    date: "3/23/16",
    text: `#### OSX.com daily example
    
**3/23/16** Locked`,
    
  },
]

const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;



function App() {
  const [notes, setNotes] = useState(messageData);

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
  
      notes.forEach((message) => {
        const getRequest = store.get(message.id);
        getRequest.onsuccess = (event) => {
          const existingMessage = event.target.result;
    
          if (!existingMessage) {
            store.add(message);
            console.log("Message added");
          } else {
            console.log("Message already exists");
          }
    
          tx.oncomplete = () => {
            db.close();
          };
        };
        getRequest.onerror = (event) => {
          console.log("Error", event);
        };
      });
  
      tx.oncomplete = () => {
        db.close();
        console.log("Messages added");
      };
    };
  };

  useEffect(() => {
    createCollection()
  }, []);

  useEffect(()=>{
    createCollection()
  }, [notes])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header />}>

          <Route path="/" element={<Sidebar notes={notes} setNotes={setNotes}/>} >
            <Route path="/main" element={<WorkSpace />} />
            <Route path="/new" element={<NewNote setNotes={setNotes} />} />

          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
