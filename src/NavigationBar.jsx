import { Link } from 'react-router-dom';
import React from 'react';
import { navigationBar, navigationButton } from './app.config';

export default function NavigationBar() {
  return (
    <div style={{ ...navigationBar.style }}>
      <Link to="/">
        <button style={{ ...navigationButton.style}}>Match!</button>
      </Link>
      <Link to="/">
        <button style={{ ...navigationButton.style}}>Chat!</button>
      </Link>
    </div>
  );
}
