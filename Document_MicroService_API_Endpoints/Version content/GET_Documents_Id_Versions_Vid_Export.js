const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}/export:
 *   get:
 *     tags: [Documents]
 *     summary: Exports a specific document version
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
 *         name: format
 *         required: true
 *         schema:
 *           type: string
 *           enum: [HTML, PDF, XLSX, DOCX]
 *         description: "Export file format: HTML, PDF, XLSX or DOCX"
 *       - in: query
 *         name: orientation
 *         required: false
 *         schema:
 *           type: string
 *           enum: [landscape, portrait]
 *           default: portrait
 *         description: "Page orientation: landscape / portrait, Default: portrait"
 *       - in: query
 *         name: hide_cover
 *         required: false
 *         schema:
 *           type: boolean
 *           default: false
 *         description: "Should hide the cover page, Default: false"
 *     responses:
 *       200:
 *         description: Binary file returned when successful
 *         content:
 *           application/octet-stream:
 *             schema:
 *               type: string
 *               format: binary
 *           application/pdf:
 *             schema:
 *               type: string
 *               format: binary
 *       400:
 *         description: Return on validation error (e.g., missing format)
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/versions/:vid/export",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path and Query Parameters
      const { id, vid } = req.params;
      const { format, orientation = 'portrait', hide_cover = 'false' } = req.query;

      // Basic validation: format is nullable=false in PHP
      if (!format) {
        return res.status(400).json({
          success: false,
          message: "Validation Error: 'format' query parameter is required (HTML, PDF, XLSX, DOCX)."
        });
      }

      // TODO: Fetch the document version and verify access
      // const documentVersion = await db.documentVersion.findFirst({ ... });
      // if (!documentVersion) throw new Error("Document version not found");

      // TODO: Generate the export file based on the requested format and options
      // const fileBuffer = await documentExportService.generate(id, vid, { format, orientation, hide_cover });
      
      // 4. Send the Response (Binary File)
      // Set appropriate headers based on the format
      const contentTypeMap = {
        'PDF': 'application/pdf',
        'HTML': 'text/html',
        'XLSX': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'DOCX': 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
      };

      const contentType = contentTypeMap[format.toUpperCase()] || 'application/octet-stream';
      const fileName = `export_${vid}.${format.toLowerCase()}`;

      res.setHeader('Content-Type', contentType);
      res.setHeader('Content-Disposition', `attachment; filename="${fileName}"`);
      
      // Assuming 'fileBuffer' contains the generated file data
      // return res.send(fileBuffer); 

      // Temporary response for placeholder
      res.status(200).send("Binary file content goes here");
      
    } catch (error) {
      // Handle errors and return appropriate status codes
      // Note: Error response is JSON, even though success response is binary
      res.status(404).json({
        success: false,
        message: "Document version not found or export failed",
        error: error.message
      });
    }
  }
);

module.exports = router;