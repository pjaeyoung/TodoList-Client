import { Todo } from '@components';
import styles from 'styles/Home.module.css';

export default function Todos({
  todos,
  onClickRemoveButton,
  onClickUpdateButton,
}) {
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
