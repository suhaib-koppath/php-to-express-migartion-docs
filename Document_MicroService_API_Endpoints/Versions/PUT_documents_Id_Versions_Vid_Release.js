const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}/release:
 *   put:
 *     tags: [Documents]
 *     summary: Release a new version from a specific document version
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
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               description:
 *                 type: string
 *                 description: "Release description, optional"
 *               location:
 *                 type: string
 *                 description: "S3 file location"
 *               filename:
 *                 type: string
 *                 description: "File name during download"
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
 *                   description: Newly released DocumentVersion details
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Put and @IsGranted)
router.put(
  "/documents/:id/versions/:vid/release",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your needs
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, vid } = req.params;

      // 4. Extracting Body Parameters (Form Data)
      const { description, location, filename } = req.body;

      // TODO: Fetch the existing document and version, check permissions
      // const existingVersion = await db.documentVersion.findFirst({ ... });
      // if (!existingVersion) throw new Error("Document version not found");

      // TODO: Perform the release logic (e.g., create a new released version or update status)
      // const releasedVersion = await releaseVersionService(id, vid, { description, location, filename });

      // 5. Send the Response
      // Status 200 OK since we are updating/releasing an existing version (based on the PHP response="200")
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_versions")
        data: {}, // Replace with the actual releasedVersion data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document or version not found, or release failed",
        error: error.message
      });
    }
  }
);

module.exports = router;