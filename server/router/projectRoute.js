const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../auth/auth");

const {
  projectcreateController,
  getProjectDataController,
  getSingleProjectController,
  projectupdateController,
  deleteprojectController,
} = require("../controller/projectController");
const router = express.Router();

router.post(
  "/projectcreate",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  projectcreateController
);


router.get("/getprojectdata", getProjectDataController);
router.get(
  "/getsingleproject/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleProjectController
);
router.put(
  "/updateproject/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  projectupdateController
);
router.delete(
  "/deleteproject/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteprojectController
);

module.exports = router;
