import { BrowserRouter, Link, Route } from 'react-router-dom';
import React from 'react';
import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { navigationBar, navigationButton } from '../configs/app.config';
import Chat from '../containers/Chat';
import Match from '../containers/Match';
import { app } from '../configs/app.text';
import relationship from '../reducers';
import { chatWithUser } from '../actions';

export default function App() {
  const baseState = {
    consultAPI: {
      suggestions: [],
      error: '',
      success: null,
      userIndex: 0,
    },
    profileInteraction: {
      imageIndex: 0,
      showDescription: false,
    },
    match: {
      open: false,
      user: {},
    },
    chat: {
      error: '',
      matchedUsers: [],
      success: null,
      userIndex: null,
    },
    messages: {},
  };
  const store = createStore(relationship, baseState, applyMiddleware(thunkMiddleware));

  const resetChat = () => {
    store.dispatch(chatWithUser(null));
  };

  return (
    <BrowserRouter>
      <Provider store={store}>
        <Route path="/match" component={Match} />
        <Route path="/chat" component={Chat} />

        <div style={{ ...navigationBar.style }}>
          <Link to="/match">
            <button
              onClick={resetChat}
              style={{ ...navigationButton.style }}
              type="button"
            >
              {app.match}
            </button>
          </Link>
          <Link to="/chat">
            <button
              onClick={resetChat}
              style={{ ...navigationButton.style }}
              type="button"
            >
              {app.chat}
            </button>
          </Link>
        </div>
      </Provider>
    </BrowserRouter>
  );
}
