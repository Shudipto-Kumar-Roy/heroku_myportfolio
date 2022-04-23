import "./App.css";
import NavBar from "./components/Navbar/NavBar";
import { Route, Routes } from "react-router-dom";
import Home from "./components/pages/Home/Home";
import ForgotPassword from "./components/PasswordReset/ForgotPassword";
import ScrollToTop from "react-scroll-to-top";
import { AdminScreen } from "./components/Admin/AdminScreen";
import CreateProject from "./components/Admin/CreateProject";
import UpdateProject from "./components/Admin/UpdateProject";
import AllProjects from "./components/Admin/AllProjects";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./components/PasswordReset/ResetPassword";
import Footer from "./components/Footer/Footer";
import CreateSkill from "./components/Admin/CreateSkill";
import CreateEducation from "./components/Admin/CreateEducation";
import AllEducations from "./components/Admin/AllEducations";
import UpdateEducation from "./components/Admin/UpdateEducation";
import UpdateSkill from "./components/Admin/UpdateSkill";
import AllSkills from "./components/Admin/AllSkills";
import UploadResume from "./components/Admin/UploadResume";
import DeleteResume from "./components/Admin/DeleteResume";
function App() {
  return (
    <>
      <ToastContainer />
      <ScrollToTop
        smooth={true}
        top={80}
        viewBox="0 0 256 256"
        color="#2d4263"
        width="20"
        height="20"
        style={{
          borderRadius: "50%",
          fontSize: "2rem",
        }}
      />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        {/* <Route element={<ProtectedRoute />}></Route> */}
        <Route />
        <Route path="admin" element={<AdminScreen />}>
          <Route path="" element={<AllProjects />} />
          <Route path="alleducations" element={<AllEducations />} />
          <Route path="allskills" element={<AllSkills />} />
          <Route path="createproject" element={<CreateProject />} />
          <Route path="updateproject/:id" element={<UpdateProject />} />
          <Route path="updateeducation/:id" element={<UpdateEducation />} />
          <Route path="updateskill/:id" element={<UpdateSkill />} />
          <Route path="createskills" element={<CreateSkill />} />
          <Route path="createeducation" element={<CreateEducation />} />
          <Route path="uploadresume" element={<UploadResume />} />
          <Route path="deleteresume" element={<DeleteResume />} />
        </Route>
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
