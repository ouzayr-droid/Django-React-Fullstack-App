import { useState, useEffect } from "react";
import api from "../api.js";
import Note from "../components/Note.jsx";
import "../styles/Home.css";

function Home() {
    const [notes, setNotes] = useState([]);
    const [content, setContent] = useState("");
    const [title, setTitle] = useState("");

    useEffect(() => {
        getNotes();
    }, []);

    const getNotes = () => {
        api.get("api/notes/")
        .then((res) => res.data)
        .then((data) => {setNotes(data); console.log(data);})
        .catch((err) => alert(err));
    };

    const deleteNote = (id) => {
        api.delete(`api/notes/delete/${id}/`)
        .then(
            (res)=>{
                if(res.status === 204) {
                    alert("Note deleted successfully");
                }else{
                    alert("Failed to delete note");
                    getNotes()
                }
            }
        )
        .catch((err) => alert(err));
        
    };

    const createNote = (e) => {
        e.preventDefault();
        api.post("api/notes/", {title, content})
        .then((res) => {
            if(res.status === 201) {
                alert("Note created successfully");
                
            }else{
                alert("Failed to create note");
                getNotes()
            }
        })
        .catch((err) => alert(err));
       
    }

    return <div>
       <div>
         <h2>Notes</h2>
         {notes.length === 0 ? (
            <p>Aucune note disponible.</p>
         ) : (
            <div className="notes-container">
              {notes.map((note) => (
                <Note key={note.id} note={note} onDelete={deleteNote} />
              ))}
            </div>
         )}
       </div>

       <h2>Créer une note</h2>
       <form onSubmit={createNote}>
        <label htmlFor="title">Titre:</label><br/>
         <input
           type="text"
           id="title"
           name="title"
           required
           placeholder="Titre"
           value={title}
           onChange={(e) => setTitle(e.target.value)}
         />

         <label htmlFor="content">Contenu:</label><br/>
         <textarea
           placeholder="Contenu"
           id="content"
           name="content"
           required
           value={content}
           onChange={(e) => setContent(e.target.value)}
         /><br/>

         <input type="submit" value="Créer"></input>
       </form>
    </div>
}

export default Home;