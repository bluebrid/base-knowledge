import React from "react";
import { Switch, Route } from "react-router-dom";
import { compose } from "react-apollo";
import TodoList from "../TodoList";
import TodoListFooter from "../../components/Footer";
import TodoTextInput from "../../components/Input";
import routes from "../../routes";
import {
  withTodos1,
  withTodos,
  withToggleAll,
  withCreateTodo,
  withDeleteTodos
} from "../../graphql";

class Layout extends React.Component {
  static propTypes = {
    // viewer: PropTypes.object.isRequired,
    // children: PropTypes.element.isRequired,
  };

  // constructor(props) {
  //   super(props)
  // }
  componentDidMount() {
    const clientID = window.localStorage.getItem("Linxiaowu66-Client-ID");
    this.props.subscribeTodoChanged(clientID);
  }

  _handleTextInputSave = text => {
    if (text.length !== 0) this.props.createTodo({ title: text });
  };

  _handleDeleteCompletedItems = items => {
    this.props.deleteTodos(items);
  };
  _handleMarkAll = numRemainingTodos => {
    const newStatus = numRemainingTodos !== 0;

    this.props.toggleAll(newStatus);
  };

  render() {
    const todos = this.props.todos.todos || [];
    const numRemainingTodos = todos.filter(x => !x.complete).length;
    return (
      <div>
        <section className="todoapp">
          <header className="header">
            <h1>todos</h1>
            <span>
              <input
                type="checkbox"
                checked={numRemainingTodos === 0}
                className="toggle-all"
                readOnly
              />
              <label onClick={() => this._handleMarkAll(numRemainingTodos)} />
            </span>

            <TodoTextInput
              autoFocus
              className="new-todo"
              onSave={this._handleTextInputSave}
              placeholder="What needs to be done?"
            />
          </header>

          <Switch>
            {routes.map((route, index) => (
              <Route
                key={index}
                onClick={() => alert(1)}
                path={route.path}
                exact
                render={props => <TodoList {...props} todoList={todos} />}
              />
            ))}
          </Switch>

          <TodoListFooter
            allTodoList={todos}
            deleteCompletedItems={this._handleDeleteCompletedItems}
          />
        </section>
        <footer className="info">
          <p>Double-click to edit a todo</p>
          <p>
            Created by the{" "}
            <a href="https://github.com/linxiaowu66">linxiaowu66</a>
          </p>
          <p>
            Part of <a href="http://todomvc.com">TodoMVC</a>
          </p>
        </footer>
      </div>
    );
  }
}
/**
 * conpose 返回一个函数
 * function compose() {
  var funcs = [];

  for (var _i = 0; _i < arguments.length; _i++) {
    funcs[_i] = arguments[_i];
  }

  var functions = funcs.reverse();
  return function () {
    var args = [];

    for (var _i = 0; _i < arguments.length; _i++) {
      args[_i] = arguments[_i];
    }

    var firstFunction = functions[0],
        restFunctions = functions.slice(1);
    var result = firstFunction.apply(null, args);
    restFunctions.forEach(function (fnc) {
      result = fnc.call(null, result);
    });
    return result;
  };
}
2. 将Layout 组建作为参数传递进入compose 返回的函数
3. 然后一个个的执行withTodos...等传入的参数， 而withTodos 是一个graphql 包裹过的函数，接收一个组件WrappedComponent作为参数
 var result = Object.assign(r, data || {});
          var name = operationOptions.name || 'data';
          var childProps = (_b = {}, _b[name] = result, _b);

          if (operationOptions.props) {
            var newResult = (_c = {}, _c[name] = result, _c.ownProps = props, _c);
            lastResultProps = operationOptions.props(newResult, lastResultProps);
            childProps = lastResultProps;
          }

          return createElement(WrappedComponent, __assign({}, props, childProps)); 
          // 创建了一个新的组件， 并且有新的props
          // 所以在组件中，可以通过props.todos直接访问data数据
  4. 通过createElement 生成了一个新的组件
  5. 新的组件就有了graphql 方法传递的props的对应的属性

  6. graphql 会根据Query mutation subscription 执行props方法时，返回不一样的结果，如下返回的包含mutate
   if (operationOptions.props) {
            var newResult = (_c = {}, _c[name] = mutate, _c[resultName] = result, _c.ownProps = props, _c);
            childProps = operationOptions.props(newResult);
          }
          这里执行props函数：传递的其实是一个newResult的对象参数：
          {
            mutate: ƒ (options)
            ownProps: {todos: {…}, subscribeTodoChanged: ƒ}
            result: {called: false, loading: false, error: undefined, client: ApolloClient}
 
          }
  7. graphql 方法里面的props 返回的是一个对象， 也就是HOC的新的属性
 */
export default compose(
  // withTodos1,
  withTodos,
  withCreateTodo,
  withToggleAll,
  withDeleteTodos
)(Layout);
