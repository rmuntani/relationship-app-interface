import { BrowserRouter, Link, Route } from 'react-router-dom';
import React from 'react';
import { navigationBar, navigationButton } from './app.config';
import Match from './Match';
import ChatSelection from './ChatSelection';

export default function App() {
  return (
    <BrowserRouter>
      <Route path="/match" component={Match} />
      <Route path="/chat" component={ChatSelection} />

      <div style={{ ...navigationBar.style }}>
        <Link to="/match">
          <button
            style={{ ...navigationButton.style }}
            type="button"
          >
            Match!
          </button>
        </Link>
        <Link to="/chat">
          <button
            style={{ ...navigationButton.style }}
            type="button"
          >
            Chat!
          </button>
        </Link>
      </div>
    </BrowserRouter>
  );
}
