import axios from "axios"
export type Note = {
    _id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
}
export const getNotes = async (limit?: number, page?: number) => {
  try {
    const params = new URLSearchParams();
    if (limit) params.append("limit", limit.toString());
    if (page) params.append("page", page.toString());

    const { data: { data } } = await axios.get(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/notes?${params.toString()}`
    );

    return data;
  } catch (err) {
    console.log(err)
  }
};

interface CreateNoteFormState{
  errors?: {
    title?: string[]
    content?: string[]
    _form?: string[]
  },
  success?: boolean;
}

export const createNote = async (
  formState: CreateNoteFormState,
  formData: FormData
): Promise<CreateNoteFormState> => {
  try {
    const note: Record<string, string> = {};
    formData.forEach((value, key) => {
       note[key] = value as string;
    });
    const { data: { data, message }  } = await axios.post(`${process.env.NEXT_PUBLIC_ROOT_URL}/notes`, note);
    if (!data){
       return {
          errors: {
            _form: [message],
          },
          success: false
       }
    }
    return { success: true };
  } catch (err) {
    return {
      errors: {
        _form: [(err as { message: string })?.message || "Something went wrong"],
      },
      success: false
    };
  }
};

export const updateNote = async (
  noteId: string,
  formData: FormData
): Promise<CreateNoteFormState> => {
  try {
    const note: Record<string, string> = {};
    formData.forEach((value, key) => {
      note[key] = value as string;
    });

    const { data: { data, message } } = await axios.put(
      `${process.env.NEXT_PUBLIC_ROOT_URL}/notes/${noteId}`,
      note
    );

    if (!data) {
      return {
        errors: {
          _form: [message],
        },
      };
    }
    return { success: true };
  } catch (err) {
    return {
      errors: {
        _form: [(err as { message: string })?.message || "Something went wrong"],
      },
    };
  }
};

export const deleteNote = async (noteId: string) => {
  try {
    await axios.delete(`${process.env.NEXT_PUBLIC_ROOT_URL}/notes/${noteId}`);
    return true;
  } catch (err) {
    console.error("Failed to delete note:", (err as { message: string })?.message);
    return false;
  }
};
