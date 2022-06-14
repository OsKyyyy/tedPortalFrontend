import Header from "../Layout/header";
import SideNavigation from "../Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import {setServicesBranch} from "../services/branch/setServicesBranch";

function Addbranch() {

    const data = JSON.parse((sessionStorage.getItem("user")));
    const token = data.message.token;
    const [branchname,setBranchname] = useState([]);
    const [branchcode,setBranchcode] = useState([]);

    const createBranch = () => {
        if(branchname != "" && branchcode != "") {
            const branchData = {
                "name" : branchname,
                "code" : branchcode
            }

            setServicesBranch("create",token,branchData).then(resultUpdate => {

                if(resultUpdate.status)
                {
                    toastrClass("success",resultUpdate.message);
                }
            });
        }
        else{
            toastrClass("error","Lütfen tüm alanları doldurunuz")
        }
    }

    function onChange(e)
    {
        e.target.name === "name" ? setBranchname(e.target.value) : setBranchcode(e.target.value)
    }

    const styles = {
        contentDiv: {
            display: "flex"
        },
        contentMargin: {
            marginLeft: "30px",
            marginRight: "30px",
            width: "100%"
        }
    };

    return (
        <>
            <Row style={{'--bs-gutter-x':'none'}}>
                <Col>
                    <Header/>
                </Col>
            </Row>

            <div style={styles.contentDiv}>
                <ToastContainer />
                <SideNavigation/>
                <div style={styles.contentMargin}>
                    <div style={{marginTop:"50px"}}>
                        <FormGroup>
                            <Label for="branachname">Şube İsimi</Label>
                            <Input type="text" name="name" id="branachname" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="branachcode">Şube Kodu</Label>
                            <Input type="text" name="code" id="branachcode" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup style={{marginTop:"20px"}}>
                            <Button variant="success"  onClick={() => createBranch()}>
                                Kaydet
                            </Button>
                        </FormGroup>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Addbranch;