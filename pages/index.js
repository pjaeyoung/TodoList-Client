import { initializeApollo } from '../lib/apolloClient';
import { todos } from '../gql';

export default function Home({ todos }) {
  return (
    <main>
      <form>
        <input type="text" name="todo 입력" />
      </form>
      <ul>
        {todos.map(({ id, content }) => (
          <li key={id} data-id={id}>
            {content}
          </li>
        ))}
      </ul>
    </main>
  );
}

export async function getStaticProps() {
  const apolloClient = initializeApollo();
  const { data } = await apolloClient.query({
    query: todos,
  });

  return { props: { todos: data.todos }, revalidate: 1 };
}
