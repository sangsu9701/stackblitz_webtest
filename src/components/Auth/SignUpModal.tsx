import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { useAuth } from '../../contexts/AuthContext';

interface SignUpModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface SignUpFormData {
  name: string;
  company: string;
  username: string;
  password: string;
  confirmPassword: string;
  groupwareId: string;
}

const SignUpModal: React.FC<SignUpModalProps> = ({ isOpen, onClose }) => {
  const { signup } = useAuth();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<SignUpFormData>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const onSubmit = async (data: SignUpFormData) => {
    setIsLoading(true);
    setError(null);
    try {
      await signup({
        name: data.name,
        company: data.company,
        username: data.username,
        password: data.password,
        groupwareId: data.groupwareId,
      });
      onClose();
    } catch (err) {
      setError('회원가입에 실패했습니다. 다시 시도해주세요.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-md w-full">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">회원가입</h2>
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
              {...register('name', { required: '이름을 입력해주세요' })}
              type="text"
              placeholder="이름"
              className="input"
            />
            {errors.name && (
              <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
            )}
          </div>
          <div>
            <input
              {...register('company', { required: '회사명을 입력해주세요' })}
              type="text"
              placeholder="회사"
              className="input"
            />
            {errors.company && (
              <p className="text-red-500 text-sm mt-1">
                {errors.company.message}
              </p>
            )}
          </div>
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
          <div>
            <input
              {...register('confirmPassword', {
                required: '비밀번호를 확인해주세요',
                validate: (val: string) => {
                  if (watch('password') != val) {
                    return '비밀번호가 일치하지 않습니다';
                  }
                },
              })}
              type="password"
              placeholder="비밀번호 확인"
              className="input"
            />
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm mt-1">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
          <div>
            <input
              {...register('groupwareId', {
                required: '그룹웨어 아이디를 입력해주세요',
              })}
              type="text"
              placeholder="그룹웨어 아이디"
              className="input"
            />
            {errors.groupwareId && (
              <p className="text-red-500 text-sm mt-1">
                {errors.groupwareId.message}
              </p>
            )}
          </div>
          <button
            type="submit"
            className="btn btn-blue w-full"
            disabled={isLoading}
          >
            {isLoading ? '가입 중...' : '가입하기'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SignUpModal;