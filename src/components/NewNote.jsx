import { useState } from "react";

const NewNote = () => {
  const [newNote, setNewNote] = useState("");

  return (
    <div className="new_note">
      <textarea name="" id="" cols="100" rows="10"></textarea>
    </div>
  );
};
export default NewNote;
