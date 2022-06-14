import Header from "../Layout/header";
import SideNavigation from "../Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import Select from "react-select";
import {getServicesStudent} from "../services/student/getServicesStudent";
import {getServicesBranch} from "../services/branch/getServicesBranch";
import {setServicesStudent} from "../services/student/setServicesStudent";

function Getstudent() {

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
    const [modalsurname,setModalsurname] = useState([]);
    const [modalphone,setModalphone] = useState([]);
    const [modalemail,setModalemail] = useState([]);
    const [modalstudentno,setModalstudentno] = useState([]);
    const [branchid, setBranchid] = useState();
    const [show, setShow] = useState(false);
    const [student,setStudent] = useState([]);
    const [branch,setBranch] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        getServicesStudent("get",token,"").then(result =>
        {
            if(result.status)
            {
                setStudent(result.message);
            }
        });
        getServicesBranch("get",token,"").then(result =>
        {
            if(result.status)
            {
                const list = [];
                result.message.map((resultBranch) => {
                    list.push({ value: resultBranch.id, label: resultBranch.name });
                })
                setBranch(list);
            }
        });
    },[])

    function onChange(e)
    {
        e.target.name === "name" ? setModalname(e.target.value) :
            (
                e.target.name === "surname" ? setModalsurname(e.target.value) :
                e.target.name === "phone" ? setModalphone(e.target.value) :
                e.target.name === "email" ? setModalemail(e.target.value) :
                setModalstudentno(e.target.value)
            )
    }

    function onChangeOptions(options)
    {
        setBranchid(options);
    }

    function setModal(id)
    {
        student.map((studentForModal) => {
            if(studentForModal.id === id)
            {
                setModalid(studentForModal.id);
                setModalname(studentForModal.name);
                setModalsurname(studentForModal.surname);
                setModalemail(studentForModal.email);
                setModalstudentno(studentForModal.student_no);
                setModalphone(studentForModal.phone);
                handleShow();
            }
        })
    }

    const updateStudent= () => {
        if(!branchid){
            toastrClass("error","Lütfen şube seçimi yapın")
        }
        else{
            if(modalname != "" && modalsurname != "" && modalphone != "" && modalemail != "" && modalstudentno != ""){
                const branchData = {
                    "name" : modalname,
                    "surname" : modalsurname,
                    "phone" : modalphone,
                    "email" : modalemail,
                    "student_no" : modalstudentno,
                    "branch_id" : branchid.value,
                    "id": modalid
                }
                setServicesStudent("update",token,branchData).then(resultUpdate => {

                    if(resultUpdate.status)
                    {
                        toastrClass("success",resultUpdate.message);
                        handleClose();
                    }

                    else{
                        let errorMessage = "";
                        resultUpdate.message.name !== undefined ? errorMessage = resultUpdate.message.name[0] :
                            (
                                resultUpdate.message.surname !== undefined ? errorMessage = resultUpdate.message.surname[0] :
                                    resultUpdate.message.email !== undefined ? errorMessage = resultUpdate.message.email[0]:
                                    resultUpdate.message.student_no !== undefined ? errorMessage = resultUpdate.message.student_no[0]:
                                        errorMessage = resultUpdate.message.password[0]
                            )
                        toastrClass("error",errorMessage);
                    }

                });
            }
            else{
                toastrClass("error","Lütfen tüm alanları doldurun");
            }
        }
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
                                <td>Öğrenci No</td>
                                <td>Öğrenci Ad</td>
                                <td>Öğrenci Soyad</td>
                                <td>Öğrenci GSM</td>
                                <td>Öğrenci Email</td>
                                <td>Şube</td>
                                <td>İşlemler</td>
                            </tr>
                            </thead>
                            <tbody>
                            { student.map((students) => {
                                return [
                                    <tr>
                                        <td>{students.student_no}</td>
                                        <td>{students.name}</td>
                                        <td>{students.surname}</td>
                                        <td>{students.phone}</td>
                                        <td>{students.email}</td>
                                        <td>{students.branch}</td>
                                        <td>
                                            <Button variant="success" onClick={() => setModal(students.id)}>Düzenle</Button>
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
                        <Label for="name">Ad</Label>
                        <Input type="text" name="name" id="name" value={modalname} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="surname">Soyad</Label>
                        <Input type="text" name="surname" id="surname" value={modalsurname} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="phone">GSM</Label>
                        <Input type="text" name="phone" id="phone" value={modalphone} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="email">Email</Label>
                        <Input type="text" name="email" id="email" value={modalemail} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="studentno">Öğrenci Numarası</Label>
                        <Input type="text" name="studentno" id="studentno" value={modalstudentno} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="branch">Şube</Label>
                        <Select options={branch} onChange={onChangeOptions}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => updateStudent()}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Getstudent;