import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./User/Login";
import Dashboard from "./Dashboard";
import Register from "./User/Register";
import Addnote from "./Addnote";
import Addstudenttolesson from "./Addstudenttolesson";
import Addteachertolesson from "./Addteachertolesson";
import Users from "./Users";
import AddStudent from "./Student/addStudent";
import GetStudent from "./Student/getStudent";
import AddBranch from "./Branch/addBranch";
import GetBranch from "./Branch/getBranch";
import AddLesson from "./Lesson/addLesson";
import GetLesson from "./Lesson/getLesson";

import "./App.css"

function App() {

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Login />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/register" element={<Register />} />
                <Route path="/addnote" element={<Addnote />} />
                <Route path="/addstudentlesson" element={<Addstudenttolesson />} />
                <Route path="/addteacherlesson" element={<Addteachertolesson />} />
                <Route path="/users" element={<Users />} />
                <Route path="/getstudent" element={<GetStudent />} />
                <Route path="/addstudent" element={<AddStudent />} />

                <Route path="/addbranch" element={<AddBranch />} />
                <Route path="/getbranch" element={<GetBranch />} />

                <Route path="/addlesson" element={<AddLesson />} />
                <Route path="/getlesson" element={<GetLesson />} />

            </Routes>
        </BrowserRouter>
    );
}

export default App;
