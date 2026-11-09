const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/purge:
 *   delete:
 *     tags: [Documents]
 *     summary: Permanently purges a deleted Document
 *     description: **Required permissions:** ***isAdmin***
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
 *       204:
 *         description: Returned when successful (No Content)
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Delete and @IsGranted)
router.delete(
  "/documents/:id/purge",
  verifyToken,
  checkRole("isAdmin"), // Only Admins should permanently delete (purge) documents
  async (req, res) => {
    try {
      // 3. Extracting Path Parameter (Equivalent to URL {id})
      const { id } = req.params;

      // TODO: Perform security checks and database hard-delete logic here
      // 1. Check if document exists and is in the recycle bin
      // const document = await db.document.findUnique({ where: { id } });
      // if (!document || document.deletedAt === null) {
      //   return res.status(400).json({ message: "Document is not in the recovery bin." });
      // }
      
      // 2. Hard delete the document using Prisma/Mongoose
      // await db.document.delete({ where: { id } });

      // 4. Send the Response
      // 204 Status Code means "No Content" - Action was successful, but nothing to return
      res.status(204).send();
      
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document not found",
        error: error.message
      });
    }
  }
);

module.exports = router;