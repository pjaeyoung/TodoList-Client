import { useState } from 'react';

// editable 상태에 따라 보여줄 컴포넌트 제어용도, container
// UI container
// todos map 을 여기서!
// 커스텀 훅 useTodos : props 여러 번 내리지 않게 함 , caching 
// state가 많아지면 memory leak 발생 가능성 존재 
// 렌더링을 최소화할 수 있는 구간이 어딜 지 고민해보기!
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

// presentational component
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
