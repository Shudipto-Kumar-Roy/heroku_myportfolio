import axios from "axios";
import { toast } from "react-toastify";

// For signup api
export const sigupUserApi = async (user) => {
  try {
    return await axios.post("/signup", user);
  } catch (error) {
    if (error.response.status === 409) {
      toast.info("User already exists with this email");
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For login api
export const loginUser = async (user) => {
  try {
    return await axios.post("/login", user);
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("User not found");
    } else if (error.response.status === 401) {
      toast.error("Invalid Credential");
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For logout api
export const logout = async () => {
  try {
    return await axios.get("/logout");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For upload file api
export const uploadFileApi = async (base64File) => {
  try {
    return await axios.post("/upload/pdf", { base64File });
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For get file api
export const getPdfFileApi = async () => {
  try {
    return await axios.get("/pdffile");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For delete resume api
export const deleteResumeApi = async (id) => {
  try {
    return await axios.delete(`/delete/resume/${id}`);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
// For create project api
export const createProjectsApi = async (post) => {
  try {
    return await axios.post("/projectcreate", post);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For create skill api
export const createSkillApi = async (skillstate) => {
  try {
    return await axios.post("/skillcreate", skillstate);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For create education api
export const createEducationApi = async (educationstate) => {
  try {
    return await axios.post("/educationcreate", educationstate);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For update project api
export const updateProjectsApi = async (id, post) => {
  try {
    return await axios.put(`/updateproject/${id}`, post);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For update education api
export const updateEducationApi = async (id, educationstate) => {
  try {
    return await axios.put(`/updateeducation/${id}`, educationstate);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For update skill api
export const updateSkillApi = async (id, skillstate) => {
  try {
    return await axios.put(`/updateskill/${id}`, skillstate);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For fetch project api
export const fetchProjectData = async () => {
  try {
    return await axios.get("/getprojectdata");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For fetch skills api
export const getAllSkillsApi = async () => {
  try {
    return await axios.get("/getskills");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For fetch educations api
export const getEducationApi = async () => {
  try {
    return await axios.get("/geteducationdata");
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For fetch single project
export const fetchSingleProject = async (id) => {
  try {
    return await axios.get(`/getsingleproject/${id}`);
  } catch (error) {
    if (error.response.status === 404) {
      toast.error(`Project Data not found`);
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For fetch single education
export const fetchSingleEducation = async (id) => {
  try {
    return await axios.get(`/getsingleeducation/${id}`);
  } catch (error) {
    if (error.response.status === 404) {
      toast.error(`Education not found`);
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For fetch single skill
export const fetchSingleSkill = async (id) => {
  try {
    return await axios.get(`/getsingleskill/${id}`);
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Skill not found");
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For delete project api
export const delteProject = async (id) => {
  try {
    return await axios.delete(`/deleteproject/${id}`);
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Project not found");
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For delete education api
export const deleteEducation = async (id) => {
  try {
    return await axios.delete(`/deleteeducation/${id}`);
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Education not found");
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For delete skill api
export const deleteSkill = async (id) => {
  try {
    return await axios.delete(`/deleteskill/${id}`);
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("Skill not found");
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For create feedback api
export const feedbackCreate = async (userfeedback) => {
  try {
    return await axios.post("/user/feedback", userfeedback);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};

// For forgot password api
export const forgotPassword = async (email) => {
  try {
    return await axios.post("/password/forgot", { email });
  } catch (error) {
    if (error.response.status === 404) {
      toast.error("User not found");
    } else {
      toast.error(error.response.data.message);
    }
  }
};

// For  reset password api
export const resetPassword = async (resetstate, token) => {
  try {
    return await axios.put(`/password/reset/${token}`, resetstate);
  } catch (error) {
    toast.error(error.response.data.message);
  }
};
