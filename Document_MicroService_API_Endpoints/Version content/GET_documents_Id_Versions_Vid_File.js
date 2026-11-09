const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}/file:
 *   get:
 *     tags: [Documents]
 *     summary: Gets the file of a specific document version
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
 *       - in: query
 *         name: is_attachment
 *         required: false
 *         schema:
 *           type: boolean
 *         description: "Should set content type header (for direct download)"
 *       - in: query
 *         name: via
 *         required: false
 *         schema:
 *           type: string
 *         description: "Access via Form - UUID"
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
 *                   description: File details including signed URL
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/versions/:vid/file",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your needs
  async (req, res) => {
    try {
      // 3. Extracting Path and Query Parameters
      const { id, vid } = req.params;
      const { is_attachment, via } = req.query;

      // TODO: Fetch the specific document version and its associated file
      // If 'via' parameter is provided, you might need to check if the user has access via that specific form UUID
      
      // Example logic:
      // const fileData = await getFileForDocumentVersion(id, vid, via, req.user);
      // if (!fileData) throw new Error("File not found or access denied");

      // TODO: If this is an actual file download route (not just returning JSON metadata)
      // and is_attachment is true, you would generate a Signed URL from S3 or pipe the file directly:
      // if (is_attachment === 'true') {
      //     const signedUrl = await s3.getSignedUrlPromise('getObject', { ... });
      //     return res.redirect(signedUrl); 
      //     // OR return the JSON with the signed URL as per the 'file_signed_url' serializer group
      // }

      // 4. Send the Response (in JSON format)
      // Assuming it returns JSON metadata containing the signed URL based on PHP @SWG\Schema(ref=@Model(type="App\Entity\File"))
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_versions", "document_file", "file_signed_url")
        data: {}, // Replace with fileData
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "File or document version not found",
        error: error.message
      });
    }
  }
);

module.exports = router;