import { useState } from 'react';
import styles from '@styles/Home.module.css';
import { TodoType } from '@types';

interface EditableTodoProps extends TodoType {
  toggleEditable: () => void;
  onClickUpdateButton: (arg: TodoType) => void;
}

const EditableTodo: React.FC<EditableTodoProps> = ({
  id,
  content,
  toggleEditable,
  onClickUpdateButton,
}) => {
  const [newContent, setNewContent] = useState<string>(content);
  const onChangeContent = (e: React.ChangeEvent<HTMLInputElement>) => {
    const {
      target: { value },
    } = e;
    setNewContent(value);
  };
  const submitEditedTodo = (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => {
    e.preventDefault();
    toggleEditable();
    onClickUpdateButton({ id, content: newContent });
  };
  return (
    <>
      <form onSubmit={submitEditedTodo}>
        <input type='text' value={newContent} onChange={onChangeContent} />
      </form>
      <button onClick={submitEditedTodo} data-id={id} className={styles.button}>
        👌
      </button>
      <button onClick={toggleEditable} className={styles.button}>
        X
      </button>
    </>
  );
};

export default EditableTodo;
