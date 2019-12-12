import React from 'react';
import { useApolloClient, useMutation } from '@apollo/react-hooks';
import gql from 'graphql-tag';

import { LoginForm, Loading } from '../components';

export const LOGIN_USER = gql`
  mutation login($email: String!) {
    login(email: $email)
  }
`;

export default function Login() {
  const client = useApolloClient();
  /*
  function useMutation(mutation, options) {
  var context = useContext(getApolloContext());

  var _a = useState({
    called: false,
    loading: false
  }),
      result = _a[0],
      setResult = _a[1];

  var updatedOptions = options ? __assign({}, options, {
    mutation: mutation
  }) : {
    mutation: mutation
  };
  var mutationDataRef = useRef();

  function getMutationDataRef() {
    if (!mutationDataRef.current) {
      mutationDataRef.current = new MutationData({
        options: updatedOptions,
        context: context,
        result: result,
        setResult: setResult
      });
    }

    return mutationDataRef.current;
  }

  var mutationData = getMutationDataRef();
  mutationData.setOptions(updatedOptions);
  mutationData.context = context;
  useEffect(function () {
    return mutationData.afterExecute();
  });
  return mutationData.execute(result);
}
  useMutation 方法最终会执行：  return mutationData.execute(result);
  */
  // 这里返回的login 就是runMutation 
  /**
   *  onSubmit = event => {
    event.preventDefault();
    this.props.login({ variables: { email: this.state.email } });
  };
   */
  /**
   *  _this.runMutation = function (mutationFunctionOptions) {
      if (mutationFunctionOptions === void 0) {
        mutationFunctionOptions = {};
      }

      _this.onMutationStart();

      var mutationId = _this.generateNewMutationId();

      return _this.mutate(mutationFunctionOptions).then(function (response) {
        _this.onMutationCompleted(response, mutationId);

        return response;
      }).catch(function (error) {
        _this.onMutationError(error, mutationId);

        if (!_this.getOptions().onError) throw error;
      });
    };
   */
  const [login, { loading, error }] = useMutation(
    LOGIN_USER,
    {
      onCompleted({ login }) {
        /**
         *   MutationData.prototype.onMutationCompleted = function (response, mutationId) {
              var _a = this.getOptions(),
                  onCompleted = _a.onCompleted,
                  ignoreResults = _a.ignoreResults;

              var data = response.data,
                  errors = response.errors;
              var error = errors && errors.length > 0 ? new ApolloError({
                graphQLErrors: errors
              }) : undefined;

              var callOncomplete = function callOncomplete() {
                return onCompleted ? onCompleted(data) : null;
              };

              if (this.isMostRecentMutation(mutationId) && !ignoreResults) {
                this.updateResult({
                  called: true,
                  loading: false,
                  data: data,
                  error: error
                });
              }

              callOncomplete();
            };
         */
        localStorage.setItem('token', login);
        // 会重新渲染组件
        client.writeData({ data: { isLoggedIn: true } });
      }
    }
  );

  if (loading) return <Loading />;
  if (error) return <p>An error occurred</p>;

  return <LoginForm login={login} />;
}
