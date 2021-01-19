import { StoreObject } from '@apollo/client';

interface Todo extends StoreObject {
  id: string;
  content: string;
}

export default Todo;
