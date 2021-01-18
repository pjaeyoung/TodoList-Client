import { gql } from '@apollo/client';

export default gql`
  mutation removeTodo($id: String!) {
    removeTodo(id: $id)
  }
`;
