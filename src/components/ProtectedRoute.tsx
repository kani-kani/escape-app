import { Navigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { type RootState } from '../app/store';
import { type ReactNode } from 'react';

interface ProtectedRouteProps {
  children: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {

  const isLoggedIn = useSelector((state: RootState) => state.user.isLoggedIn);

  if (!isLoggedIn) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
}
