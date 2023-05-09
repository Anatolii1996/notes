const ChangeNote=({idClicked, notes})=>{
    return(
        <div className="change_note">
            <textarea value={notes.find((el)=>el.id==idClicked).initialText}  cols="100" rows="10"></textarea>
        </div>
    )
};
export default ChangeNote;