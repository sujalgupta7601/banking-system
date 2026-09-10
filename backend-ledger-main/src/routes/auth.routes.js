const express = require("express")
const authController = require("../controllers/auth.controller")
const authMiddleware = require("../middleware/auth.middleware")
const router = express.Router()


/* POST /api/auth/register */
router.post("/register", authController.userRegisterController)


/* POST /api/auth/login */
router.post("/login", authController.userLoginController)



/**
 * - PUT /api/auth/profile
 * - Update logged-in user's profile
 */
router.put(
    "/profile",
    authMiddleware.authMiddleware,
    authController.updateProfileController
)
router.get(
    "/imagekit-auth",
    authMiddleware.authMiddleware,
    authController.getImageKitAuth
)
/**
 * - POST /api/auth/logout
 */
router.post("/logout", authController.userLogoutController)

module.exports = router