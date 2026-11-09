const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents:
 *   get:
 *     tags: [Documents]
 *     summary: Gets a filtered collection of existing Documents
 *     description: **Required permissions:** ***ROLE_USER***
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: name
 *         required: false
 *         schema:
 *           type: string
 *         description: "like search field in document name"
 *       - in: query
 *         name: organisation_type
 *         required: false
 *         schema:
 *           type: string
 *         description: "eg Constrain search to HQ, SUPPLIER DIVISION ETC or ALL"
 *       - in: query
 *         name: organisation_name
 *         required: false
 *         schema:
 *           type: string
 *         description: "like search field in organisation name"
 *       - in: query
 *         name: folder
 *         required: false
 *         schema:
 *           type: integer
 *         description: "Filter documents by their location""Filter documents by their location"
 *       - in: query
 *         name: document_type
 *         schema:
 *           type: string
 *         description: "Coma separated string of constrains, eg: REPORT,FORMTEMPLATE"
 *       - in: query
 *         name: recycle_bin
 *         schema:
 *           type: boolean
 *         description: "Show documents in recycle_bin"
 *     responses:
 *       200:
 *         description: Returned when successful
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents",
  verifyToken,
  checkRole("ROLE_USER"),
  async (req, res) => {
    try {
      // 3. Extracting Query Parameters (Equivalent to @Rest\QueryParam)
      const {
        name,
        organisation_type,
        organisation_name,
        folder,
        document_type,
        recycle_bin,
      } = req.query;

      // TODO: Perform security checks and database queries here (using Prisma, Mongoose, etc.)
      // Example: const documents = await db.document.findMany({ ... });

      // 4. Send the Response (in JSON format)
      res.status(200).json({
        success: true,
        // Filter and return only the required fields here (Equivalent to Serialization Groups)
        data: documents,
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Documents not found",
      });
    }
  },
);

module.exports = router;
