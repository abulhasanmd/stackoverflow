import React from "react"
import { Routes, Route } from "react-router-dom"
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
    </Routes>
  )
}

export default RoutesTree
