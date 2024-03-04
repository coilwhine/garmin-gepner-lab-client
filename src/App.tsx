import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import './App.scss'
import PrivacyStatementPage from './Components/PrivacyStatementPage/PrivacyStatementPage'
import LayOut from './Components/LayOut/LayOut'
import MainPage from './Components/MainPage/MainPage'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { firebaseAuth, firebaseDB } from './firebase-config'
import LoginPage from './Components/LoginPage/LoginPage'
import { useDispatch, useSelector } from 'react-redux'
import { AuthData, login, logout } from './App/authTokenSlice'
import CoursePage from './Components/CoursePage/CoursePage'
import { createLog } from './Utils/logs'
import LoadingPage from './Components/LoadingPage/LoadingPage'

function App() {
  const userData = useSelector((state: { authData: AuthData | null }) => state.authData);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user: any) => {
      if (user) {
        setLoading(false);
        console.log("User Is Loged");
        dispatch(login({ token: user.accessToken, email: user.email }));
      } else {
        setLoading(false);
        console.log("User Isn't Loged ");
        dispatch(logout());
      }
    });
  }, []);

  useEffect(() => {
    if (userData.isLogged) {
      createLog(firebaseDB, userData.email, `user ${userData.isLogged ? "loged in" : "loged out"}`);
    }
  }, [userData]);

  return (
    <div className='App'>

      <BrowserRouter>
        {
          loading ?

            <Routes>
              <Route path='/' element={<LayOut />}>
                <Route index element={<LoadingPage />} />
              </Route>
            </Routes>

            :

            <Routes>
              {userData.isLogged ? (
                <>
                  <Route path='/' element={<LayOut />}>
                    <Route index element={<MainPage />} />
                    <Route path='/course/:key' element={<CoursePage />} />

                    <Route path="/privacys-statement" element={<PrivacyStatementPage />} />
                    <Route path='/login' element={<Navigate to={"/"} replace />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
                </>
              ) : (
                <>
                  <Route path='/' element={<LayOut />}>
                    <Route index element={<Navigate to={"/login"} replace />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path="/privacys-statement" element={<PrivacyStatementPage />} />
                    <Route path="*" element={<ErrorPage />} />
                  </Route>
                </>
              )}

            </Routes>
        }
      </BrowserRouter>
    </div>
  )
}

export default App;
