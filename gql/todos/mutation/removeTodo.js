import { gql } from '@apollo/client';

export default gql`
  mutation removeTodo($id: Int!) {
    removeTodo(id: $id)
  }
`;
