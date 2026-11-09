const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}/params:
 *   get:
 *     tags: [Documents]
 *     summary: Gets the params of a specific document version
 *     description: >
 *       **Required permissions:** ***ROLE_USER***.
 *       Returns the document version details together with its params payload.
 *       Params are only populated for standalone document types (STATION, FORMLENS, DASHBOARD, PDF, REGISTEREXPORT).
 *       Note: Response preserves null values inside params.
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
 *                   description: DocumentVersion details with params payload
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/versions/:vid/params",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your needs
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, vid } = req.params;

      // TODO: Fetch the specific document version and its parameters from the database
      // Ensure that your database query fetches the 'params' JSON field.
      // Example using Prisma:
      // const documentVersion = await db.documentVersion.findFirst({
      //   where: {
      //     id: vid,
      //     documentId: id
      //   },
      //   select: {
      //     id: true,
      //     versionName: true, // Example field
      //     params: true, // The JSON params payload
      //     // Include other required fields for "document_version_params" group
      //   }
      // });
      
      // if (!documentVersion) {
      //   throw new Error("Document version not found");
      // }

      // 4. Send the Response (in JSON format)
      // Note from PHP: Response is serialized manually with serializeNull enabled.
      // In Express with JSON.stringify (which res.json uses), null values inside objects are preserved automatically.
      res.status(200).json({
        success: true,
        data: {}, // Replace with documentVersion data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document version or params not found",
        error: error.message
      });
    }
  }
);

module.exports = router;