import { BrowserRouter, Link, Route } from 'react-router-dom';
import React from 'react';
import { navigationBar, navigationButton } from '../configs/app.config';
import Chat from './Chat';
import Match from './Match';
import { app } from '../configs/app.text';

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/match" component={Match} />
      <Route path="/chat" component={Chat} />

      <div style={{ ...navigationBar.style }}>
        <Link to="/match">
          <button
            style={{ ...navigationButton.style }}
            type="button"
          >
            {app.chat}
          </button>
        </Link>
        <Link to="/chat">
          <button
            style={{ ...navigationButton.style }}
            type="button"
          >
            {app.match}
          </button>
        </Link>
      </div>
    </BrowserRouter>
  );
}
