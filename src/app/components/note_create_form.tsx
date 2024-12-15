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
  ModalBody,
  ModalFooter,
  useDisclosure
} from "@nextui-org/react";
import { createNote } from "@/api/notes.api";

export default function NoteCreateForm() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const formRef = React.useRef<HTMLFormElement>(null);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);
        setError(null);

        const formData = new FormData(event.currentTarget);
        const result = await createNote({ errors: {} }, formData);

        if (result.errors?._form) {
            setError(result.errors._form.join(", "));
        } else {
            event.currentTarget.reset();
            onClose();
            window.location.reload(); // Refresh to show the new note
        }
        setIsPending(false);
    };

    return (
        <>
            <div className="flex flex-row-reverse mb-4">
                <Button
                    color="primary"
                    variant="solid"
                    onPress={onOpen}
                >
                    Create Note
                </Button>
            </div>

            <Modal
                isOpen={isOpen}
                onClose={onClose}
                placement="center"
            >
                <ModalContent>
                    {(onClose) => (
                        <>
                            <ModalHeader className="flex flex-col gap-1">Create New Note</ModalHeader>
                            <ModalBody>
                                <Form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                                    <Input
                                        label="Title"
                                        labelPlacement="outside"
                                        name="title"
                                        placeholder="Enter Title"
                                        isInvalid={!!error}
                                        required={true}
                                        validationBehavior="native"
                                    />
                                    <Textarea
                                        label="Content"
                                        labelPlacement="outside"
                                        name="content"
                                        placeholder="Enter Content"
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
                                            Create
                                        </Button>
                                    </div>
                                </Form>
                            </ModalBody>
                        </>
                    )}
                </ModalContent>
            </Modal>
        </>
    );
}
