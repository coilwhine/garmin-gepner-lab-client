import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.scss'
import PrivacyStatementPage from './Components/PrivacyStatementPage/PrivacyStatementPage'
import LayOut from './Components/LayOut/LayOut'
import MainPage from './Components/MainPage/MainPage'
import ErrorPage from './Components/ErrorPage/ErrorPage'
import { useEffect } from 'react'
import authService from './Services/auth-service'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayOut />}>
        <Route index element={<MainPage />} />

        <Route path="/privacys-statement" element={<PrivacyStatementPage />} />
        <Route path="*" element={<ErrorPage />} />
      </Route>
    )
  )

  useEffect(() => {
    authService.monitorAuthState();
  }, [])

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
