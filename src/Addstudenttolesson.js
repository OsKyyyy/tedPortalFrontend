import Header from "./Layout/header";
import SideNavigation from "./Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "./toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import {getServicesLesson} from "./services/lesson/getServicesLesson";
import {getServicesStudent} from "./services/student/getServicesStudent";
import {setServicesStudent} from "./services/studentLesson/setServicesStudent";
import Select from 'react-select'

function Addstudenttolesson() {

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

    const [activeStudent, setActiveStudent] = useState();
    const [show, setShow] = useState(false);
    const [lesson,setLesson] = useState([]);
    const [student,setStudent] = useState([]);
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
        getServicesStudent("get",token,"").then(resultStudent =>
        {
            setStudent(resultStudent.message);
        });
    },[])

    function setModal(id)
    {
        student.map((studentForModal)=> {
            if (studentForModal.id === id){
                setActiveStudent(studentForModal.id);
            }
        })
        lesson.map((lessonForModal) => {
            setModalid(lessonForModal.id);
            getServicesStudent();
        })
        handleShow();
    }

    function onChange(options)
    {
         setModallessonid(options);
    }

    const setStudentLesson = () => {

        if(!modallessonid){
            toastrClass("error","Lütfen ders seçimi yapın")
        }
        else{
            const studentLessonData = {
                "student_id": activeStudent,
                "lesson_id": modallessonid.value,
                "exam_one" : "",
                "exam_two" : "",
                "exam_three" : "",
                "performance_one" : "",
                "performance_two" : "",
                "project" : ""
            }
            setServicesStudent("create",token,studentLessonData).then(resultStudentLesson =>
            {
                if(resultStudentLesson.message){
                    toastrClass("success",resultStudentLesson.message)
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
                                <td>Öğrenci No</td>
                                <td>Öğrenci Ad</td>
                                <td>Öğrenci Soyad</td>
                                <td>Öğrenci GSM</td>
                                <td>Öğrenci Email</td>
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
                                    <td>
                                        <Button variant="success" onClick={() => setModal(students.id)}>Ders Ekle</Button>
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
                    <Modal.Title>Öğrenci Ekle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Input type="hidden" name="id" id="modalid" value={modalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalexamone">Öğrenciler</Label>
                        <Select options={lesson} onChange={onChange}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => setStudentLesson()} >
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Addstudenttolesson;