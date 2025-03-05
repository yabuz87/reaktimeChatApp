import React, { useEffect } from 'react';
import { useChatStore } from '../store/useChatStore';
import { LoaderCircle } from 'lucide-react';
import ChatHeader from './ChatHeader';
import MessageInput from './MessageInput';
import MessageSkeleton from './Skeletons/MessageSkeleton';
import { formatMessageTime } from '../libs/utils';
import { useAuthStore } from '../store/useAuthStore';

const ChatContainer = () => {
  const { isMessagesLoading, messages, getMessages, selectedUser } = useChatStore();
  const {authUser}=useAuthStore();

  useEffect(() => {
    if (selectedUser) {
      getMessages(selectedUser._id);
    }
    return undefined; // Explicitly return undefined
  }, [selectedUser, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex overflow-auto">
        <ChatHeader/>
        {/* <MessageSkeleton/> */}
        <div className="flex items-center justify-center h-screen">
        <LoaderCircle className="size-10  animate-spin" />
        <p> &nbsp; loading...</p>
        {/* <MessageInput/> */}
      </div>
        
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-auto">
      <ChatHeader />
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
            // ref={messageEndRef}
          >
            <div className=" chat-image avatar">
              <div className="size-10 rounded-full border">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilepic || "/avatar.png"
                      : selectedUser.profilepic || "/avatar.png"
                  }
                  alt="profile pic"
                />
              </div>
            </div>
            <div className="chat-header mb-1">
              <time className="text-xs opacity-50 ml-1">
                {formatMessageTime(message.createdAt)}
              </time>
            </div>
            <div className="chat-bubble flex flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="Attachment"
                  className="sm:max-w-[200px] rounded-md mb-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
