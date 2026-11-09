const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}:
 *   get:
 *     tags: [Documents]
 *     summary: Gets an individual Document
 *     description: **Required permissions:** ***ROLE_USER***
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: "Document GUID"
 *     responses:
 *       200:
 *         description: Returned when successful
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get("/documents/{id}") and @IsGranted)
router.get(
  "/documents/:id",
  verifyToken,
  checkRole("ROLE_USER"), // Note: Your PHP had IS_TOKEN_FULL, but description says ROLE_USER. Adjust as needed.
  async (req, res) => {
    try {
      // 3. Extracting Path Parameter (Equivalent to taking {id} from URL)
      const { id } = req.params;

      // TODO: Perform database query here (using Prisma, Mongoose, etc.)
      // Make sure to also implement permission checks before returning data
      // Example: const document = await db.document.findUnique({ where: { id } });

      // If document doesn't exist, throw error to go to catch block
      // if (!document) throw new Error("Not found");

      // 4. Send the Response (in JSON format)
      res.status(200).json({
        success: true,
        // The PHP version had a very complex serializer group list. 
        // In Node, you will filter the document object here to only include those allowed fields.
        data: document, 
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }
  }
);

module.exports = router;