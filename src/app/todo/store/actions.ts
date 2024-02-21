import { createAction,props } from "@ngrx/store";
import { TodoInterface } from "../types/todo.interface";

export const loadTodos = createAction('[Todo] Load Todos');
export const loadTodosSuccess = createAction('[Todo] Load Todos Success', props<{ todos: TodoInterface[] }>());
export const loadTodosFailure = createAction('[Todo] Load Todos Failure', props<{ error: string }>());
export const addTodo = createAction('[Todo] Add Todo', props<{ todo: TodoInterface }>());
export const updateTodo = createAction('[Todo] Update Todo', props<{ todo: TodoInterface }>());
export const deleteTodo = createAction('[Todo] Delete Todo', props<{ id: string }>());