import Header from "./Layout/header";
import SideNavigation from "./Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "./toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import Select from 'react-select'
import {getServicesLesson} from "./services/lesson/getServicesLesson";
import {getServicesTeacher} from "./services/teacherLesson/getServicesTeacher";
import {setServicesTeacher} from "./services/teacherLesson/setServicesTeacher";
import {getServicesUser} from "./services/userServices/getServicesUser";

function Addteachertolesson() {

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

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [activeTeacher, setActiveTeacher] = useState();
    const [show, setShow] = useState(false);
    const [lesson,setLesson] = useState([]);
    const [teacher,setTeacher] = useState([]);
    const [modalid, setModalid] = useState(false);
    const [modallessonid, setModallessonid] = useState();
    const data = JSON.parse((sessionStorage.getItem("user")));
    const token = data.message.token;

    useEffect(()=>{
        getServicesLesson("get",token,"").then(result =>
        {
            const list = [];
            result.message.map((resultLessons) => {
                list.push({ value: resultLessons.id, label: resultLessons.name });
            })
            setLesson(list);
        });
        getServicesUser("",token,"").then(resultTeacher =>
        {
            setTeacher(resultTeacher.message);
        });
    },[])

    function setModal(id)
    {
        teacher.map((teacherForModal)=> {
            if (teacherForModal.id === id){
                setActiveTeacher(teacherForModal.id);
            }
        })
        lesson.map((lessonForModal) => {
            setModalid(lessonForModal.id);
        })
        handleShow();
    }

    function onChange(options)
    {
         setModallessonid(options);
    }

    const setTeacherLesson = () => {

        if(!modallessonid){
            toastrClass("error","Lütfen ders seçimi yapın")
        }
        else{
            const teacherLessonData = {
                "teacher_id": activeTeacher,
                "lesson_id": modallessonid.value
            }
            setServicesTeacher("create",token,teacherLessonData).then(resultTeacherLesson =>
            {
                if(resultTeacherLesson.message){
                    toastrClass("success",resultTeacherLesson.message)
                    handleClose()
                }
            });
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
                    <Table hover style={{marginTop:'50px'}}>
                        <thead>
                            <tr>
                                <td>Ad</td>
                                <td>Soyad</td>
                                <td>GSM</td>
                                <td>Email</td>
                                <td>İşlemler</td>
                            </tr>
                        </thead>
                        <tbody>
                        { teacher.map((teachers) => {
                            return [
                                <tr>
                                    <td>{teachers.name}</td>
                                    <td>{teachers.surname}</td>
                                    <td>{teachers.phone}</td>
                                    <td>{teachers.email}</td>
                                    <td>
                                        <Button variant="success" onClick={() => setModal(teachers.id)}>Ders Ekle</Button>
                                    </td>
                                </tr>
                            ]
                        })}
                        </tbody>
                    </Table>
                </div>
            </div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Öğretmen Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Input type="hidden" name="id" id="modalid" value={modalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="teachers">Öğretmenler</Label>
                        <Select options={lesson} id="teachers" onChange={onChange}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setTeacherLesson()} >
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Addteachertolesson;