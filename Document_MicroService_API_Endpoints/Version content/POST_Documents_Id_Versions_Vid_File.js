const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}/file:
 *   post:
 *     tags: [Documents]
 *     summary: Creates a file for a specific document version
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
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - location
 *             properties:
 *               location:
 *                 type: string
 *                 description: "S3 file location"
 *               filename:
 *                 type: string
 *                 description: "File name during download"
 *               description:
 *                 type: string
 *                 description: "File description"
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
 *                   description: Newly created File details
 *       400:
 *         description: Return on validation error (e.g., missing location)
 *       404:
 *         description: Return when document or version not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Post and @IsGranted)
router.post(
  "/documents/:id/versions/:vid/file",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, vid } = req.params;

      // 4. Extracting Body Parameters (Form Data)
      const { location, filename, description } = req.body;

      // Basic validation: location is marked as nullable=false in PHP
      if (!location) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'location' is required."
        });
      }

      // TODO: Fetch the existing document version and verify access permissions
      // const existingVersion = await db.documentVersion.findFirst({ ... });
      // if (!existingVersion) throw new Error("Document version not found");

      // TODO: Create the File entity in the database and link it to the version
      // Example using Prisma:
      // const newFile = await db.file.create({
      //   data: {
      //     location,
      //     filename,
      //     description,
      //     documentVersionId: vid
      //   }
      // });

      // 5. Send the Response
      // Note: The PHP doc says response="200" even though it's a POST. 
      // Usually POST returns 201 Created, but we are keeping 200 to match your PHP spec exactly.
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_versions", "document_file")
        // Notice it returns the File object, not the version object (ref=@Model(type="App\Entity\File"))
        data: {}, // Replace with newFile data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document or version not found, or file creation failed",
        error: error.message
      });
    }
  }
);

module.exports = router;