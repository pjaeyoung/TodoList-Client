import { useState } from 'react';

export default function Todo(props) {
  const [editable, setEditable] = useState(false);
  const toggleEditable = () => setEditable(!editable);
  return (
    <>
      {editable ? (
        <EditableTodo {...props} toggleEditable={toggleEditable} />
      ) : (
        <ReadonlyTodo {...props} toggleEditable={toggleEditable} />
      )}
    </>
  );
}

function ReadonlyTodo({ content, onClickRemoveButton, id, styles, toggleEditable }) {
  return (
    <>
      {content}
      <button onClick={onClickRemoveButton} data-id={id} className={styles.button}>
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

function EditableTodo({ onClickUpdateButton, id, content, toggleEditable, styles }) {
  const [newContent, setNewContent] = useState(content);
  const onChangeContent = ({ target: { value } }) => setNewContent(value);
  const submitEditedTodo = (e) => {
    e.preventDefault();
    toggleEditable();
    onClickUpdateButton({ id, content: newContent });
  };
  return (
    <>
      <form onSubmit={submitEditedTodo}>
        <input type="text" value={newContent} onChange={onChangeContent} />
      </form>
      <button onClick={submitEditedTodo} data-id={id} className={styles.button}>
        👌
      </button>
      <button onClick={toggleEditable} className={styles.button}>
        X
      </button>
    </>
  );
}
