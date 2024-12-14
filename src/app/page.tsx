import Image from "next/image";
import { Button } from "@nextui-org/react";

export default function Home() {
  return (

    <div className="grid grid-cols-4 gap-4 p-4 min-h-full bg-gray-100 ">
         <div className="col-start-2 col-span-2">
            <Button> Create note </Button>
            <h1 className="text-xl flex justify-center" > Total Notes</h1>

         </div>
    </div>
  );
}
