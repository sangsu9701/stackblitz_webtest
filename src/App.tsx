import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import AccountManagement from './components/AccountManagement';
import ChatHistory from './components/ChatHistory';
import LLMModelSelection from './components/LLMModelSelection';
import FewShotManagement from './components/FewShotManagement';
import AgentManagement from './components/AgentManagement';
import QnA from './components/QnA';
import DataManagement from './components/DataManagement';
import LoginModal from './components/Auth/LoginModal';
import SignUpModal from './components/Auth/SignUpModal';
import { AuthProvider, useAuth } from './contexts/AuthContext';

function AppContent() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <Router>
      <div className="flex flex-col h-screen bg-gray-100">
        <Header
          onLoginClick={() => setIsLoginModalOpen(true)}
          user={user}
          onLogout={logout}
        />
        <main className="flex-1 overflow-auto p-6">
          <div className="max-w-7xl mx-auto">
            <Routes>
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/accounts" element={<AccountManagement />} />
              <Route path="/chat-history" element={<ChatHistory />} />
              <Route path="/llm-model" element={<LLMModelSelection />} />
              <Route path="/few-shot" element={<FewShotManagement />} />
              <Route path="/agent" element={<AgentManagement />} />
              <Route path="/qna" element={<QnA />} />
              <Route path="/data-management" element={<DataManagement />} />
            </Routes>
          </div>
        </main>
        <LoginModal
          isOpen={isLoginModalOpen}
          onClose={() => setIsLoginModalOpen(false)}
          onSignUpClick={() => {
            setIsLoginModalOpen(false);
            setIsSignUpModalOpen(true);
          }}
        />
        <SignUpModal
          isOpen={isSignUpModalOpen}
          onClose={() => setIsSignUpModalOpen(false)}
        />
      </div>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;