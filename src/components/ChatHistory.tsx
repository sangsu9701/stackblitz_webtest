import React from 'react';
import useStore from '../store/useStore';

const ChatHistory: React.FC = () => {
  const { chatHistory, clearChatHistory } = useStore();

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-2xl font-semibold mb-6">채팅 기록</h2>
      {chatHistory.length === 0 ? (
        <p>채팅 기록이 없습니다.</p>
      ) : (
        <div>
          <ul className="space-y-2">
            {chatHistory.map((message, index) => (
              <li key={index} className="bg-gray-100 p-2 rounded">{message}</li>
            ))}
          </ul>
          <button
            onClick={clearChatHistory}
            className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200"
          >
            기록 삭제
          </button>
        </div>
      )}
    </div>
  );
};

export default ChatHistory;