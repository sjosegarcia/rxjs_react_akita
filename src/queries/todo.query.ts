
import { TodosState, todosStore, TodosStore } from '../store/todo.store';
import { Todo, VISIBILITY_FILTER } from '../models/todo.model';
import { QueryEntity } from '@datorama/akita';
import { combineLatest, map } from 'rxjs';

export class TodosQuery extends QueryEntity<TodosState, Todo> {
  selectVisibilityFilter$ = this.select(state => state.ui.filter);
  
  selectVisibleTodos$ = combineLatest([
    this.selectVisibilityFilter$,
    this.selectAll()
  ]).pipe(
     map(([filter, todos]) => 
         this.getVisibleTodos(filter, todos))
  );

  constructor(protected store: TodosStore) {
    super(store);
  }

  private getVisibleTodos(filter: string, todos: Todo[]): Todo[] {
    switch (filter) {
      case VISIBILITY_FILTER.SHOW_COMPLETED:
        return todos.filter(t => t.completed);
      case VISIBILITY_FILTER.SHOW_ACTIVE:
        return todos.filter(t => !t.completed);
      default:
        return todos;
    }
  }
}

export const todosQuery = new TodosQuery(todosStore);