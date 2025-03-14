import { Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/Login/LoginPage.jsx";
import SignUpPage from "./pages/auth/Signup/SignUpPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import Sidebar from './components/common/Sidebar.jsx';
import RightPanel from "./components/common/RightPanel.jsx";


function App() {

  return (
    <div className="flex max-w-6xl mx-auto">
      {/* Common component, bc it's not wrapped with Routes */}
      <Sidebar />
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/login' element={<LoginPage />} />
        <Route exact path='/signup' element={<SignUpPage />} />
        <Route exact path='/notifications' element={<NotificationPage />} />
        <Route exact path='/profile/:username' element={<ProfilePage />} />
      </Routes>
      <RightPanel />
    </div>
  )
}

export default App
