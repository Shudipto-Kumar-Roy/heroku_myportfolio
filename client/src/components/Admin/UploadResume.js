import React, { useEffect, useState } from "react";
import "./CreateProject.css";
import { FaFile } from "react-icons/fa";
import { getPdfFileApi, uploadFileApi } from "../../api";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";
import { createResumeValidate } from "../InputFieldValidation/formvalidation";

const UploadResume = () => {
  const [file, setFile] = useState(""); //for file state
  const [base64File, setBase64File] = useState(""); // for base64 file state

  // for onchange file handle
  const fileHandle = (event) => {
    setFile(event.target.files[0]);
  };

  // converting normal file to base64 string
  const convertBase64 = (file) => {
    var reader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onload = () => {
        setBase64File(reader.result);
      };
      reader.onerror = (error) => {
        console.log(error);
      };
    }
  };
  convertBase64(file);

  const [pdf, setPdf] = useState("");
  useEffect(() => {
    const getPdfFile = async () => {
      const res = await getPdfFileApi();
      setPdf(res.data.file);
    };
    getPdfFile();
  }, [file]);

  // for create project
  const handleClick = async (event) => {
    event.preventDefault();
    const isValid = createResumeValidate(base64File, pdf);
    if (isValid) {
      const res = await uploadFileApi(base64File);
      if (res.status === 201) {
        toast.success("Successfully uploaded file");
      }
    }
  };

  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Upload Resume</h1>
        <form
          action=""
          className="create_project_form"
          encType="multipart/form-data"
        >
          <div className="create_form_group">
            <label htmlFor="form_image" className="create_form_file_icon">
              <FaFile /> Browse File
            </label>
            <input type="file" id="form_image" onChange={fileHandle} />
          </div>
          <div className="create_form_group">
            <iframe
              src={base64File}
              style={{ border: "0.2rem solid #1d1d1d" }}
              width="100%"
            ></iframe>
          </div>
          <div className="create_form_group">
            <button
              onClick={handleClick}
              type="button"
              className="create_form_btn"
            >
              Publish
            </button>
            <Link
              to="/admin/deleteresume"
              className="create_form_btn"
              style={{
                textDecoration: "none",
                backgroundColor: "red",
                color: "white",
                border: "none",
              }}
            >
              Delete
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default UploadResume;
