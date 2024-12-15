"use client"
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell, Tooltip} from "@nextui-org/react";
import { Note, deleteNote } from "@/api/notes.api";
import React, { useState } from "react";
import NoteUpdateForm from "./note_update_form";

interface NoteListProps {
    notes: Note[]
}

export default function NoteList({ notes }: NoteListProps) {
    const [selectedNote, setSelectedNote] = useState<Note | null>(null);
    const [isUpdateFormOpen, setIsUpdateFormOpen] = useState(false);

    const handleEditClick = (note: Note) => {
        setSelectedNote(note);
        setIsUpdateFormOpen(true);
    };

    const handleDeleteClick = async (noteId: string) => {
        if (window.confirm("Are you sure you want to delete this note?")) {
            const success = await deleteNote(noteId);
            if (success) {
                window.location.reload(); // Refresh to show updated list
            } else {
                alert("Failed to delete note. Please try again.");
            }
        }
    };

    const closeForm = () => {
        setIsUpdateFormOpen(false);
        setSelectedNote(null);
    };

    const renderCell = React.useCallback((note: Note) => (
        <TableRow key={note._id}>
            <TableCell>{note.title}</TableCell>
            <TableCell>{note.content}</TableCell>
            <TableCell>{new Date(note.createdAt).toLocaleString()}</TableCell>
            <TableCell>
                <div className="relative flex items-center gap-2">
                    <Tooltip content="Edit Note">
                        <span
                            className="text-lg text-default-400 cursor-pointer active:opacity-50"
                            onClick={() => handleEditClick(note)}
                        >
                            <EditIcon />
                        </span>
                    </Tooltip>

                    <Tooltip color="danger" content="Delete Note">
                        <span
                            className="text-lg text-danger cursor-pointer active:opacity-50"
                            onClick={() => handleDeleteClick(note._id)}
                        >
                            <DeleteIcon />
                        </span>
                    </Tooltip>
                </div>
            </TableCell>
        </TableRow>
    ), []);

    return (
        <>
            <Table aria-label="Notes table with dynamic content">
                <TableHeader>
                    <TableColumn>TITLE</TableColumn>
                    <TableColumn>CONTENT</TableColumn>
                    <TableColumn>CREATED TIME</TableColumn>
                    <TableColumn>ACTIONS</TableColumn>
                </TableHeader>
                <TableBody>
                    {notes?.map((note) => renderCell(note))}
                </TableBody>
            </Table>

            {selectedNote && (
                <NoteUpdateForm
                    note={selectedNote}
                    isOpen={isUpdateFormOpen}
                    onClose={closeForm}
                />
            )}
        </>
    );
}

export const DeleteIcon = () => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
        >
            <path
                d="M17.5 4.98332C14.725 4.70832 11.9333 4.56665 9.15 4.56665C7.5 4.56665 5.85 4.64998 4.2 4.81665L2.5 4.98332"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.08331 4.14169L7.26665 3.05002C7.39998 2.25835 7.49998 1.66669 8.90831 1.66669H11.0916C12.5 1.66669 12.6083 2.29169 12.7333 3.05835L12.9166 4.14169"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M15.7084 7.61664L15.1667 16.0083C15.075 17.3166 15 18.3333 12.675 18.3333H7.32502C5.00002 18.3333 4.92502 17.3166 4.83335 16.0083L4.29169 7.61664"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M8.60834 13.75H11.3833"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
            <path
                d="M7.91669 10.4167H12.0834"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
            />
        </svg>
    );
};

export const EditIcon = () => {
    return (
        <svg
            aria-hidden="true"
            fill="none"
            focusable="false"
            height="1em"
            role="presentation"
            viewBox="0 0 20 20"
            width="1em"
        >
            <path
                d="M11.05 3.00002L4.20835 10.2417C3.95002 10.5167 3.70002 11.0584 3.65002 11.4334L3.34169 14.1334C3.23335 15.1084 3.93335 15.775 4.90002 15.6084L7.58335 15.15C7.95835 15.0834 8.48335 14.8084 8.74168 14.525L15.5834 7.28335C16.7667 6.03335 17.3 4.60835 15.4583 2.86668C13.625 1.14168 12.2334 1.75002 11.05 3.00002Z"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M9.90833 4.20831C10.2667 6.50831 12.1333 8.26665 14.45 8.49998"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
            <path
                d="M2.5 18.3333H17.5"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
                strokeWidth={1.5}
            />
        </svg>
    );
};
