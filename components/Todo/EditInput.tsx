interface EditInputProps {
  content: string;
  submitEditedTodo: (
    e: React.FormEvent<HTMLFormElement> | React.MouseEvent<HTMLButtonElement>,
  ) => void;
  onChangeContent: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const EditInput: React.FC<EditInputProps> = ({
  content,
  submitEditedTodo,
  onChangeContent,
}) => {
  return (
    <form onSubmit={submitEditedTodo}>
      <input type='text' value={content} onChange={onChangeContent} />
    </form>
  );
};

export default EditInput;
