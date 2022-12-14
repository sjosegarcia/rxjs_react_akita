import { Todo, VISIBILITY_FILTER } from '../models/todo.model';
import { EntityState, EntityStore, StoreConfig } from '@datorama/akita';

// Data-store
export interface TodosState extends EntityState<Todo> {
  ui: {
    filter: VISIBILITY_FILTER;
  };
}

const initialState = {
  ui: { filter: VISIBILITY_FILTER.SHOW_ALL }
};

@StoreConfig({ name: 'todos' })
export class TodosStore extends EntityStore<TodosState, Todo> {
  constructor() {
    super(initialState);
  }
}

export const todosStore = new TodosStore();