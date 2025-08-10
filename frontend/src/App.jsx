import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Layout from './layout/Layout';
import { routeIndex, routeProfile, routeSignIn, routeSignUp } from './helper/RouteName';
import Index from './pages/Index';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Profile from './pages/Profile';

function App() {



  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path={routeIndex}  element={<Layout />}>
            <Route index element={<Index />} /> 
            <Route path={routeProfile} element={<Profile />} /> 
          </Route>

          <Route path={routeSignIn} element={<SignIn />} />
          <Route path={routeSignUp} element={<SignUp />} />
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
