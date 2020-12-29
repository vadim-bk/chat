import React, { useCallback, useContext, useEffect, useState } from 'react';

import { useSocket } from './SocketProvider';
import { useContacts } from './ContactsProvider';
import useLocalStorage from '../hooks/useLocalStorage';

const ConversationsContext = React.createContext();

export const useConversations = () => {
  return useContext(ConversationsContext);
};

export const ConversationsProvider = ({ id, children }) => {
  const socket = useSocket();
  const { contacts } = useContacts();
  const [conversations, setConversations] = useLocalStorage('conversations', []);
  const [selectedConversationIndex, setSelectedConversationIndex] = useState(0);

  const createConversation = (recipients) => {
    setConversations((prev) => [...prev, { recipients, messages: [] }]);
  };

  const arrayEquality = (a, b) => {
    if (a.length !== b.length) return false;

    a.sort();
    b.sort();

    return a.every((el, i) => {
      return el === b[i];
    });
  };

  const addMessageToConversation = useCallback(
    ({ recipients, text, sender }) => {
      setConversations((prev) => {
        let madeChange = false;
        const newMessage = { sender, text };
        const newConversations = prev.map((conversation) => {
          if (arrayEquality(conversation.recipients, recipients)) {
            madeChange = true;
            return { ...conversation, messages: [...conversation.messages, newMessage] };
          }

          return conversation;
        });

        if (madeChange) {
          return newConversations;
        } else {
          return [...prev, { recipients, messages: [newMessage] }];
        }
      });
    },
    [setConversations]
  );

  useEffect(() => {
    if (socket == null) return;
    socket.on('receive-message', addMessageToConversation);
    return () => socket.off('receive-message');
  }, [socket, addMessageToConversation]);

  const sendMessage = (recipients, text) => {
    socket.emit('send-message', { recipients, text });
    addMessageToConversation({ recipients, text, sender: id });
  };

  const formattedConversations = conversations.map((conversation, i) => {
    const recipients = conversation.recipients.map((recipient) => {
      const contact = contacts.find((contact) => {
        return contact.id === recipient;
      });
      const name = (contact && contact.name) || recipient;
      return { id: recipient, name };
    });

    const messages = conversation.messages.map((message) => {
      const contact = contacts.find((contact) => {
        return contact.id === message.sender;
      });
      const name = (contact && contact.name) || message.sender;
      const fromMe = id === message.sender;

      return { ...message, sendName: name, fromMe };
    });

    const selected = i === selectedConversationIndex;
    return { ...conversations, messages, recipients, selected };
  });

  const value = {
    conversations: formattedConversations,
    selectedConversation: formattedConversations[selectedConversationIndex],
    selectConversationIndex: setSelectedConversationIndex,
    createConversation,
    sendMessage,
  };

  return <ConversationsContext.Provider value={value}>{children}</ConversationsContext.Provider>;
};
