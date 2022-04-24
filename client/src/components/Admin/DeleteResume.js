import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { deleteResumeApi, getPdfFileApi } from "../../api";
import "./CreateProject.css";

const DeleteResume = () => {
  const [pdf, setPdf] = useState("");

  const handleDelete = async (id) => {
    const isOk = window.confirm("Do you really want to delete?");
    if (isOk) {
      const res = await deleteResumeApi(id); // api call
      if (res.status === 200) {
        toast.success("Resume Deleted Successfull");
      }
    }
  };

  useEffect(() => {
    const getPdfFile = async () => {
      const res = await getPdfFileApi();
      if (res.status === 200) {
        toast.success("Successfully getting file");
        setPdf(res.data.file);
      }
    };
    getPdfFile();
  }, []);
  return (
    <>
      <div className="create_container">
        <h1 className="create_project_heading">Upload Resume</h1>
        <form className="create_project_form">
          <div className="create_form_group">
            <iframe
              src={pdf.file}
              style={{ border: "0.2rem solid #1d1d1d" }}
              width="100%"
            ></iframe>
          </div>
          <div className="create_form_group">
            <button
              onClick={() => handleDelete(pdf._id)}
              type="button"
              className="create_form_btn"
            >
              Delete
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default DeleteResume;
