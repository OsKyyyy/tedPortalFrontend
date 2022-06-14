import Header from "./Layout/header";
import SideNavigation from "./Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "./toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import {getServicesTeacher} from "./services/teacherLesson/getServicesTeacher";
import {getServicesStudent} from "./services/studentLesson/getServicesStudent";
import {setServicesStudent} from "./services/studentLesson/setServicesStudent";

function Addnote() {

    const [show, setShow] = useState(false);
    const [student,setStudent] = useState([]);
    const [modalid, setModalid] = useState(false);
    const [modalexamone, setModalexamone] = useState(false);
    const [modalexamtwo, setModalexamtwo] = useState(false);
    const [modalexamthree, setModalexamthree] = useState(false);
    const [modalperformanceone, setModalperformanceone] = useState(false);
    const [modalperformancetwo, setModalperformancetwo] = useState(false);
    const [modalproject, setModalproject] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const data = JSON.parse((sessionStorage.getItem("user")));
    const teacherId = data.message.user.id;
    const token = data.message.token;

    useEffect(()=>{
        getServicesTeacher("getByTeacherId",token,"teacher_id="+teacherId).then(result =>
        {
            let lesson_id = result.message[0][0].lesson_id;
            if(result.status)
            {
                getServicesStudent("getByLessonId",token,"lesson_id="+lesson_id).then(resultStudent =>
                {
                    setStudent(resultStudent.message[0]);
                });
            }
        });
    },[])

    function setModal(id)
    {
        student.map((studentForModal) => {
            if(studentForModal.id === id)
            {
                setModalid(studentForModal.id);
                setModalexamone(studentForModal.exam_one);
                setModalexamtwo(studentForModal.exam_two);
                setModalexamthree(studentForModal.exam_three);
                setModalperformanceone(studentForModal.performance_one);
                setModalperformancetwo(studentForModal.performance_two);
                setModalproject(studentForModal.project);
                handleShow();
            }
        })
    }

    function onChange(e)
    {

        e.target.name === "exam_one" ? setModalexamone(e.target.value) :
            (
                e.target.name === "exam_two" ? setModalexamtwo(e.target.value) :
                e.target.name === "exam_three" ? setModalexamthree(e.target.value) :
                e.target.name === "performance_one" ? setModalperformanceone(e.target.value) :
                e.target.name === "performance_two" ? setModalperformancetwo(e.target.value) :
                setModalproject(e.target.value)
            )
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

    const average = (exam_one,exam_two,exam_three,performance_one,performance_two,project) => {
        const arr = [exam_one,exam_two,exam_three,performance_one,performance_two,project];
        let i = 0;
        arr.map((arrResult) => {
            if(arrResult != null){
                i++;
            }
        })
        const avg = (exam_one + exam_two + exam_three +performance_one + performance_two + project) / i;
        if(isNaN(avg)){
            return "-"
        }
        else{
            return avg;
        }
    }

    const updateNote = () => {

        const noteData = {
            "exam_one" : modalexamone,
            "exam_two" : modalexamtwo,
            "exam_three" : modalexamthree,
            "performance_one" : modalperformanceone,
            "performance_two" : modalperformancetwo,
            "project" : modalproject,
            "id" : modalid
        }

        setServicesStudent("update",token,noteData).then(resultUpdate => {

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
                    <Table hover style={{marginTop:'50px'}}>
                        <thead>
                            <tr>
                                <td>Ders Adı</td>
                                <td>Öğrenci No</td>
                                <td>Öğrenci Adı</td>
                                <td>Öğrenci Soyadı</td>
                                <td>Sınav 1</td>
                                <td>Sınav 2</td>
                                <td>Sınav 3</td>
                                <td>Performans 1</td>
                                <td>Performans 2</td>
                                <td>Proje</td>
                                <td>Ortalama</td>
                                <td>İşlemler</td>
                            </tr>
                        </thead>
                        <tbody>
                        { student.map((students) => {
                            return [
                                <tr>
                                    <td>{students.lesson_name}</td>
                                    <td>{students.student_no}</td>
                                    <td>{students.student_name}</td>
                                    <td>{students.student_surname}</td>
                                    <td>{students.exam_one == null ? '-' : students.exam_one}</td>
                                    <td>{students.exam_two == null ? '-' : students.exam_two}</td>
                                    <td>{students.exam_three == null ? '-' : students.exam_three}</td>
                                    <td>{students.performance_one == null ? '-' : students.performance_one}</td>
                                    <td>{students.performance_two == null ? '-' : students.performance_two}</td>
                                    <td>{students.project == null ? '-' : students.project}</td>
                                    <td style={{fontWeight:"bold"}}>
                                        {average(students.exam_one,students.exam_two,students.exam_three,students.performance_one,students.performance_two,students.project)}
                                    </td>
                                    <td>
                                        <Button variant="warning" onClick={() => setModal(students.id)}>Düzenle</Button>
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
                    <Modal.Title>Not Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Input type="hidden" name="id" id="modalid" value={modalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalexamone">Sınav 1</Label>
                        <Input type="text" name="exam_one" id="modalexamone" value={modalexamone} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalexamtwo">Sınav 2</Label>
                        <Input type="text" name="exam_two" id="modalexamtwo" value={modalexamtwo} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalexamthree">Sınav 3</Label>
                        <Input type="text" name="exam_three" id="modalexamthree" value={modalexamthree} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalperformanceone">Performans 1</Label>
                        <Input type="text" name="performance_one" id="modalperformanceone" value={modalperformanceone} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalperformancetwo">Performans 2</Label>
                        <Input type="text" name="performance_two" id="modalperformancetwo" value={modalperformancetwo} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalproject">Proje</Label>
                        <Input type="text" name="project" id="modalproject" value={modalproject} onChange={onChange}/>
                    </FormGroup>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => updateNote()}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default Addnote;