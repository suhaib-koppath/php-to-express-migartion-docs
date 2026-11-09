const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/comments:
 *   post:
 *     tags: [Documents]
 *     summary: Send a new comment
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - comment
 *             properties:
 *               comment:
 *                 type: string
 *                 description: "Comment body"
 *               documents:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of DocumentVersion GUIDs (Optional)"
 *     responses:
 *       201:
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
 *                     description: DocumentComment details (Equivalent to comment_list group)
 *       400:
 *         description: Return on validation error
 *       404:
 *         description: Return when document not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Post and @IsGranted)
router.post(
  "/documents/:id/comments",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id } = req.params;

      // 4. Extracting Body Parameters (Form Data)
      const { comment, documents } = req.body;

      // Basic validation: comment is nullable=false in PHP
      if (!comment || typeof comment !== 'string' || comment.trim() === '') {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'comment' body is required."
        });
      }

      // TODO: Fetch the existing document and verify access permissions
      // const document = await db.document.findUnique({ where: { id } });
      // if (!document) throw new Error("Document not found");

      // TODO: Create the new comment and link any optional DocumentVersion GUIDs
      // Example using Prisma:
      // const newComment = await db.documentComment.create({
      //   data: {
      //     body: comment,
      //     documentId: id,
      //     authorId: req.user.id, // Assuming req.user is set by verifyToken
      //     // Handle 'documents' array logic here if needed (e.g., linking specific versions)
      //   }
      // });

      // TODO: Fetch the updated list of comments (Since PHP returns an array of all comments upon success)
      // const allComments = await db.documentComment.findMany({ where: { documentId: id } });

      // 5. Send the Response
      // Status 201 Created as per PHP documentation
      res.status(201).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "comment_list")
        // Notice it returns an Array as per @SWG\Schema(type="array")
        data: [], // Replace with allComments array or just the [newComment] based on exact PHP behavior
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document not found or unable to create comment",
        error: error.message
      });
    }
  }
);

module.exports = router;