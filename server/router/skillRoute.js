const express = require("express");
const router = express.Router();
const { isAuthenticatedUser, authorizeRoles } = require("../auth/auth");
const {
  skillcreateController,
  getSkillDataController,
  deleteskillController,
  skillupdateController,
  getSingleSkillController,
} = require("../controller/skillController");

router.post(
  "/skillcreate",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  skillcreateController
);
router.get("/getskills", getSkillDataController);

router.delete(
  "/deleteskill/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  deleteskillController
);

router.put(
  "/updateskill/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  skillupdateController
);

router.get(
  "/getsingleskill/:id",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  getSingleSkillController
);
module.exports = router;
