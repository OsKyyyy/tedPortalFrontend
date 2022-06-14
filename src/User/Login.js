import React, { Component } from "react";
import {Routes,Route,Navigate,useSearchParams} from "react-router-dom";
import {loginServices} from "../services/userServices/loginServices";
import logo from "../logo.png";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";

class Login extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            email: '',
            password: '',
            redirect: false
        }
        this.login = this.login.bind(this);
        this.onChange = this.onChange.bind(this);

        if(sessionStorage.getItem("registerToast")){
            toastrClass("success","Kullanıcı başarıyla eklendi");
            sessionStorage.removeItem("registerToast");
        }
    }

    login()
    {
        if(this.state.email !== "" && this.state.password !== "")
        {
            loginServices(this.state).then(result => {
                if(result.status)
                {
                    sessionStorage.setItem('user',JSON.stringify(result));
                    this.setState({redirect: true})
                }
                else{
                    toastrClass("error",result.message);
                }
            });
        }
        else{
            toastrClass("error","Lütfen tüm alanları doldurun");
        }
    }

    onChange(e)
    {
        this.setState({[e.target.name]:e.target.value})
    }

    render()
    {
        if(this.state.redirect)
        {
            return(
                <Routes>
                    <Route path="/" element={<Navigate replace to="/dashboard" />} />
                </Routes>
            )
        }
        if(sessionStorage.getItem("user"))
        {
            return(
                <Routes>
                    <Route path="/" element={<Navigate replace to="/dashboard" />} />
                </Routes>
            )
        }
        return (
            <div className="Auth-form-container">
                <ToastContainer />
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Ted Portal Giriş</h3>
                        <img src={logo} className="App-logo rounded mx-auto d-block" alt="logo" width="100"/>
                        <div className="form-group mt-3">
                            <label>Email Adresi</label>
                            <input
                                required="required"
                                type="email"
                                className="form-control mt-1"
                                placeholder="E-Mail Girin"
                                name="email"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Şifre</label>
                            <input
                                required="required"
                                type="password"
                                className="form-control mt-1"
                                placeholder="Şifre Girin"
                                name="password"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="d-grid gap-2 mt-3">
                            <button type="button" className="btn btn-primary" onClick={this.login}>
                                Giriş Yap
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            Hesabın yok mu ? <a href="/register">Kayıt Ol</a>
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}

export default Login