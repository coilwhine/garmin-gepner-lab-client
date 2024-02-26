import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import './App.css'
import PrivacyStatementPage from './Components/PrivacyStatementPage/PrivacyStatementPage'
import LayOut from './Components/LayOut/LayOut'
import MainPage from './Components/MainPage/MainPage'

function App() {

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path='/' element={<LayOut />}>
        <Route index element={<MainPage />} />

        <Route path="/privacys-tatement" element={<PrivacyStatementPage />} />
        <Route path="*" element={<div>ERROR</div>} />
      </Route>
    )
  )

  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
  )
}

export default App
