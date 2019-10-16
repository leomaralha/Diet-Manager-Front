import React, { Component } from 'react'
import './clienteCadastro.css'
import logo from '../../assets/nutri-logo.png'
import api from '../../services/api'

const DEFAULT_STATE = {
    nome: "",
    peso: "",
    dataNascimento: "",
    altura: "",
    percetualDegordura: "",
}

export default class ClienteCadastro extends Component {
    constructor(props) {
        super(props)
        this.state = DEFAULT_STATE
        this.validarInputFields = this.validarInputFields.bind(this)
        this.submitData = this.submitData.bind(this)
    }

    validarInputFields() {

        let emptyFields = []
        for (let key in this.state) {
            if (this.state[key] === "") {
                emptyFields.push(key)
            }
        }
        if (!emptyFields) alert("Preencha todos os campos")

        for (let field of emptyFields) {
            const form = document.getElementById(field)

            form.classList.add("error-shadow")
            form.setAttribute("placeholder", "Preencha o campo")
            form.onfocus = event => {

                event.target.classList.remove("error-shadow")
                event.target.setAttribute("onfocus", "")

            }
        }
        return !!emptyFields.length

    }

    async submitData(event) {
        debugger;
        event.preventDefault()
        let hasEmptyField  = this.validarInputFields()
        if (hasEmptyField) return
        let data = { ...this.state }
        data.email = localStorage.getItem("email")
        data.senha = localStorage.getItem("senha")
        if (!(data.email && data.senha)) {
            alert("Erro: Login ou senha não definido.")
            this.props.history.push("/")
            return
        }
        localStorage.removeItem("email")
        localStorage.removeItem("senha")
        let response = await api.post('/cliente/criar', data)

        if (!response === 'OK') {
            alert("Erro: Login ou senha não definido.")
            return
        }
        localStorage.setItem("clienteId", response.data.cliente._id)
        alert("Logado com sucesso")
        this.props.history.push("somePage")
    }

    render() {
        return (
            <div className="container">
                <div className="container-header">
                    <img src={logo} alt="logo da nutrição" />
                    <h3>Diet Manager</h3>
                </div>
                <div className="content">
                    <h3>Dados Pessoais</h3>
                    <form >
                        <label htmlFor="nome">Nome *</label>
                        <input
                            type="text"
                            id='nome'
                            value={this.state.nome}
                            onChange={event => this.setState({ nome: event.target.value })}
                        />
                        <label htmlFor="dataNascimento">Data de Nascimento *</label>
                        <input
                            type="text"
                            id='dataNascimento'
                            value={this.state.dataNascimento}
                            onChange={event => this.setState({ dataNascimento: event.target.value })}
                        />
                    </form>
                    <h3>Informações fisiológicas</h3>
                    <form onSubmit={this.submitData}>
                        <label htmlFor="peso">Peso *</label>
                        <input
                            type="text"
                            id='peso'
                            value={this.state.peso}
                            onChange={event => this.setState({ peso: event.target.value })}
                        />
                        <label htmlFor="altura">Altura *</label>
                        <input
                            type="text"
                            id='altura'
                            value={this.state.altura}
                            onChange={event => this.setState({ altura: event.target.value })}
                        />
                        <label htmlFor="percetualDegordura">Peso *</label>
                        <input
                            type="text"
                            id='percetualDegordura'
                            value={this.state.percetualDegordura}
                            onChange={event => this.setState({ percetualDegordura: event.target.value })}
                        />
                        <span id='btn-container'>
                            <button className='btn-error'>Cancelar</button>
                            <button type='submit' className='btn-success'>Cadastrar</button>
                        </span>

                    </form>
                </div>
            </div>
        )
    }
}