import React from "react"
import { Routes, Route } from "react-router-dom"
import LoginPage from "./pages/Login/LoginPage"
import NotFoundPage from "./pages/NotFound/NotFoundPage"
// import withPageTitle from "./components/withPageTitle/withPageTitle"

import RegisterPage from "./pages/Register/RegisterPage"
import AllTagsPage from "./pages/AllTagsPage/AllTagsPage"

// const Register = withPageTitle({
//   component: RegisterPage,
//   title: "Sign Up - Stack Overflow",
// })

const RoutesTree = () => {
  return (
    <Routes>
      <Route exact path='/tags' element={<AllTagsPage />} />
      <Route exact path='/register' element={<RegisterPage />} />
      <Route exact path='/login' element={<LoginPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  )
}

export default RoutesTree
