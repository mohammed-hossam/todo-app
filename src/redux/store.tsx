import { configureStore } from '@reduxjs/toolkit';
import { todoSlice } from './features/todo/todoSlice';

const store = configureStore({
  reducer: {
    todos: todoSlice.reducer,
  },
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

export { store };
export type { RootState, AppDispatch };
