import { gql } from '@apollo/client';

export default gql`
  mutation addTodo($content: String!) {
    addTodo(content: $content) {
      id
      content
    }
  }
`;
