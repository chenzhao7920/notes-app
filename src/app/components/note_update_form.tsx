'use client';
import React, { useState } from "react";
import {
    Form,
    Input,
    Textarea,
    Button,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody
} from "@nextui-org/react";
import { updateNote, Note } from "@/api/notes.api";

interface NoteUpdateFormProps {
    note: Note;
    isOpen: boolean;
    onClose: () => void;
}

export default function NoteUpdateForm({ note, isOpen, onClose }: NoteUpdateFormProps) {
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await updateNote(note._id, formData);

        if (result.errors?._form) {
            setError(result.errors._form.join(", "));
        } else {
            onClose();
            window.location.reload(); // Refresh to show updated list
        }
        setIsPending(false);
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            placement="center"
        >
            <ModalContent>
                {(onClose) => (
                    <>
                        <ModalHeader className="flex flex-col gap-1">Update Note</ModalHeader>
                        <ModalBody>
                            <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                <Input
                                    label="Title"
                                    labelPlacement="outside"
                                    name="title"
                                    placeholder="Enter Title"
                                    defaultValue={note.title}
                                    isInvalid={!!error}
                                    required={true}
                                    validationBehavior="native"
                                />
                                <Textarea
                                    label="Content"
                                    labelPlacement="outside"
                                    name="content"
                                    placeholder="Enter Content"
                                    defaultValue={note.content}
                                    isInvalid={!!error}
                                    required={true}
                                    validationBehavior="native"
                                />
                                {error && (
                                    <div className="text-red-500">
                                        <p>{error}</p>
                                    </div>
                                )}
                                <div className="flex justify-end gap-2">
                                    <Button color="danger" variant="light" onPress={onClose}>
                                        Cancel
                                    </Button>
                                    <Button
                                        type="submit"
                                        color="primary"
                                        isLoading={isPending}
                                    >
                                        Update
                                    </Button>
                                </div>
                            </Form>
                        </ModalBody>
                    </>
                )}
            </ModalContent>
        </Modal>
    );
}
