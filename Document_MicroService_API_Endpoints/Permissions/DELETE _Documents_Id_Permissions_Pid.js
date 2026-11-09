const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/permissions/{pid}:
 *   delete:
 *     tags: [Documents]
 *     summary: Deletes a DocumentPermission
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
 *         name: pid
 *         required: true
 *         schema:
 *           type: string
 *         description: "DocumentPermission GUID"
 *     responses:
 *       204:
 *         description: Returned when successful (No Content)
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Delete and @IsGranted)
router.delete(
  "/documents/:id/permissions/:pid",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, pid } = req.params;

      // TODO: Fetch the existing document permission and verify it belongs to the document
      // const permissionRecord = await db.documentPermission.findFirst({
      //   where: { id: pid, documentId: id }
      // });
      // if (!permissionRecord) throw new Error("Document permission not found");

      // TODO: Perform the hard delete / deletion of the permission record
      // Example using Prisma:
      // await db.documentPermission.delete({
      //   where: { id: pid }
      // });

      // 4. Send the Response
      // 204 Status Code means "No Content" - Action was successful, but nothing to return back
      res.status(204).send();
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document permission not found",
        error: error.message
      });
    }
  }
);

module.exports = router;