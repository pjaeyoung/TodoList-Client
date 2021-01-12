import { useState } from 'react';
import { initializeApollo } from '../lib/apolloClient';
import { TODOS } from '../gql';
import styles from '../styles/Home.module.css';

export default function Home({ todos }) {
  const [todo, setTodo] = useState('');
  const onChangeTodo = ({ target: { value } }) => {
    setTodo(value);
  };

  return (
    <div className={styles.container}>
      <header className={styles.title}>TodoList</header>
      <main className={styles.main}>
        <form>
          <input
            className={styles.input}
            type="text"
            name="todo 입력"
            placeholder="새 할 일을 입력하세요...."
            value={todo}
            onChange={onChangeTodo}
          />
        </form>
        <ul className={styles.grid}>
          {todos.map(({ id, content }) => (
            <li className={styles.card} key={id} data-id={id}>
              {content}
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
