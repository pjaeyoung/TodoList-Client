import { useState } from 'react';
import styles from 'styles/Home.module.css';

export default function TodoInput({ addTodo }) {
  const [content, setContent] = useState('');
  const onSubmitTodo = (e) => {
    e.preventDefault();
    addTodo({ variables: { content } });
    setContent('');
  };

  const onChangeTodo = ({ target: { value } }) => {
    setContent(value);
  };

  return (
    <form onSubmit={onSubmitTodo}>
      <input
        className={styles.input}
        type='text'
        name='todo 입력'
        placeholder='새 할 일을 입력하세요....'
        value={content}
        onChange={onChangeTodo}
        autoComplete='off'
      />
    </form>
  );
}
