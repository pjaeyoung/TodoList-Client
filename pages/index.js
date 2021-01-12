import { initializeApollo } from '../lib/apolloClient';
import { todos } from '../gql';
import styles from '../styles/Home.module.css';

export default function Home({ todos }) {
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
    query: todos,
  });

  return { props: { todos: data.todos }, revalidate: 1 };
}
