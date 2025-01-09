"use client";
import { useEffect, useState } from "react";
import { getNotes  } from "@/api/notes.api"
import NoteCreateForm from "@/app/components/note_create_form"
import NoteList from "./components/note_list";
export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const data = await getNotes();
        setNotes(data);
      } catch (error) {
        console.error("Failed to fetch notes:", error);
        setNotes([]); // Fallback data
      }
    }
    fetchNotes();
  }, []);
  return (

    <div className="grid grid-cols-6 gap-4 p-4 min-h-full bg-gray-100 ">
         <div className="col-start-2 col-span-4">
            <NoteCreateForm/>
            <h1 className="text-xl flex justify-center" > Total Notes</h1>
            <NoteList notes= {notes}/>
         </div>
    </div>
  );
}
