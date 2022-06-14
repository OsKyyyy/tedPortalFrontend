import Header from "./Layout/header";
import SideNavigation from "./Layout/SideNavigation";
import { Col, Row } from "reactstrap";
import {toastrClass} from "./toastr"
import {ToastContainer} from "react-toastify";
import React from "react";

function Dashboard() {

    const styles = {
        contentDiv: {
            display: "flex"
        },
        contentMargin: {
            marginLeft: "10px",
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
                    <h1 style={{ padding: "20%" }}>This is Content Area</h1>
                </div>
            </div>
        </>
    );
}

export default Dashboard;