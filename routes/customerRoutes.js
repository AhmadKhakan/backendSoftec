const express = require("express");
const router = express.Router();
const {
  loginCustomer,
  registerCustomer,
  verifyPhoneNumber,
  signUpWithProvider,
  signUpWithOauthProvider,
  verifyEmailAddress,
  forgetPassword,
  changePassword,
  resetPassword,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
  addAllCustomers,
} = require("../controllers/customerController");
const {
  passwordVerificationLimit,
  emailVerificationLimit,
  phoneVerificationLimit,
} = require("../lib/email-sender/sender");

/**
 * @swagger
 * /api/customers/verify-email:
 *   post:
 *     summary: Send email verification link
 *     description: Sends an email with a verification link to the user's email address.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               name:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification email sent successfully
 */
router.post("/verify-email", emailVerificationLimit, verifyEmailAddress);

/**
 * @swagger
 * /api/customers/verify-phone:
 *   post:
 *     summary: Send phone verification code
 *     description: Sends a 6-digit code to the user's phone number.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Verification code sent successfully
 */
router.post("/verify-phone", phoneVerificationLimit, verifyPhoneNumber);

/**
 * @swagger
 * /api/customers/register/{token}:
 *   post:
 *     summary: Register a customer with a token
 *     description: Register a new customer after verifying email.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *         description: Token from verification email
 *     responses:
 *       200:
 *         description: Customer registered successfully
 */
router.post("/register/:token", registerCustomer);

/**
 * @swagger
 * /api/customers/login:
 *   post:
 *     summary: Login a customer
 *     description: Login using email and password.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post("/login", loginCustomer);

/**
 * @swagger
 * /api/customers/add-all:
 *   post:
 *     summary: Add multiple customers
 *     description: Insert multiple customers into the database.
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: Customers added successfully
 */
router.post("/add-all", addAllCustomers);

/**
 * @swagger
 * /api/customers/forget-password:
 *   post:
 *     summary: Forgot password - send reset email
 *     description: Sends an email to reset password.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset email sent
 */
router.post("/forget-password", passwordVerificationLimit, forgetPassword);

/**
 * @swagger
 * /api/customers/reset-password:
 *   post:
 *     summary: Reset customer password
 *     description: Resets the password using the token.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               token:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password reset successful
 */
router.post("/reset-password", resetPassword);

/**
 * @swagger
 * /api/customers/change-password:
 *   post:
 *     summary: Change customer password
 *     description: Changes password after verifying current password.
 *     tags: [Customers]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               currentPassword:
 *                 type: string
 *               newPassword:
 *                 type: string
 *     responses:
 *       200:
 *         description: Password changed successfully
 */
router.post("/change-password", changePassword);

/**
 * @swagger
 * /api/customers/signup-provider/{token}:
 *   post:
 *     summary: Signup or login with OAuth provider (token)
 *     description: Register or login user through external providers using token.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User signed up or logged in successfully
 */
router.post("/signup-provider/:token", signUpWithProvider);

/**
 * @swagger
 * /api/customers/signup-oauth:
 *   post:
 *     summary: Signup or login with OAuth provider (body)
 *     description: Register or login user through OAuth provider via request body.
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: User signed up or logged in successfully
 */
router.post("/signup-oauth", signUpWithOauthProvider);

/**
 * @swagger
 * /api/customers:
 *   get:
 *     summary: Get all customers
 *     description: Returns a list of all customers.
 *     tags: [Customers]
 *     responses:
 *       200:
 *         description: List of customers
 */
router.get("/", getAllCustomers);

/**
 * @swagger
 * /api/customers/{id}:
 *   get:
 *     summary: Get a customer by ID
 *     description: Get customer details by ID.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer details
 */
router.get("/:id", getCustomerById);

/**
 * @swagger
 * /api/customers/{id}:
 *   put:
 *     summary: Update customer
 *     description: Update customer details by ID.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer updated successfully
 */
router.put("/:id", updateCustomer);

/**
 * @swagger
 * /api/customers/{id}:
 *   delete:
 *     summary: Delete customer
 *     description: Delete a customer by ID.
 *     tags: [Customers]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Customer deleted successfully
 */
router.delete("/:id", deleteCustomer);

module.exports = router;