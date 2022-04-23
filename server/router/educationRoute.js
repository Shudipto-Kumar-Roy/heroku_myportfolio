const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../auth/auth");
const {
  educationcreateController,
  geteducationController,
  deleteeducationController,
  educationupdateController,
  getSingleEducationController,
} = require("../controller/educationController");

router.post(
  "/educationcreate",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  educationcreateController
);

router.get("/geteducationdata", geteducationController);

router.delete(
  "/deleteeducation/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteeducationController
);

router.put(
  "/updateeducation/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  educationupdateController
);

router.get(
  "/getsingleeducation/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleEducationController
);

module.exports = router;
