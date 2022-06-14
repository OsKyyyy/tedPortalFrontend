import Header from "../Layout/header";
import SideNavigation from "../Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import {getServicesBranch} from "../services/branch/getServicesBranch";
import {setServicesBranch} from "../services/branch/setServicesBranch";

function Getbranch() {

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

    const data = JSON.parse((sessionStorage.getItem("user")));
    const token = data.message.token;
    const [modalid,setModalid] = useState([]);
    const [modalname,setModalname] = useState([]);
    const [modalcode,setModalcode] = useState([]);
    const [branch,setBranch] = useState([]);
    const [show, setShow] = useState(false);
    const [student,setStudent] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        getServicesBranch("get",token,"").then(result =>
        {
            if(result.status)
            {
                setBranch(result.message);
            }
        });
    },[])

    function onChange(e)
    {
        e.target.name === "name" ? setModalname(e.target.value) : setModalcode(e.target.value)
    }
    function setModal(id)
    {
        branch.map((branchForModal) => {
            if(branchForModal.id === id)
            {
                setModalid(branchForModal.id);
                setModalname(branchForModal.name);
                setModalcode(branchForModal.code);
                handleShow();
            }
        })
    }

    const updateBranch = () => {

        const branchData = {
            "name" : modalname,
            "code" : modalcode,
            "id": modalid
        }

        setServicesBranch("update",token,branchData).then(resultUpdate => {

            if(resultUpdate.status)
            {
                toastrClass("success",resultUpdate.message);
                handleClose();
            }
        });
    }

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
                        <Table hover style={{marginTop:'50px'}}>
                            <thead>
                            <tr>
                                <td>Şube Adı</td>
                                <td>Şube Kodu</td>
                                <td>İşlemler</td>
                            </tr>
                            </thead>
                            <tbody>
                            { branch.map((branchs) => {
                                return [
                                    <tr>
                                        <td>{branchs.name}</td>
                                        <td>{branchs.code}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => setModal(branchs.id)}>Düzenle</Button>
                                        </td>

                                    </tr>
                                ]
                            })}
                            </tbody>
                        </Table>
                    </div>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Şube Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Input type="hidden" name="id" id="modalid" value={modalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalname">Şube Adı</Label>
                        <Input type="text" name="name" id="modalname" value={modalname} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalcode">Şube Kodu</Label>
                        <Input type="text" name="code" id="modalcode" value={modalcode} onChange={onChange}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => updateBranch()}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Getbranch;