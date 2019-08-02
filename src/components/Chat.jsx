import React, { useState } from 'react';
import ChatSelection from './ChatSelection';
import ChatScreen from './ChatScreen';

export default function Chat() {
  const [chatWith, setChatWith] = useState({ user: null });

  const openUserChat = (user) => {
    setChatWith(user);
  };

  if (chatWith.user !== null) {
    return (<ChatScreen {...chatWith} />);
  }

  return (<ChatSelection onItemClick={openUserChat} />);
}
