import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.scss'
import PrivacyStatementPage from './Components/PrivacyStatementPage/PrivacyStatementPage'
import LayOut from './Components/LayOut/LayOut'
import MainPage from './Components/MainPage/MainPage'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import { useEffect } from 'react'
import { User, onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth } from './firebase-config'
import LoginPage from './Components/LoginPage/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { login, logout } from './App/authTokenSlice'

function App() {
  const userData = useSelector((state: { authData: User | null }) => state.authData);
  const dispatch = useDispatch();

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayOut />}>
        <Route index element={userData ? <MainPage /> : <LoginPage />} />

        <Route path="/privacys-statement" element={<PrivacyStatementPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  )

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, user => {
      if (user) {
        console.log("User Is Loged");
        dispatch(login(user));
      } else {
        console.log("User Isn't Loged ");
        dispatch(logout());
      }
    })
  }, [])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
