import { useState } from 'react';
import PropTypes from 'prop-types';
import { useMutation } from '@apollo/client';
import { initializeApollo } from '@lib/apolloClient';
import { TODOS, ADD_TODO, REMOVE_TODO, UPDATE_TODO } from '@gql';
import { Todo } from '@components';
import styles from 'styles/Home.module.css';

Home.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default function Home({ todos: initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);
  const [todo, setTodo] = useState('');
  const onChangeTodo = ({ target: { value } }) => {
    setTodo(value);
  };

  const [addTodo] = useMutation(ADD_TODO, {
    update: (cache, { data: { addTodo: newTodo } }) => {
      cache.modify({
        id: cache.identify(newTodo),
        fields: {
          todo(cachedTodos) {
            return [...cachedTodos, newTodo];
          },
        },
      });
      setTodos((prev) => [...prev, newTodo]);
    },
  });
  const submitTodo = (e) => {
    e.preventDefault();
    addTodo({ variables: { content: todo } });
    setTodo('');
  };

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
    removeTodo({ variables: { id: parseInt(id) } });
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
        <form onSubmit={submitTodo}>
          <input
            className={styles.input}
            type='text'
            name='todo 입력'
            placeholder='새 할 일을 입력하세요....'
            value={todo}
            onChange={onChangeTodo}
            autoComplete='off'
          />
        </form>
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
