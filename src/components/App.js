import { useEffect, useState } from "react";
import "../App.scss";
import Header from "./Header";
import { v4 as uuidv4 } from 'uuid';
import { Routes, Route } from "react-router";
import NewNote from "./NewNote";
import Sidebar from "./Sidebar";
import WorkSpace from "./WorkSpace";
import moment from "moment";
import TimeHeader from "./TimeHeader";
import ChangeNote from "./ChangeNote";

const messageData = [
  {
    id: uuidv4(),
    date: "8/21/16",
    initialText: `#### Wow, what a cool note. Wow.

    **8/21/16** This is amazing note. Can you believe how grate this note is? It\`s the best note.`,
    text: `#### Wow, what a cool note. Wow.

**8/21/16** This is amazing note. Can you believe how grate this note is? It\`s the best note.`,

  },
  {
    id: uuidv4(),
    date: "5/15/16",
    initialText: `#### Can you check the flight schedule?
    
    **5/15/16** how`,
    text: `#### Can you check the flight schedule?
    
**5/15/16** how`,

  },
  {
    id: uuidv4(),
    date: "3/23/16",
    initialText: `#### OSX.com daily example
    
    **3/23/16** Locked`,
    text: `#### OSX.com daily example
    
**3/23/16** Locked`,

  },
]

const idb = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB;

function App() {
  const [notes, setNotes] = useState(messageData);
  const [idClicked, setIdClicked] = useState(null);

  

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
        const objectStore = db.createObjectStore("MessageStore", { keyPath: "initialText" });

      }
    };

    request.onsuccess = () => {
      // console.log("Success");
      const db = request.result;
      const tx = db.transaction("MessageStore", "readwrite");
      const store = tx.objectStore("MessageStore");

      notes.forEach((message) => {
        const getRequest = store.get(message.initialText);
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
  const findDate = (str) => {
    let date = new Date(str);
    let year = date.getFullYear();
    let month = date.getMonth() + 1; // Месяцы начинаются с 0, поэтому нужно добавить 1
    let day = date.getDate();
    let formattedDate = `${year}${month.toString().padStart(2, "0")}${day
      .toString()
      .padStart(2, "0")}`;
    return formattedDate;
  };
  const removeRecord=(id)=>{
    
    const request = idb.open("MessagesDB", 2);
    request.onsuccess = () =>{
      const db = request.result;
      const tx = db.transaction("MessageStore", "readwrite");
      const store = tx.objectStore("MessageStore");
     const requestRec=store.get(id);
      
     requestRec.onsuccess=()=>{
      // console.log(requestRec.result);
      store.delete(requestRec.result.initialText);
     };
     requestRec.onerror=(event)=>{
      console.log(event);
     }
     tx.oncomplete = ()=> {
      db.close();
    };
    }
    setNotes(notes.filter((el)=>el.initialText!=id));
  }

  useEffect(() => {
    if (!idb) {
      console.log("Error browser");
      return;
    }

    const request = idb.open("MessagesDB", 2);

    request.onerror = (event) => {
      console.log("Error", event);
    };

    request.onsuccess = (event) => {
      // console.log("Success");

      const db = event.target.result;
      const tx = db.transaction("MessageStore", "readwrite");
      const store = tx.objectStore("MessageStore");
      const getAllRequest = store.getAll();

      getAllRequest.onsuccess = (event) => {
        const messages = event.target.result;

        if (messages && messages.length) {
          setNotes(prev => {
            const newMess = [...messages];
            newMess.forEach((el) => {
              const noteDate = findDate(el.date);
              const currentDay = moment().format("YYYYMMDD");
              if (currentDay == noteDate) {
                const start = el.text.indexOf("**");
                const end = el.text.lastIndexOf("**");

                // Если в тексте заметки найдены оба разделителя "**"
                if (start !== -1 && end !== -1) {
                  // Заменим фрагмент между разделителями на новый текст
                  const newText = String(`**${moment().format("HH:mm A")}**`);
                  return el.text = el.text.substring(0, start + 2) + newText + el.text.substring(end);
                }
              } else {
                const start = el.text.indexOf("**");
                const end = el.text.lastIndexOf("**");
                if (start !== -1 && end !== -1) {
                  // Заменим фрагмент между разделителями на новый текст
                  const newText = String(`**${moment().format("M/D/YY")}**`);
                  return el.text = el.text.substring(0, start + 2) + newText + el.text.substring(end);
                }
              }
            });
            return newMess;
          });
        } else {
          createCollection();
        }
      };

      getAllRequest.onerror = (event) => {
        console.log("Error", event);
      };
    };

    request.onupgradeneeded = (event) => {
      const db = event.target.result;

      if (!db.objectStoreNames.contains("MessageStore")) {
        const objectStore = db.createObjectStore("MessageStore", { keyPath: "initialText" });
      }
    };
   
  }, []);

  useEffect(() => {
    createCollection();
   
  }, [notes])


  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Header removeRecord={removeRecord} idClicked={idClicked} notes={notes}/>}>

          <Route path="/" element={<Sidebar notes={notes} setNotes={setNotes} findDate={findDate} setIdClicked={setIdClicked}
            idClicked={idClicked} />} >
            <Route path="/" element={<TimeHeader />}>
              {/* <Route path="/"></Route> */}
              <Route path="/work" element={<WorkSpace notes={notes} idClicked={idClicked} />} />
              <Route path="/new" element={<NewNote setNotes={setNotes} />} />
              <Route path="/change" element={<ChangeNote idClicked={idClicked} notes={notes}/>}/>
            </Route>


          </Route>
        </Route>
      </Routes>

    </div>
  );
}

export default App;
