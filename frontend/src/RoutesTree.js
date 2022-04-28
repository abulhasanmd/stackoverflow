import React from "react"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login/LoginPage"
// import withPageTitle from "./components/withPageTitle/withPageTitle"

import RegisterPage from "./pages/Register/RegisterPage"

// const Register = withPageTitle({
//   component: RegisterPage,
//   title: "Sign Up - Stack Overflow",
// })

const RoutesTree = () => {
  return (
    <Routes>
      <Route exact path='/register' element={<RegisterPage />} />
      <Route exact path='/login' element={<LoginPage />} />
    </Routes>
  )
}

export default RoutesTree
