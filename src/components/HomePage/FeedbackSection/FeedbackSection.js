import React from 'react'
import cincoEstrelas from '../../../assets/IMG-HomePage/5estrelas.svg';
import quatro_meioEstrelas from '../../../assets/IMG-HomePage/4meioestrelas.svg';
import quatroEstrelas from '../../../assets/IMG-HomePage/4estrelas.svg';
import tres_meioEstrelas from '../../../assets/IMG-HomePage/3estrelasmeio.svg';
import userImg from '../../../assets/IMG-HomePage/user.svg';

const FeedbackSection = () => {
const perfis = [ 
    {
        nome: "João Gomes",
        profissao: "Desenvolvedor de Software",
        descricao: "“O DebugClub me ajudou a praticar minhas habilidades e colaborar com grandes projetos de código aberto. Além disso, o sistema de pontos motiva a continuar contribuindo!”",
        avaliacao: cincoEstrelas,
    },
    {
        nome: "Ana Costa",
        profissao: "Engenheiro DevOps",
        descricao: "“A interface do DebugClub é intuitiva e o sistema de gamificação realmente motiva a continuar. Recomendo a todos que queiram contribuir com projetos open-source.”",
        avaliacao: quatro_meioEstrelas,
    },
    {
        nome: "Pedro Almeida",
        profissao: "Estudante",
        descricao: "“Gostei bastante da plataforma, especialmente da gamificação. Só sinto falta de mais funcionalidades para acompanhar o progresso de maneira detalhada.”",
        avaliacao: quatroEstrelas,
    },
    {
        nome: "Carla Souza",
        profissao: "Tester",
        descricao: "“O DebugClub tem um bom conceito e uma interface interessante, mas algumas áreas ainda podem melhorar, como a usabilidade e a navegação entre projetos.”",
        avaliacao: tres_meioEstrelas,
    },
    {
        nome: "Felipe Lima",
        profissao: "Desenvolvedor Backend",
        descricao: "“Gostei bastante da plataforma, especialmente da gamificação. Só sinto falta de mais funcionalidades para acompanhar o progresso de maneira detalhada.”",
        avaliacao: quatroEstrelas,
    },
    {
        nome: "Maria Clara",
        profissao: "Desenvolvedor Mobile",
        descricao: "“Melhor plataforma para quem quer começar com código aberto! O sistema de gamificação é viciante, e já consegui várias conquistas. Super recomendo!”",
        avaliacao: cincoEstrelas,
    },
]
  return (
    <section className = 'feedback-section'>
      <h2>O que os usuários estão divulgando</h2>
      <div className='conteiner-feedback'>
        {perfis.map((perfil, index ) => 
        <div key = {index} className='user-feedback'>
            <img src= {userImg} alt = {perfil.nome} className = 'user-img'/>
            <h4>{perfil.nome}</h4>
            <h5>{perfil.profissao}</h5>
            <p>{perfil.descricao}</p>
            <img src={perfil.avaliacao} alt = 'avaliações' className = "avaliacao-img"/>
        </div>)}
      </div>
    </section>
  )
}

export default FeedbackSection
