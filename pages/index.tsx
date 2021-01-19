import { useState } from 'react';
import { GetStaticProps, NextPage } from 'next';
import { ApolloClient, NormalizedCacheObject } from '@apollo/client';
import { initializeApollo } from '@lib/apolloClient';
import { TODOS } from '@gql';
import { Todos, TodoInput } from '@components';
import { Todo } from '@types';
import styles from 'styles/Home.module.css';

interface HomeProps {
  todos: Todo[];
}

const Home: NextPage<HomeProps> = ({ todos: initialTodos }) => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);

  return (
    <div className={styles.container}>
      <header className={styles.title}>TodoList</header>
      <main className={styles.main}>
        <TodoInput setTodos={setTodos} />
        <Todos todos={todos} setTodos={setTodos} />
      </main>
    </div>
  );
};

export default Home;

export const getStaticProps: GetStaticProps<HomeProps> = async () => {
  const apolloClient: ApolloClient<NormalizedCacheObject> = initializeApollo();
  const { data } = await apolloClient.query({
    query: TODOS,
  });

  return { props: { todos: data.todos }, revalidate: 1 };
};
