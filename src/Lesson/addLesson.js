import Header from "../Layout/header";
import SideNavigation from "../Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import {setServicesLesson} from "../services/lesson/setServicesLesson";

function Addlesson() {

    const data = JSON.parse((sessionStorage.getItem("user")));
    const token = data.message.token;
    const [lessonname,setLessonname] = useState([]);
    const [lessoncode,setLessoncode] = useState([]);

    const createLesson = () => {
        if(lessonname != "" && lessoncode != ""){
            const lessonData = {
                "name" : lessonname,
                "code" : lessoncode
            }

            setServicesLesson("create",token,lessonData).then(resultUpdate => {

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
        e.target.name === "name" ? setLessonname(e.target.value) : setLessoncode(e.target.value)
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
                            <Label for="lessonname">Ders İsimi</Label>
                            <Input type="text" name="name" id="lessonname" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="lessoncode">Ders Kodu</Label>
                            <Input type="text" name="code" id="lessoncode" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup style={{marginTop:"20px"}}>
                            <Button variant="success"  onClick={() => createLesson()}>
                                Kaydet
                            </Button>
                        </FormGroup>

                    </div>
                </div>
            </div>
        </>
    );
}

export default Addlesson;