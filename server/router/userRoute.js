const express = require("express");
const { isAuthenticatedUser, authorizeRoles } = require("../auth/auth");
const {
  signUpController,
  loginController,
  logoutController,
  createProjectController,
  adminScreenController,
  navbarController,
  forgotPassword,
  resetPassword,
} = require("../controller/userController");
const router = express.Router();

router.post("/signup", signUpController);
router.post("/login", loginController);
router.post("/password/forgot", forgotPassword);
router.put("/password/reset/:token", resetPassword);
router.get("/logout", logoutController);
// router.get(
//   "/createproject",
//   isAuthenticatedUser,
//   authorizeRoles("admin"),
//   createProjectController
// );
router.get(
  "/admin",
  isAuthenticatedUser,
  authorizeRoles("admin"),
  adminScreenController
);
router.get("/navbar", isAuthenticatedUser, navbarController);

module.exports = router;
