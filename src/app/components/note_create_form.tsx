'use client';
import React, {useActionState,startTransition} from "react";
import {
  Form,
  Input,
  Textarea,
  Button,
  Popover,
  PopoverContent,
  PopoverTrigger
} from "@nextui-org/react";
import { createNote } from "@/api/notes.api"

export default function NoteCreateForm(){
     const [formState, action, isPending] = useActionState(createNote, { errors: {} });
     const handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault()
        let formData: FormData = new FormData(event.currentTarget)
        startTransition(() => {
           action(formData);
       });
       event.currentTarget.reset()
     }

     return (
        <>
          <Popover>
            <PopoverTrigger>
              <div className="flex flex-row-reverse">
                <Button>Create Note</Button>
              </div>
            </PopoverTrigger>
             <PopoverContent>
                <Form className="flex flex-col p-4 w-80" onSubmit={handleSubmit} >
                    <Input
                        label="Title"
                        labelPlacement="outside"
                        name="title"
                        placeholder="Enter Title"
                        isInvalid= {!!formState.errors?._form}
                        required={true}
                        validationBehavior="native"
                    />
                    <Textarea
                        label="Content"
                        labelPlacement="outside"
                        name="content"
                        placeholder="Enter Content"
                        isInvalid= {!!formState.errors?._form}
                        required={true}
                        validationBehavior="native"
                    />
                     {
                       formState?.errors?._form ?
                       <div className="text-red-500">
                           <p>{formState.errors._form?.join(", ")}</p>
                       </div>
                       : null
                     }
                    <Button type="submit" isLoading={isPending}> Submit</Button>
                </Form>
            </PopoverContent>
          </Popover>
        </>

     )
}