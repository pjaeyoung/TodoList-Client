import { gql } from '@apollo/client';

export default gql`
  mutation updateTodo($id: String!, $content: String!) {
    updateTodo(id: $id, content: $content) {
      id
      content
    }
  }
`;
