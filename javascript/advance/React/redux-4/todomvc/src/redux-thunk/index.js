function createThunkMiddleware(extraArgument) {
    return ({ dispatch, getState }) => (next) => (action) => {
        if (typeof action === 'function') { // 异步就是action 是一个function , 并且传递了dispatch , getState, extraArgument, 可以在action 做完异步操作之后才执行dispatch 函数
            return action(dispatch, getState, extraArgument);
        }

        return next(action);
    };
}

const thunk = createThunkMiddleware();
thunk.withExtraArgument = createThunkMiddleware;

export default thunk;