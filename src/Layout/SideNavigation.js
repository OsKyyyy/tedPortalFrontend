import React, { useState } from "react";
import {Link, Navigate, Route, Routes} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Menu,
    MenuItem,
    ProSidebar,
    SidebarHeader,
    SubMenu
} from "react-pro-sidebar";
import { AiOutlineMenu } from "react-icons/ai";
import {FaBookOpen, FaGem, FaGraduationCap, FaHeart, FaHome, FaRegBuilding, FaUsers} from "react-icons/fa";
import "react-pro-sidebar/dist/css/styles.css";

const SideNavigation = () => {

    const [collapsed, setCollapsed] = useState(false);

    const styles = {
        sideBarHeight: {
            height: "100vh"
        },
        menuIcon: {
            float: "right",
            margin: "10px"
        }
    };
    const onClickMenuIcon = () => {
        setCollapsed(!collapsed);
    };

    if(!sessionStorage.getItem("user"))
    {
        return (
            <Routes>
                <Route path="/" element={<Navigate replace to="/" />} />
            </Routes>
        )
    }

    const asd = 1;

    return (
       /* {asd == 0
            ? <SidebarHeader>
                <div style={styles.menuIcon} onClick={onClickMenuIcon}>
                    <AiOutlineMenu />
                </div>
            </SidebarHeader>
            : ""
        }*/
        <ProSidebar style={styles.sideBarHeight} collapsed={collapsed}>

            <SidebarHeader>
                <div style={styles.menuIcon} onClick={onClickMenuIcon}>
                    <AiOutlineMenu />
                </div>
            </SidebarHeader>
            <Menu iconShape="square">
                <MenuItem icon={<FaHome />}> <Link to="/dashboard">Anasayfa</Link></MenuItem>
                <SubMenu title="Kullanıcı İşlemleri" icon={<FaUsers />}>
                    <MenuItem> <Link to="/users">Öğretmen Listesi </Link></MenuItem>
                </SubMenu>
                <SubMenu title="Şube İşlemleri" icon={<FaRegBuilding />}>
                    <MenuItem> <Link to="/getbranch">Şube Listesi </Link></MenuItem>
                    <MenuItem> <Link to="/addbranch">Şube Ekle </Link></MenuItem>
                </SubMenu>
                <SubMenu title="Öğrenci İşlemleri" icon={<FaGraduationCap />}>
                    <MenuItem> <Link to="/getstudent">Öğrenci Listesi </Link></MenuItem>
                    <MenuItem> <Link to="/addstudent">Öğrenci Ekle </Link></MenuItem>
                </SubMenu>
                <SubMenu title="Ders İşlemleri" icon={<FaBookOpen />}>
                    <MenuItem> <Link to="/getlesson">Derse Listesi</Link></MenuItem>
                    <MenuItem> <Link to="/addlesson">Derse Ekle</Link></MenuItem>
                    <MenuItem> <Link to="/addnote">Not Gir</Link></MenuItem>

                    <SubMenu title="Ders Bağlama">
                        <MenuItem> <Link to="/addstudentlesson">Derse Öğrenci Ekle</Link></MenuItem>
                        <MenuItem> <Link to="/addteacherlesson">Derse Öğretmen Ekle</Link></MenuItem>
                    </SubMenu>
                </SubMenu>
            </Menu>
        </ProSidebar>
    )
}

export default SideNavigation