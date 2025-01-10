"use client";
import { useEffect, useState } from "react";
import axios from "axios";
// import { getNotes  } from "@/api/notes.api"
import NoteCreateForm from "@/app/components/note_create_form"
import NoteList from "./components/note_list";
export default function Home() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    async function fetchNotes() {
      try {
        const url = 'https://wft-geo-db.p.rapidapi.com/v1/geo/countries';
        const config = {
          headers: {
            'x-rapidapi-key': '7676a93f26mshe6fc6f2f437c35ep1223e8jsnb36035426f98',
            'x-rapidapi-host': 'wft-geo-db.p.rapidapi.com'
          }
        };
        const {data: { data }} = await axios.get(url, config)
        let notes = data?.map((e:any, i: number)=>({ _id: i, title: e?.code, content: e?.name }))
        setNotes(notes);
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
