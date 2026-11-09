const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/permissions/{pid}:
 *   put:
 *     tags: [Documents]
 *     summary: Update a DocumentPermission
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
 *         description: "Document Permission GUID"
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - bitcode
 *             properties:
 *               bitcode:
 *                 type: integer
 *                 description: "Enabled document permission bits"
 *               ranges:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of Range entities (JSON string representation or array)"
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
 *                   description: Updated DocumentPermission details (document_permissions, range_collections groups)
 *       400:
 *         description: Return on validation error (e.g., missing bitcode)
 *       404:
 *         description: Return when document or permission not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Put and @IsGranted)
router.put(
  "/documents/:id/permissions/:pid",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, pid } = req.params;

      // 4. Extracting Body Parameters (Form Data)
      const { bitcode, ranges } = req.body;

      // Basic validation: bitcode is marked as nullable=false in PHP
      if (bitcode === undefined || bitcode === null || bitcode === '') {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'bitcode' is required."
        });
      }

      // TODO: Fetch the existing document and permission record to verify they exist
      // const permissionRecord = await db.documentPermission.findFirst({
      //   where: { id: pid, documentId: id }
      // });
      // if (!permissionRecord) throw new Error("Document permission not found");

      // TODO: Update the DocumentPermission entity with the new bitcode and ranges
      // Expected ranges structure:
      // [
      //   {
      //       id: "(string)",
      //       type: "'contact' | 'organisation'",
      //       selector: "(string)",
      //       entities: ["entityId1", "entityId2"]
      //   }
      // ]
      // Example using Prisma:
      // const updatedPermission = await db.documentPermission.update({
      //   where: { id: pid },
      //   data: {
      //     bitcode: parseInt(bitcode, 10),
      //     // Handle ranges / range collections update here
      //   }
      // });

      // 5. Send the Response
      // Status 200 OK as per PHP documentation
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_permissions", "range_collections")
        data: {}, // Replace with updatedPermission data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document, permission not found, or update failed",
        error: error.message
      });
    }
  }
);

module.exports = router;