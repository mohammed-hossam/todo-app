import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface TODO {
  id: number;
  content: string;
  completed: boolean;
}

const State: TODO[] = [
  { id: 1, content: 'blablablablabal111111', completed: true },
  { id: 2, content: 'blablablablabal222222', completed: false },
  { id: 3, content: 'blablablablabal333333', completed: false },
];

const todoSlice = createSlice({
  name: 'todos',
  initialState: State,
  reducers: {
    addTodo(state, action: PayloadAction<{ content: string }>) {
      const todo = {
        id: Date.now(),
        content: action.payload.content,
        completed: false,
      };
      state.push(todo);
    },

    deleteTodo(state, action: PayloadAction<{ id: number }>) {
      return state.filter((todoObj) => {
        return todoObj.id !== action.payload.id;
      });
    },

    SucessTodo(state, action: PayloadAction<{ id: number }>) {
      const todoTarget = state.findIndex((todoObj) => {
        return todoObj.id === action.payload.id;
      });
      state[todoTarget].completed = true;
    },

    NoSucessTodo(state, action: PayloadAction<{ id: number }>) {
      const todoTarget = state.findIndex((todoObj) => {
        return todoObj.id === action.payload.id;
      });
      state[todoTarget].completed = false;
    },

    editTodo(state, action: PayloadAction<{ id: number; content: string }>) {
      const todoTarget = state.findIndex((todoObj) => {
        return todoObj.id === action.payload.id;
      });
      state[todoTarget].content = action.payload.content;
    },
  },
});

export const { addTodo, deleteTodo, SucessTodo, NoSucessTodo, editTodo } =
  todoSlice.actions;
export { todoSlice };
