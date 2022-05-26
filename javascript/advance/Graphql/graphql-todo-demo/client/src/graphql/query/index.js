import gql from 'graphql-tag';

export const TODOS_QUERY = gql`
  query todosQuery {
    todos {
      id
      title
      complete
    }
  }
`;
export const TODOS_QUERY1 = gql`
  query todosQuery1 {
    todos1 {
      id
      title
      complete
    }
  }
`;
