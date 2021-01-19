import { Dispatch, SetStateAction } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_TODO, UPDATE_TODO } from '@gql';
import { Todo } from '@components';
import { TodoType } from '@types';
import styles from '@styles/Home.module.css';

interface TodosProps {
  todos: TodoType[];
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

const Todos: React.FC<TodosProps> = ({ todos, setTodos }) => {
  const [removeTodo] = useMutation<{ removeTodo: string }, { id: string }>(
    REMOVE_TODO,
    {
      update: (cache, { data: { removeTodo: removeId } }) => {
        cache.modify({
          fields: {
            todo(cachedTodos: TodoType[]) {
              return cachedTodos.filter((todo) => todo.id !== removeId);
            },
          },
        });
        setTodos((prev) => prev.filter((todo) => todo.id !== removeId));
      },
    },
  );
  const onClickRemoveButton = (
    e: React.MouseEvent<HTMLButtonElement>,
  ): void => {
    const {
      currentTarget: {
        dataset: { id },
      },
    } = e;
    removeTodo({ variables: { id } });
  };

  const [updateTodo] = useMutation(UPDATE_TODO, {
    update: (cache, { data: { updateTodo: updatedTodo } }) => {
      cache.modify({
        fields: {
          todo(cachedTodos) {
            const updatedTodoIndex = cachedTodos.findIndex(
              ({ id }) => updatedTodo.id === id,
            );
            cachedTodos[updatedTodoIndex] = updatedTodo;
            return cachedTodos;
          },
        },
      });
      setTodos((prev) => {
        const updatedTodoIndex = prev.findIndex(
          ({ id }) => updatedTodo.id === id,
        );
        prev[updatedTodoIndex] = updatedTodo;
        return prev;
      });
    },
  });

  const onClickUpdateButton = ({ id, content }: TodoType): void => {
    updateTodo({ variables: { id, content } });
  };

  return (
    <ul className={styles.grid}>
      {todos.map(({ id, content }) => (
        <li className={styles.card} key={id}>
          <Todo
            id={id}
            content={content}
            onClickRemoveButton={onClickRemoveButton}
            onClickUpdateButton={onClickUpdateButton}
          />
        </li>
      ))}
    </ul>
  );
};

export default Todos;
