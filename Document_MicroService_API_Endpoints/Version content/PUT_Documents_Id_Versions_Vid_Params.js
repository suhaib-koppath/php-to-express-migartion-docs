const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}/params:
 *   put:
 *     tags: [Documents]
 *     summary: Sets the params of a specific document version
 *     description: >
 *       **Required permissions:** ***ROLE_USER***.
 *       Only allowed for standalone document types (STATION, FORMLENS, DASHBOARD, PDF, REGISTEREXPORT).
 *       Note: The params object must be sent as the raw JSON request body, not as form data.
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
 *       description: Params object as the raw JSON request body
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             additionalProperties: true
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
 *                   description: Updated DocumentVersion details with params payload
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Put and @IsGranted)
router.put(
  "/documents/:id/versions/:vid/params",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your needs
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, vid } = req.params;

      // 4. Extracting the raw JSON body
      // PHP comment specifies: "The params object is sent as the raw JSON request body"
      const paramsObject = req.body; 

      // Ensure body is an object and not empty (optional basic validation)
      if (!paramsObject || typeof paramsObject !== 'object' || Array.isArray(paramsObject)) {
         return res.status(400).json({
             success: false,
             message: "Invalid payload. A JSON object is required."
         });
      }

      // TODO: Fetch the existing document version and check its type (must be standalone)
      // const existingVersion = await db.documentVersion.findFirst({ ... });
      // if (!existingVersion) throw new Error("Document version not found");
      // if (!["STATION", "FORMLENS", "DASHBOARD", "PDF", "REGISTEREXPORT"].includes(existingVersion.document.type)) {
      //    throw new Error("Action only allowed for standalone document types");
      // }

      // TODO: Update the params in the database
      // Example using Prisma:
      // const updatedVersion = await db.documentVersion.update({
      //   where: { id: vid },
      //   data: { params: paramsObject }
      // });

      // 5. Send the Response (in JSON format)
      // As noted in previous GET endpoint, res.json() will automatically preserve null values.
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_version_params")
        data: {}, // Replace with updatedVersion data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document version not found or update failed",
        error: error.message
      });
    }
  }
);

module.exports = router;