import { useState } from 'react';
import { TodoType } from '@types';
import EditableTodo from './EditableTodo';
import ReadonlyTodo from './ReadonlyTodo';

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
