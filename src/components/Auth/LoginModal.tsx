import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSignUpClick: () => void;
}

interface LoginFormData {
  username: string;
  password: string;
}

const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onSignUpClick,
}) => {
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: LoginFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await login(data.username, data.password);
      onClose();
    } catch (err) {
      setError('로그인에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">로그인</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700"
          >
            <X size={24} />
          </button>
        </div>
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
            <span className="block sm:inline">{error}</span>
          </div>
        )}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <input
              {...register('username', { required: '아이디를 입력해주세요' })}
              type="text"
              placeholder="아이디"
              className="input"
            />
            {errors.username && (
              <p className="text-red-500 text-sm mt-1">
                {errors.username.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('password', { required: '비밀번호를 입력해주세요' })}
              type="password"
              placeholder="비밀번호"
              className="input"
            />
            {errors.password && (
              <p className="text-red-500 text-sm mt-1">
                {errors.password.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-blue w-full"
            disabled={isLoading}
          >
            {isLoading ? '로그인 중...' : '로그인'}
          </button>
        </form>
        <div className="mt-4 text-center">
          <button className="text-blue-500 hover:underline">
            비밀번호를 잊으셨나요?
          </button>
        </div>
        <div className="mt-6 text-center">
          <p>
            계정이 없으신가요?{' '}
            <button
              onClick={onSignUpClick}
              className="text-blue-500 hover:underline"
            >
              가입하기
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;