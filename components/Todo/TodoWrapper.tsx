import { useState } from 'react';
import styles from '@styles/Home.module.css';
import { TodoType } from '@types';
import EditableTodo from './EditableTodo';

interface TodoProps extends TodoType {
  onClickRemoveButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickUpdateButton: (arg: TodoType) => void;
}

const TodoWrapper: React.FC<TodoProps> = ({
  id,
  content,
  onClickRemoveButton,
  onClickUpdateButton,
}) => {
  const [editable, setEditable] = useState(false);
  const toggleEditable = () => setEditable(!editable);
  return (
    <>
      {editable ? (
        <EditableTodo
          id={id}
          content={content}
          onClickUpdateButton={onClickUpdateButton}
          toggleEditable={toggleEditable}
        />
      ) : (
        <ReadonlyTodo
          id={id}
          content={content}
          onClickRemoveButton={onClickRemoveButton}
          toggleEditable={toggleEditable}
        />
      )}
    </>
  );
};

export default TodoWrapper;

function ReadonlyTodo({ id, content, toggleEditable, onClickRemoveButton }) {
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
}
