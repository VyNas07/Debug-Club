import React from 'react'
import Header from '../HomePage/Header/Header'
import MainRegistration from '../RegistrationPage/MainRegistration/MainRegistration'
import Footer from '../HomePage/Footer/Footer'

const RegistrationPage = ({ setSenha, setEmail }) => {
  return (
    <div>
    <Header/>
    <MainRegistration setSenha={setSenha} setEmail={setEmail} />    
    <Footer/>
    </div>


  )
}

export default RegistrationPage

//