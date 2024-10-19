import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  BarChart2,
  Users,
  MessageSquare,
  Database,
  Zap,
  Bot,
  HelpCircle,
  FileText,
  LogOut,
} from 'lucide-react';

interface HeaderProps {
  onLoginClick: () => void;
  user: { name: string } | null;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({
  onLoginClick,
  user,
  onLogout,
}) => {
  const location = useLocation();

  const menuItems = [
    { id: 'dashboard', label: '대시보드', icon: BarChart2, path: '/dashboard' },
    { id: 'accounts', label: '계정 관리', icon: Users, path: '/accounts' },
    { id: 'chatHistory', label: 'History', icon: MessageSquare, path: '/chat-history' },
    { id: 'llmModel', label: 'LLM 모델', icon: Database, path: '/llm-model' },
    { id: 'fewShot', label: 'Few-shot', icon: Zap, path: '/few-shot' },
    { id: 'agent', label: 'Agent', icon: Bot, path: '/agent' },
    { id: 'dataManagement', label: '데이터 관리', icon: FileText, path: '/data-management' },
    { id: 'qna', label: 'QnA', icon: HelpCircle, path: '/qna' },
  ];

  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center">
            <Link to="/" className="flex items-center">
              <img
                className="w-auto"
                src="https://www.aekyung.co.kr/img/front/main/header_logo_bk.png"
                alt="AKee Logo"
              />
              <span className="ml-2 text-xl font-bold text-gray-900">AKee</span>
            </Link>
          </div>
          <nav className="flex space-x-4">
            {menuItems.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`flex items-center px-3 py-2 rounded-md text-xs font-medium ${
                  location.pathname === item.path
                    ? 'text-blue-600 bg-blue-100'
                    : 'text-gray-600 hover:text-blue-600 hover:bg-blue-50'
                }`}
              >
                <item.icon className="w-5 h-5 mr-2" />
                <span className="hidden sm:inline">{item.label}</span>
              </Link>
            ))}
          </nav>
          {user ? (
            <div className="flex items-center">
              <span className="mr-4">{user.name}님 환영합니다</span>
              <button
                onClick={onLogout}
                className="flex items-center bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-red-600 transition duration-150 ease-in-out"
              >
                <LogOut className="w-4 h-4 mr-2" />
                로그아웃
              </button>
            </div>
          ) : (
            <button
              onClick={onLoginClick}
              className="bg-blue-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-600 transition duration-150 ease-in-out"
            >
              로그인
            </button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;