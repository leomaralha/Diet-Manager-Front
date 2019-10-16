import React, { Component } from 'react'
import './loginComponent.css'
import logo from '../../assets/nutri-logo.png'
import api from '../../services/api'



export default class loginComponent extends Component {

    constructor(props) {
        super(props)
        this.state = { senha: '', email: '' }
        this.onFormEmailChange = this.onFormEmailChange.bind(this)
        this.onFormSenhaChange = this.onFormSenhaChange.bind(this)
        this.handleSubmit = this.handleSubmit.bind(this)
        this.history = props.history
        this.doLogin = this.doLogin.bind(this)
    }

    onFormEmailChange(event) {
        this.setState({ email: event.target.value })
    }
    onFormSenhaChange(event) {
        this.setState({ senha: event.target.value })
    }

    async doLogin(){

        let response = await api.post('/cliente/logar', {
            email: this.state.email,
            senha: this.state.senha
        })

        if(response.data.error){
            alert(`Ocorreu um erro: ${response.data.msg}`)
            return
        }

        const cliente = response.data.data

        localStorage.setItem('nome',cliente.nome)
        localStorage.setItem('email',cliente.email)
        localStorage.setItem('senha',cliente.senha)
        localStorage.setItem('uid', cliente._id)

        alert(`Seja bem vindo ${cliente.nome}`)

        this.history.push('/home')

    }

    async handleSubmit(event) {
        event.preventDefault()
        let response = await api.post("/cliente/validate/email",{
            senha: this.state.senha, 
            email: this.state.email
        })
        console.log(response)
        if (response.data.error !== 0) {
            alert("Houve um problema")
            return
        }
        if (!response.data.emailIsValid) {
            const formEmail = document.getElementById("email")
            
            formEmail.classList.add("error-shadow")
            formEmail.setAttribute("placeholder", "EMAIL INVALIDO")
            formEmail.onfocus = event => {
                
                event.target.classList.remove("error-shadow")
                event.target.setAttribute("placeholder", "Seu e-mail")
                event.target.setAttribute("onfocus", "")
                
            }

        }
        
        localStorage.setItem("email",this.state.email)
        localStorage.setItem("senha", this.state.senha)
        this.history.push("/cliente/cadastro")
        return

    }

    removeRedMarkUp(event) {
        event.target.classList.remove("error-shadow")
    }

    render() {
        return (<div className="container">
            <div className="container-header">
                <img src={logo} alt="logo da nutrição" />
                <h3>Diet Manager</h3>
            </div>
            <div className="content">
                <p>Crie sua conta e inicie <strong>agora</strong> sua dieta personalizada</p>
                <form onSubmit={this.handleSubmit}>
                    <label htmlFor="email">E-mail *</label>
                    <input
                        type="text"
                        placeholder='Seu e-mail'
                        id='email'
                        onChange={this.onFormEmailChange}
                        onFocus={this.removeRedMarkUp}
                        value={this.state.login}
                    />
                    <label htmlFor="senha">Senha *</label>
                    <input
                        type="password"
                        id='senha'
                        onChange={this.onFormSenhaChange}
                        value={this.state.senha}
                    />
                    <button className='btn' type='submit'>Cadastrar</button>
                    <button 
                    id='btn-login'
                    className='btn'
                    onClick ={this.doLogin}
                    >Login</button>
                </form>
            </div>
        </div>)
    }

}