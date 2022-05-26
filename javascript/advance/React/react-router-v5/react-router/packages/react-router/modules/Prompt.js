import React from "react";
import PropTypes from "prop-types";
import invariant from "tiny-invariant";

import Lifecycle from "./Lifecycle.js";
import RouterContext from "./RouterContext.js";

/**
 * The public API for prompting the user before navigating away from a screen.
 */
function Prompt({ message, when = true }) {
  return (
    <RouterContext.Consumer>
      {context => {
        invariant(context, "You should not use <Prompt> outside a <Router>");
        // 如果when 为false 则直接返回一个null 
        if (!when || context.staticContext) return null;
        // 当when 为true 的时候， 通过history.block 去注册一个block
        const method = context.history.block;

        return (
          <Lifecycle
            onMount={self => {
              /**
               * createTransitionManager 的setPropt 去注册了一个propt,并且返回了一个取消的方法
               *   function setPrompt(nextPrompt) {
                    warning(prompt == null, 'A history supports only one prompt at a time');

                    prompt = nextPrompt;

                    return () => {
                      if (prompt === nextPrompt) prompt = null;
                    };
                  }
                  // messsage 是一个函数
                  <Prompt
                    when={isBlocking}
                    message={location =>
                      `Are you sure you want to go to ${location.pathname}`
                    }
                  />
                  // Prompt 可以配合Router 的getUserConfirmation 使用，自定义弹出框
                  const getConfirmation = (message, callback) => {
                    const allowTransition = window.confirm(message + ';custom prop')
                    callback(allowTransition)
                  }
                  const PreventingTransitionsExample = () => (
                    <Router getUserConfirmation={getConfirmation}>
               */
              self.release = method(message);
            }}
            onUpdate={(self, prevProps) => {
              if (prevProps.message !== message) {
                self.release();
                self.release = method(message);
              }
            }}
            onUnmount={self => {
              self.release();
            }}
            message={message}
          />
        );
      }}
    </RouterContext.Consumer>
  );
}

if (__DEV__) {
  const messageType = PropTypes.oneOfType([PropTypes.func, PropTypes.string]);

  Prompt.propTypes = {
    when: PropTypes.bool,
    message: messageType.isRequired
  };
}

export default Prompt;
