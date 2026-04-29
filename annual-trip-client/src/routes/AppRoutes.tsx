import {Routes, Route, Navigate} from "react-router-dom";   
import LoginPage from "../pages/login/loginPage";
import AdminDashboard from "../pages/adminDashboard/AdminDashboard";
import TeacherDashboard from "../pages/teacherDashboard/TeacherDashboardPage";
import MapPage from "../pages/map/MapPage";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
            <Route path="/teacher/map" element={<MapPage />} />
        </Routes>
    );
}

export default AppRoutes;