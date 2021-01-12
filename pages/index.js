import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { initializeApollo } from '../lib/apolloClient';
import { TODOS, ADD_TODO, REMOVE_TODO } from '../gql';
import styles from '../styles/Home.module.css';

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

  return (
    <div className={styles.container}>
      <header className={styles.title}>TodoList</header>
      <main className={styles.main}>
        <form onSubmit={submitTodo}>
          <input
            className={styles.input}
            type="text"
            name="todo 입력"
            placeholder="새 할 일을 입력하세요...."
            value={todo}
            onChange={onChangeTodo}
            autoComplete="off"
          />
        </form>
        <ul className={styles.grid}>
          {todos.map(({ id, content }) => (
            <li className={styles.card} key={id}>
              {content}
              <button onClick={onClickRemoveButton} data-id={id} className={styles.removeBtn}>
                X
              </button>
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
