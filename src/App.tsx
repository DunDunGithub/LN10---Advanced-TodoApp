import React, { useEffect, useState } from "react";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import TodoList from "./TodoList";
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import SignIn from './TodoList/components/SignIn';

import { useAuth } from "./auth/AuthContext";

const App: React.FC = () => {

  const { isAuthenticated, login, logout } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuthentication = async () => {
      // Kiểm tra xem có accessToken trong localStorage không
      const storedToken = localStorage.getItem('token');

      if (storedToken) {
        login(storedToken);
      } else {
        // Không có token trong localStorage, đăng xuất
        logout();
      }
      // Đánh dấu rằng quá trình kiểm tra đã hoàn thành
      setLoading(false);
    };

    checkAuthentication();
  }, [login, logout]);


  if (loading) {
    // Hiển thị thông báo đang kiểm tra xác thực
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<SignIn />} />
        <Route
          path="/todo"
          element={isAuthenticated ? <TodoList /> : <Navigate to="/login" replace />}
        />
      </Routes>
    </Router>
  );
};

export default App;
