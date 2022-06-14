import React, { Component } from "react";
import {Routes,Route,Navigate} from "react-router-dom";
import logo from "../logo.png";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";
import {registerServices} from "../services/userServices/registerServices";

class Register extends Component{

    constructor(props)
    {
        super(props);
        this.state = {
            name: '',
            surname: '',
            phone: '',
            email: '',
            password: '',
            redirect: false
        }
        this.register = this.register.bind(this);
        this.onChange = this.onChange.bind(this);
    }

    onChange(e)
    {
        this.setState({[e.target.name]:e.target.value})
    }

    register()
    {
        if(this.state.email !== "" && this.state.password !== "" && this.state.name !== "" && this.state.surname !== "")
        {
            registerServices(this.state).then(result => {

                if(result.status)
                {
                    sessionStorage.setItem("registerToast","yes");
                    window.location.href = "/"
                }
                else{
                    let errorMessage = "";
                    result.message.name !== undefined ? errorMessage = result.message.name[0] :
                        (
                            result.message.surname !== undefined ? errorMessage = result.message.surname[0] :
                                result.message.email !== undefined ? errorMessage = result.message.email[0]:
                                    errorMessage = result.message.password[0]
                        )
                    toastrClass("error",errorMessage);
                }
            });
        }
        else{
            toastrClass("error","Lütfen tüm alanları doldurun");
        }
    }

    render()
    {
        if(this.state.redirect)
        {
            return(
                <Routes>
                    <Route path="/" element={<Navigate replace to="/" />} />
                </Routes>
            )
        }
        return (
            <div className="Auth-form-container">
                <ToastContainer />
                <div className="Auth-form">
                    <div className="Auth-form-content">
                        <h3 className="Auth-form-title">Ted Portal Kayıt Ol</h3>
                        <img src={logo} className="App-logo rounded mx-auto d-block" alt="logo" width="100"/>
                        <div className="form-group mt-3">
                            <label>İsim</label>
                            <input
                                required="required"
                                type="text"
                                className="form-control mt-1"
                                placeholder="İsim Girin"
                                name="name"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>Soyisim</label>
                            <input
                                required="required"
                                type="text"
                                className="form-control mt-1"
                                placeholder="Soyisim Girin"
                                name="surname"
                                onChange={this.onChange}
                            />
                        </div>
                        <div className="form-group mt-3">
                            <label>GSM</label>
                            <input
                                required="required"
                                type="text"
                                className="form-control mt-1"
                                placeholder="GSM Girin"
                                name="phone"
                                onChange={this.onChange}
                            />
                        </div>
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
                            <button type="button" className="btn btn-primary" onClick={this.register}>
                                Kayıt Ol
                            </button>
                        </div>
                        <p className="forgot-password text-right mt-2">
                            Zaten hesabın var mı? <a href="/">Giriş Yap</a>
                        </p>
                    </div>
                </div>
            </div>

        )
    }
}

export default Register