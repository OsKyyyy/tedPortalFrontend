import React, {Component} from "react";
import {Navbar,NavbarBrand,NavbarText,} from "reactstrap";
import {FaSignOutAlt} from "react-icons/fa";
import logo from "../logo.png";
import {logoutServices} from "../services/userServices/logoutServices";

class Header extends Component {

    logout()
    {
        const data = JSON.parse((sessionStorage.getItem("user")));
        const token = data.message.token;
        logoutServices(token).then(result => {
            sessionStorage.removeItem("user");
            sessionStorage.clear();
            window.location.reload();
        });
    }

    render(){
        return (
            <div>
                <Navbar color="primary" light expand="md" >
                    <NavbarBrand href="/dashboard" style={{color:'white',marginLeft:'20px'}}>
                        <img src={logo} className="App-logo rounded mx-auto d-block" alt="logo" width="50" style={{float:'left'}}/>
                        <span style={{lineHeight: '44px',marginLeft:'10px'}}>Ted Ankara Koleji</span>
                    </NavbarBrand>
                    <NavbarText>
                        <div style={{cursor:'pointer',color:'white',marginRight:'20px'}} onClick={this.logout}>
                            <FaSignOutAlt/> Çıkış
                        </div>
                    </NavbarText>
                </Navbar>
            </div>
        );
    }

};

export default Header;