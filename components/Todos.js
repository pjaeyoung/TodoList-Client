import { useMutation } from '@apollo/client';
import { REMOVE_TODO, UPDATE_TODO } from '@gql';
import { Todo } from '@components';
import styles from 'styles/Home.module.css';

export default function Todos({ todos, setTodos }) {
  const [removeTodo] = useMutation(REMOVE_TODO, {
    update: (cache, { data: { removeTodo: removeId } }) => {
      cache.modify({
        fields: {
          todo(cachedTodos) {
            return cachedTodos.filter((todo) => todo.id !== removeId);
          },
        },
      });
      setTodos((prev) => prev.filter((todo) => todo.id !== removeId));
    },
  });
  const onClickRemoveButton = ({
    target: {
      dataset: { id },
    },
  }) => {
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

  const onClickUpdateButton = ({ id, content }) => {
    updateTodo({ variables: { id, content } });
  };

  return (
    <ul className={styles.grid}>
      {todos.map(({ id, content }) => (
        <li className={styles.card} key={id}>
          <Todo
            id={id}
            content={content}
            styles={styles}
            onClickRemoveButton={onClickRemoveButton}
            onClickUpdateButton={onClickUpdateButton}
          />
        </li>
      ))}
    </ul>
  );
}
