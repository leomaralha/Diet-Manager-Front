import React from 'react'
import { Switch, Route } from 'react-router'
import LoginForm from './components/loginComponent'
import ClienteCadastroForm from './components/clienteCadastro'
import { BrowserRouter } from 'react-router-dom'


export default function () {
    return (
        <BrowserRouter>
            <Switch>
                <Route path='/' exact component={LoginForm} />
                <Route path="/cliente/cadastro" component={ClienteCadastroForm} />
            </Switch>
        </BrowserRouter>
    )
}