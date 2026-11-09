const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}:
 *   get:
 *     tags: [Documents]
 *     summary: Gets a specific document version
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
 *       - in: path
 *         name: vid
 *         required: true
 *         schema:
 *           type: string
 *         description: "DocumentVersion GUID"
 *     responses:
 *       200:
 *         description: Returned when successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: object
 *                   description: Specific document version details
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/versions/:vid",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your auth logic
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, vid } = req.params;

      // TODO: Fetch the specific document version from the database
      // This is equivalent to calling getDocumentVersionEntity($id, $vid) in PHP
      
      // Example using Prisma:
      // const documentVersion = await db.documentVersion.findFirst({
      //   where: {
      //     id: vid,
      //     documentId: id
      //   }
      // });
      
      // if (!documentVersion) {
      //   throw new Error("Document version not found");
      // }

      // 4. Send the Response (in JSON format)
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_versions")
        data: {}, // Replace with documentVersion data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document version not found",
        error: error.message
      });
    }
  }
);

module.exports = router;