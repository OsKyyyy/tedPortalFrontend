import Header from "../Layout/header";
import SideNavigation from "../Layout/SideNavigation";
import {Col, Input, Label, Row} from "reactstrap";
import {toastrClass} from "../toastr"
import {ToastContainer} from "react-toastify";
import React, {useEffect, useState} from "react";
import {Button, FormGroup, Modal, Table} from "react-bootstrap";
import Select from "react-select";
import {getServicesBranch} from "../services/branch/getServicesBranch";
import {setServicesStudent} from "../services/student/setServicesStudent";

function Addstudent() {

    const [student,setStudent] = useState([]);
    const [branch,setBranch] = useState([]);
    const [name,setName] = useState([]);
    const [surname,setSurname] = useState([]);
    const [gsm,setGsm] = useState([]);
    const [email,setEmail] = useState([]);
    const [studentno,setStudentno] = useState([]);
    const [branchid, setBranchid] = useState();
    const data = JSON.parse((sessionStorage.getItem("user")));
    const token = data.message.token;

    useEffect(()=>{
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
        e.target.name === "name" ? setName(e.target.value) :
        (
            e.target.name === "surname" ? setSurname(e.target.value) :
            e.target.name === "gsm" ? setGsm(e.target.value) :
            e.target.name === "studentno" ? setStudentno(e.target.value) :
            setEmail(e.target.value)
        )
    }
    function onChangeOptions(options)
    {
        setBranchid(options);
    }

    const setStudentService = () => {

        if(!branchid){
            toastrClass("error","Lütfen ders seçimi yapın")
        }
        else{
            if(name != "" && surname != "" && studentno != "" && email != ""){

                const studentData = {
                    "name": name,
                    "surname": surname,
                    "phone": gsm,
                    "email": email,
                    "student_no": studentno,
                    "branch_id": branchid.value,
                }

                setServicesStudent("create",token,studentData).then(resultStudent =>
                {
                    if(resultStudent.message){
                        toastrClass("success",resultStudent.message)
                    }
                });
            }
            else{
                toastrClass("error","Lütfen tüm alanları doldurun")
            }
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
                    <div style={{marginTop:"50px"}}>
                        <FormGroup>
                            <Label for="name">İsim</Label>
                            <Input type="text" name="name" id="name"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="surname">Soyisim</Label>
                            <Input type="text" name="surname" id="surname"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="gsm">GSM</Label>
                            <Input type="text" name="gsm" id="gsm" onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="email">Email</Label>
                            <Input type="text" name="email" id="email"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="studentno">Öğrenci Numarası</Label>
                            <Input type="text" name="studentno" id="studentno"  onChange={onChange}/>
                        </FormGroup>
                        <FormGroup>
                            <Label for="branchlist">Şube</Label>
                            <Select options={branch} id="branchlist" onChange={onChangeOptions}/>
                        </FormGroup>
                        <FormGroup style={{marginTop:"20px"}}>
                            <Button variant="success" onClick={() => setStudentService()} >
                                Kaydet
                            </Button>
                        </FormGroup>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Addstudent;