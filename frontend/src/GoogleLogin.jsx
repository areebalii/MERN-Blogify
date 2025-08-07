import React from 'react'
import { Button } from './components/ui/button'
import { FaGoogle } from "react-icons/fa";
import { signInWithPopup } from 'firebase/auth';
import { auth, provider } from './helper/firebase';
import { getEnv } from './helper/getenv';
import { showToast } from './helper/showToast';
import { useNavigate } from 'react-router-dom';
import { routeIndex } from './helper/RouteName';
import { setUser } from './redux/user/user.slice';
import { useDispatch } from 'react-redux';


const GoogleLogin = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate();
  const handleGoogleLogin = async () => {
    try {
      const googleResponse = await signInWithPopup(auth, provider)
      const user = googleResponse.user
      const bodyData = {
        name: user.displayName,
        email: user.email,
        avatar: user.photoURL
      }
      const response = await fetch(`${getEnv("VITE_API_BASE_URL")}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json", },
        credentials: "include",
        body: JSON.stringify(bodyData)
      })
      const data = await response.json();
      if (!response.ok) {
        return showToast("error", data.message)
      }
      dispatch(setUser(data.user))
      console.log("Login response:", data);
      navigate(routeIndex)
      showToast("success", data.message)
    } catch (error) {
      showToast("error", error.message)
    }
  }


  return (
    <Button variant="outline" className="w-full" onClick={handleGoogleLogin}>
      <FaGoogle />
      Continue with Google
    </Button>
  )
}

export default GoogleLogin