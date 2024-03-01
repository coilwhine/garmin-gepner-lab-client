import { Navigate, Outlet, Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.scss'
import PrivacyStatementPage from './Components/PrivacyStatementPage/PrivacyStatementPage'
import LayOut from './Components/LayOut/LayOut'
import MainPage from './Components/MainPage/MainPage'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import { useEffect } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth, firebaseDB } from './firebase-config'
import LoginPage from './Components/LoginPage/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { AuthData, login, logout } from './App/authTokenSlice'
import CoursePage from './Components/CoursePage/CoursePage'
import { createLog } from './Utils/logs'

function App() {
  const userData = useSelector((state: { authData: AuthData | null }) => state.authData);
  const dispatch = useDispatch();

  function PrivateRoute() {
    return userData.isLoged ? <Outlet /> : <Navigate to="/login" replace />;
  }

  function AnonymousRoute() {
    return userData.isLoged ? <Navigate to="/" replace /> : <Outlet />;
  }

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayOut />}>
        <Route path="/privacys-statement" element={<PrivacyStatementPage />} />

        <Route path="/" element={<PrivateRoute />}>
          <Route index element={<MainPage />} />
          <Route path='/course/:key' element={<CoursePage />} />
        </Route>

        <Route element={<AnonymousRoute />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>

        <Route path="*" element={<ErrorPage />} />

      </Route>
    )
  )

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user: any) => {
      if (user) {
        console.log("User Is Loged");
        dispatch(login({ token: user.accessToken, email: user.email }));
      } else {
        console.log("User Isn't Loged ");
        dispatch(logout());
      }
    })
  }, []);

  useEffect(() => {
    if (userData.isLoged) {
      createLog(firebaseDB, userData.email, `user ${userData.isLoged ? "loged in" : "loged out"}`);
    }
  }, [userData])


  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
