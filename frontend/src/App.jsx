import { Navigate, Route, Routes } from "react-router-dom";

import LoginPage from "./pages/auth/Login/LoginPage.jsx";
import SignUpPage from "./pages/auth/Signup/SignUpPage.jsx";
import HomePage from "./pages/home/HomePage.jsx";
import NotificationPage from "./pages/notification/NotificationPage.jsx";
import ProfilePage from "./pages/profile/ProfilePage.jsx";

import Sidebar from './components/common/Sidebar.jsx';
import RightPanel from "./components/common/RightPanel.jsx";

import { Toaster } from "react-hot-toast";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "./components/common/LoadingSpinner.jsx";


function App() {

  const { data: authUser, isLoading } = useQuery({
    // we use queryKey to give a unique name to our query and refer to it later
    queryKey: ["authUser"],
    queryFn: async () => {
      try {
        const res = await fetch("/api/auth/me");
        const data = await res.json();
        if (data.error) return null;
        if (!res.ok) { // or can write if(data.error)
          throw new Error(data.error || "Something went wrong");
        }
        return data;
      } catch (error) {
        console.log(error);
        throw error;
      }
    },
    retry: false, // only retry's once and reduces the loading time which we were getting when we were not login and reloading the page
  });

  if (isLoading) {
    return (
      <div className="h-screen flex justify-center items-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  return (
    <div className="flex max-w-6xl mx-auto">
      {/* Common component, bc it's not wrapped with Routes */}
      {authUser && <Sidebar />}
      <Routes>
        <Route exact path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route exact path='/login' element={!authUser ? <LoginPage /> : <Navigate to="/" />} />
        <Route exact path='/signup' element={!authUser ? <SignUpPage /> : <Navigate to="/" />} />
        <Route exact path='/notifications' element={authUser ? <NotificationPage /> : <Navigate to="/login" />} />
        <Route exact path='/profile/:username' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
      {authUser && <RightPanel />}
      <Toaster />
    </div>
  )
}

export default App
