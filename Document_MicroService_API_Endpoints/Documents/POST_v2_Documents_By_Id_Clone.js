const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /v2/documents/{id}/clone:
 *   post:
 *     tags: [Documents]
 *     summary: Clones an existing Document and its Form and Workflow
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
 *       - in: query
 *         name: content
 *         required: false
 *         schema:
 *           type: boolean
 *         description: "Clone content?"
 *       - in: query
 *         name: is_share_settings
 *         required: false
 *         schema:
 *           type: boolean
 *         description: "Clone settings?"
 *     requestBody:
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Document name"
 *               document_type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array with document_type[id]"
 *               document_version:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array with document_version[id]"
 *               document_folder:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array with document_folder[id]"
 *               description:
 *                 type: string
 *                 description: "Document description"
 *               owner:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of Range entities (JSON string representation)"
 *               is_default_permission:
 *                 type: boolean
 *                 description: "Optional, if should apply default document permissions to the new document?"
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
 *       400:
 *         description: Return on validation error
 *       404:
 *         description: Return when original document or required relations not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Post and @IsGranted)
// Notice the /v2/ prefix in the route path
router.post(
  "/v2/documents/:id/clone",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on exact requirements
  async (req, res) => {
    try {
      // 3. Extracting Path and Query Parameters
      const { id } = req.params; // The original document ID to clone
      const { content, is_share_settings } = req.query; // ?content=true&is_share_settings=true

      // 4. Extracting Body Parameters (Form Data)
      const {
        name,
        document_type,
        document_version,
        document_folder,
        description,
        owner,
        is_default_permission,
      } = req.body;

      // TODO: Implement the deep cloning logic here for V2 API
      // 1. Fetch original document (e.g., const originalDoc = await db.document.findUnique(...))
      // 2. Check permissions (CP - Copy Permission)
      // 3. Clone the document record, form, and versions
      // 4. Apply new name, description, and folder if provided in req.body
      // 5. Setup new permissions and log the action
      // 6. Clone content if req.query.content is true

      // Example: const clonedDocument = await cloneDocumentServiceV2(...);

      // 5. Send the Response
      // 201 Created status code for successful POST (clone creation)
      res.status(201).json({
        success: true,
        // Filter and return required fields
        data: {}, // Replace with clonedDocument data
      });
    } catch (error) {
      // Handle validation errors or database failures
      res.status(error.statusCode || 400).json({
        success: false,
        message: "Validation error or unable to clone document",
        error: error.message
      });
    }
  }
);

module.exports = router;