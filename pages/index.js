import { useState } from 'react';
import PropTypes from 'prop-types';
import { initializeApollo } from '@lib/apolloClient';
import { TODOS } from '@gql';
import styles from 'styles/Home.module.css';
import { Todos, TodoInput } from '@components';

Home.propTypes = {
  todos: PropTypes.array.isRequired,
};

export default function Home({ todos: initialTodos }) {
  const [todos, setTodos] = useState(initialTodos);

  return (
    <div className={styles.container}>
      <header className={styles.title}>TodoList</header>
      <main className={styles.main}>
        <TodoInput setTodos={setTodos} />
        <Todos todos={todos} setTodos={setTodos} />
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
