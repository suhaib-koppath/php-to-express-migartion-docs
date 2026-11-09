const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/permissions:
 *   get:
 *     tags: [Documents]
 *     summary: Gets a collection of Document's permissions
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
 *                     description: DocumentPermission details (document_permissions, range_collections groups)
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/permissions",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id } = req.params;

      // TODO: Fetch the document and verify access permissions
      // const document = await db.document.findUnique({ where: { id } });
      // if (!document) throw new Error("Document not found");

      // TODO: Fetch the permissions associated with this document
      // Example using Prisma:
      // const documentPermissions = await db.documentPermission.findMany({
      //   where: { documentId: id },
      //   include: { rangeCollection: true } // Assuming relation for range_collections group
      // });

      // 4. Send the Response (in JSON format)
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_permissions", "range_collections")
        // Note: Returns an array as specified by @SWG\Schema(type="array")
        data: [], // Replace with documentPermissions array
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document or permissions not found",
        error: error.message
      });
    }
  }
);

module.exports = router;