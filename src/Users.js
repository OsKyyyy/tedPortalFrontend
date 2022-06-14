import Header from "./Layout/header";
import {Col, Input, Label, Row} from "reactstrap";
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import {toastrClass} from "./toastr"
import SideNavigation from "./Layout/SideNavigation";
import {getServicesUser} from "./services/userServices/getServicesUser";
import {setServicesUser} from "./services/userServices/setServicesUser";
import {deleteServicesUser} from "./services/userServices/deleteServicesUser";

function Users() {

    const [deleteteacher, setDeleteteacher] = useState();
    const [modalid, setModalid] = useState(false);
    const [modalname, setModalname] = useState(false);
    const [modalsurname, setModalsurname] = useState(false);
    const [modalphone, setModalphone] = useState(false);
    const [modalemail, setModalemail] = useState(false);

    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [users,usersSetState] = useState([]);
    const data = JSON.parse((sessionStorage.getItem("user")));
    const token = data.message.token;

    useEffect(()=>{
        getServicesUser("getByTeacher",token,"").then(result =>
        {
            usersSetState(result.message[0]);
        });
    },[])

    function setModal(id)
    {
        users.map((userForModal) => {
            if(userForModal.id === id)
            {
                setModalid(userForModal.id);
                setModalname(userForModal.name);
                setModalsurname(userForModal.surname);
                setModalphone(userForModal.phone);
                setModalemail(userForModal.email);
                handleShow();
            }
        })
    }

    function onChange(e)
    {

        e.target.name === "name" ? setModalname(e.target.value) :
            (
                e.target.name === "surname" ? setModalsurname(e.target.value) :
                e.target.name === "phone" ? setModalphone(e.target.value) :
                setModalemail(e.target.value)
            )
    }

    const updateTeacher = () => {

        if(modalname !== "" && modalsurname !== "" && modalemail !== "")
        {
            const userData = {
                "name" : modalname,
                "surname" : modalsurname,
                "phone" : modalphone,
                "email" : modalemail,
                "id" : modalid
            }

            setServicesUser("update",token,userData).then(resultUpdate => {

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

    const deleteTeacher = (id) => {

        if(deleteteacher !== ""){
           const query = "id="+id
           deleteServicesUser("delete",token,query).then(resultDelete => {

               if(resultDelete.status)
               {
                   toastrClass("success",resultDelete.message);
               }
               else{
                   toastrClass("error",resultDelete.message.id);
               }
           });
           setDeleteteacher("");
       }
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
                    <Table hover style={{marginTop:'50px'}}>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>Phone</th>
                                <th>E-Mail</th>
                                <th>İşlemler</th>
                            </tr>
                        </thead>
                        <tbody>
                        { users.map((user) => {
                            return [
                                <tr>
                                    <td>{user.name}</td>
                                    <td>{user.surname}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.email}</td>
                                    <td>
                                        <Button variant="warning" onClick={() => setModal(user.id)}>Düzenle</Button>
                                        <Button variant="danger" style={{marginLeft:'5px'}} onClick={() => deleteTeacher(user.id)}>Sil</Button>
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
                    <Modal.Title>Öğretmen Düzenle</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <FormGroup>
                        <Input type="hidden" name="id" id="modalid" value={modalid}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalname">İsim</Label>
                        <Input type="text" name="name" id="modalname" value={modalname} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalsurname">Soyisim</Label>
                        <Input type="text" name="surname" id="modalsurname" value={modalsurname} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalphone">GSM</Label>
                        <Input type="text" name="phone" id="modalphone" value={modalphone} onChange={onChange}/>
                    </FormGroup>
                    <FormGroup>
                        <Label for="modalemail">Email</Label>
                        <Input type="text" name="email" id="modalemail" value={modalemail} onChange={onChange}/>
                    </FormGroup>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="success" onClick={() => updateTeacher()}>
                        Kaydet
                    </Button>
                </Modal.Footer>
            </Modal>
        </>

    );

}

export default Users;