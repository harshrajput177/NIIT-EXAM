import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import AdminLogin from "./Component/LoginReg/AdminLoginPage";
import RegisterPage from "./Component/LoginReg/RegisterPage";
import DetailPage from "./Component/DetailPage/DetailPage";
import AllUsers from "./Component/DetailPage/AllUsers";
import QuizQuestion from "./Component/QuestionPage/quizepage";
import LoginPage from "./Component/LoginReg/LoginPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/AdminLogin" element={<AdminLoginWrapper />} />
        <Route path="/Register-user-by-admin" element={<RegisterPage />} />
        <Route path="/DetailPage" element={<DetailPage />} />
        <Route path="/users" element={<AllUsers />} />
        <Route path="/QuizePage" element={<QuizQuestion />} />
        <Route path="/" element={<LoginPage />} />
      </Routes>
    </BrowserRouter>
  );
}

// ✅ Wrapper banaya jisme navigate ka use hoga
function AdminLoginWrapper() {
  const navigate = useNavigate();

  const handleAdminLogin = () => {
    navigate("/Register-user-by-admin"); // admin login hone ke baad yaha redirect
  };

  return <AdminLogin onAdminLogin={handleAdminLogin} />;
}

export default App;
