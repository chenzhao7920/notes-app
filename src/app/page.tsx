import Image from "next/image";
import { Button } from "@nextui-org/react";
import { Note,getNotes  } from "@/api/notes.api"
import NoteCreateForm from "@/app/components/note_create_form"
import NoteList from "./components/note_list";
export default async function Home() {
  const notes = await getNotes()
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
