import * as React from 'react';
import { Query } from 'react-apollo';
import { GET_CURRENT_USER } from '../queries';


const withSession = (Component: any) => (props: any) => (
  <Query query={GET_CURRENT_USER}>
    {
      ({ loading, data, refetch }) => {
        if (loading) {
          return null
        }

        console.log(data)

        return (
          <Component {...props} refetch={refetch} session={data} />
        );

      }
    }
  </Query>
)

export default withSession;