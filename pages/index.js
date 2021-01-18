import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { initializeApollo } from '@lib/apolloClient';
import { TODOS, REMOVE_TODO, UPDATE_TODO } from '@gql';
import styles from 'styles/Home.module.css';
import { Todos, TodoInput } from '@components';

Home.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default function Home({ todos: initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

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
    <div className={styles.container}>
      <header className={styles.title}>TodoList</header>
      <main className={styles.main}>
        <TodoInput setTodos={setTodos} />
        <Todos
          todos={todos}
          onClickRemoveButton={onClickRemoveButton}
          onClickUpdateButton={onClickUpdateButton}
        />
      </main>
    </div>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: TODOS,
  });

  return { props: { todos: data.todos }, revalidate: 1 };
}
