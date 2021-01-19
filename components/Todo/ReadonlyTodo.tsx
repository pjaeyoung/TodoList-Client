import styles from '@styles/Home.module.css';
import { TodoType } from '@types';

interface ReadonlyTodoProps extends TodoType {
  toggleEditable: () => void;
  onClickRemoveButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const ReadonlyTodo: React.FC<ReadonlyTodoProps> = ({
  id,
  content,
  toggleEditable,
  onClickRemoveButton,
}) => {
  return (
    <>
      {content}
      <button
        onClick={onClickRemoveButton}
        data-id={id}
        className={styles.button}
      >
        X
      </button>
      <button
        onClick={toggleEditable}
        data-id={id}
        data-content={content}
        className={styles.button}
      >
        ✏️
      </button>
    </>
  );
};

export default ReadonlyTodo;
