import { useState } from 'react';
import { TodoType } from '@types';
import styles from '@styles/Home.module.css';
import EditInput from './EditInput';

interface TodoProps extends TodoType {
  onClickRemoveButton: (e: React.MouseEvent<HTMLButtonElement>) => void;
  onClickUpdateButton: (arg: TodoType) => void;
}

const TodoWrapper: React.FC<TodoProps> = ({
  id,
  content: todoText,
  onClickRemoveButton,
  onClickUpdateButton,
}) => {
  const [editable, setEditable] = useState(false);
  const toggleEditable = () => setEditable(!editable);

  const [newContent, setNewContent] = useState(todoText);
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

  const content = editable ? (
    <EditInput
      content={newContent}
      onChangeContent={onChangeContent}
      submitEditedTodo={submitEditedTodo}
    />
  ) : (
    todoText
  );
  return (
    <>
      {content}
      <button
        onClick={editable ? submitEditedTodo : onClickRemoveButton}
        data-id={id}
        className={styles.button}
      >
        {editable ? '👌' : 'X'}
      </button>
      <button onClick={toggleEditable} className={styles.button}>
        {editable ? 'X' : '✏️'}
      </button>
    </>
  );
};

export default TodoWrapper;
