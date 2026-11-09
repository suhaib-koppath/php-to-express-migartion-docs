const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/comments:
 *   get:
 *     tags: [Documents]
 *     summary: Gets a collection of Document's comments
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
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: DocumentComment details (comment_list group)
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/comments",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id } = req.params;

      // TODO: Fetch the specific document and ensure the user has access
      // const document = await db.document.findUnique({ where: { id } });
      // if (!document) throw new Error("Document not found");

      // TODO: Fetch all comments associated with this document
      // Example using Prisma:
      // const documentComments = await db.documentComment.findMany({
      //   where: { documentId: id },
      //   orderBy: { createdAt: 'asc' } // Usually comments are ordered chronologically
      // });

      // 4. Send the Response (in JSON format)
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "comment_list")
        // Note: As per @SWG\Schema(type="array"), this should return an array of comments
        data: [], // Replace with documentComments array
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document or comments not found",
        error: error.message
      });
    }
  }
);

module.exports = router;