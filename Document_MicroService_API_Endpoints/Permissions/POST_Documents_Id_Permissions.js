const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/permissions:
 *   post:
 *     tags: [Documents]
 *     summary: Create a DocumentPermission
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
 *                   type: object
 *                   description: Created DocumentPermission details (document_permissions, range_collections groups)
 *       400:
 *         description: Return on validation error (e.g., missing bitcode)
 *       404:
 *         description: Return when document not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Post and @IsGranted)
router.post(
  "/documents/:id/permissions",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id } = req.params;

      // 4. Extracting Body Parameters (Form Data)
      const { bitcode, ranges } = req.body;

      // Basic validation: bitcode is marked as nullable=false in PHP
      if (bitcode === undefined || bitcode === null || bitcode === '') {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'bitcode' is required."
        });
      }

      // TODO: Fetch the existing document and verify permissions
      // const document = await db.document.findUnique({ where: { id } });
      // if (!document) throw new Error("Document not found");

      // TODO: Create the DocumentPermission entity with bitcode and ranges
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
      // const newPermission = await db.documentPermission.create({
      //   data: {
      //     bitcode: parseInt(bitcode, 10),
      //     documentId: id,
      //     // Handle ranges / range collections mapping here
      //   }
      // });

      // 5. Send the Response
      // Status 201 Created as per PHP documentation
      res.status(201).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_permissions", "range_collections")
        data: {}, // Replace with newPermission data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(400).json({
        success: false,
        message: "Validation error or unable to create document permission",
        error: error.message
      });
    }
  }
);

module.exports = router;