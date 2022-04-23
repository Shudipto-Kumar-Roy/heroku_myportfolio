import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./CreateProject.css";
import { FaImage } from "react-icons/fa";
import { fetchSingleEducation, fetchSingleProject, updateEducationApi } from "../../api";
import { toast } from "react-toastify";
import { validateEducationField } from "../InputFieldValidation/formvalidation";
import "./CreateProject.css";
const UpdateEducation = () => {
  const { id } = useParams(); // for getting the params id
  const navigate = useNavigate(); // for location path

  const [educationstate, setEducationState] = useState({
    degreeinshort: "",
    degree: "",
    institution: "",
    result: "",
  });

  // For onchange input
  const inputHandle = (event) => {
    setEducationState({
      ...educationstate,
      [event.target.name]: event.target.value,
    });
  };

  // For update project
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = validateEducationField(educationstate);
    if (isValid) {
      const res = await updateEducationApi(id, educationstate); // api call
      if (res.status === 200) {
        toast.success("Education Updated Successfully", {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/admin/alleducations");
      }
    }
  };

  // const callUpdateProjectPage = async () => {
  //   try {
  //     const res = await axios.get("/createproject");
  //     if (res.data.rootUser.userRole !== "admin") {
  //       navigate("/");
  //     }
  //   } catch (error) {
  //     toast.error(`Getting User Data Failed ${error}`, {
  //       position: "top-center",
  //       autoClose: 5000,
  //       hideProgressBar: false,
  //       closeOnClick: true,
  //       pauseOnHover: true,
  //       draggable: true,
  //       progress: undefined,
  //     });
  //     navigate("/");
  //   }
  // };

  // useEffect(() => {
  //   callUpdateProjectPage();
  // }, []);

  useEffect(() => {
    const getEducationData = async () => {
      const education = await fetchSingleEducation(id); // api call
      setEducationState(education.data.education);
    };
    getEducationData();
  }, []);

  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Update Education</h1>
        <form action="" className="create_project_form">
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="degreeinshort"
              value={educationstate.degreeinshort}
              onChange={inputHandle}
              placeholder="Enter Degree In Short Name"
            />
          </div>
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="degree"
              value={educationstate.degree}
              onChange={inputHandle}
              placeholder="Enter Degree Name"
            />
          </div>
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="institution"
              value={educationstate.institution}
              onChange={inputHandle}
              placeholder="Enter Institution Name"
            />
          </div>
          <div className="create_form_group">
            <input
              type="text"
              className="create_form_control"
              name="result"
              value={educationstate.result}
              onChange={inputHandle}
              placeholder="Enter Result"
            />
          </div>

          <div className="create_form_group">
            <button
              onClick={handleClick}
              type="button"
              className="create_form_btn"
            >
              Update
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default UpdateEducation;
