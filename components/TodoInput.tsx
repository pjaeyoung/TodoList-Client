import { Dispatch, SetStateAction, useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_TODO } from '@gql';
import styles from 'styles/Home.module.css';
import { TodoType } from '@types';

interface TodoInputProps {
  setTodos: Dispatch<SetStateAction<TodoType[]>>;
}

const TodoInput: React.FC<TodoInputProps> = ({ setTodos }) => {
  const [addTodo] = useMutation<{ addTodo: TodoType }, { content: string }>(
    ADD_TODO,
    {
      update: (cache, { data: { addTodo: newTodo } }) => {
        cache.modify({
          id: cache.identify(newTodo),
          fields: {
            todo(cachedTodos: TodoType[]) {
              return [...cachedTodos, newTodo];
            },
          },
        });
        setTodos((prev) => [...prev, newTodo]);
      },
    },
  );
  const [content, setContent] = useState<string>('');
  const onSubmitTodo = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    addTodo({ variables: { content } });
    setContent('');
  };

  const onChangeTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const {
      target: { value },
    } = e;
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
};

export default TodoInput;
