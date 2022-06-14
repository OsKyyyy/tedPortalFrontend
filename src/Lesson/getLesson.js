import Header from "../Layout/header";
import SideNavigation from "../Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import {getServicesLesson} from "../services/lesson/getServicesLesson";
import {setServicesLesson} from "../services/lesson/setServicesLesson";

function Getlesson() {

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
    const [lesson,setLesson] = useState([]);
    const [show, setShow] = useState(false);
    const [student,setStudent] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(()=>{
        getServicesLesson("get",token,"").then(result =>
        {
            if(result.status)
            {
                setLesson(result.message);
            }
        });
    },[])

    function onChange(e)
    {
        e.target.name === "name" ? setModalname(e.target.value) : setModalcode(e.target.value)
    }
    function setModal(id)
    {
        lesson.map((lessonForModal) => {
            if(lessonForModal.id === id)
            {
                setModalid(lessonForModal.id);
                setModalname(lessonForModal.name);
                setModalcode(lessonForModal.code);
                handleShow();
            }
        })
    }

    const updateLesson = () => {

        const lessonData = {
            "name" : modalname,
            "code" : modalcode,
            "id": modalid
        }

        setServicesLesson("update",token,lessonData).then(resultUpdate => {

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
                                <td>Ders Adı</td>
                                <td>Ders Kodu</td>
                                <td>İşlemler</td>
                            </tr>
                            </thead>
                            <tbody>
                            { lesson.map((lessons) => {
                                return [
                                    <tr>
                                        <td>{lessons.name}</td>
                                        <td>{lessons.code}</td>
                                        <td>
                                            <Button variant="warning" onClick={() => setModal(lessons.id)}>Düzenle</Button>
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
                    <Modal.Title>Ders Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Input type="hidden" name="id" id="modalid" value={modalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalname">Ders Adı</Label>
                        <Input type="text" name="name" id="modalname" value={modalname} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalcode">Ders Kodu</Label>
                        <Input type="text" name="code" id="modalcode" value={modalcode} onChange={onChange}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => updateLesson()}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Getlesson;