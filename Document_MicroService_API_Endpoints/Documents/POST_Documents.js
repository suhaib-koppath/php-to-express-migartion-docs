const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents:
 *   post:
 *     tags: [Documents]
 *     summary: Create new Document
 *     description: **Required permissions:** ***ROLE_USER***
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - document_type
 *               - document_folder
 *             properties:
 *               name:
 *                 type: string
 *                 description: "Document name"
 *               organisation:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array with organisation[id]"
 *               document_type:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array with document_type[id]"
 *               document_folder:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array with document_folder[id]"
 *               created_by:
 *                 type: string
 *                 description: "Contact GUID"
 *               created_date:
 *                 type: string
 *                 format: date-time
 *                 description: "Creation date"
 *               rp:
 *                 type: integer
 *                 default: 0
 *                 description: "Retention period"
 *               srf:
 *                 type: integer
 *                 default: 0
 *                 description: "Scheduled review frequency"
 *               description:
 *                 type: string
 *                 description: "Document description"
 *               owner:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Array of Range entities (JSON string representation)
                     ```[
                        {
                        id: (string)
                        type: (string) 'contact', 'organisation', etc...
                        selector: (string)
                        entites: [
                        'entityId1', 'entityId2'
                        ]
                        }
                        ]```"
 *               form:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Optional, form array with form[closed_date] and form[is_multiversion]"
 *               register:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Optional, register array with register[folder_id], register[color], register[icon]"
 *               is_default_permission:
 *                 type: boolean
 *                 description: "Optional, if should apply default document permissions to the new document?"
 *               allow_read_via_form:
 *                 type: boolean
 *                 description: "Enable read access via form, if referenced."
 *               manager:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Manager Range entity"
 *               member:
 *                 type: array
 *                 items:
 *                   type: string
 *                 description: "Member Range entity"
 *     responses:
 *       201:
 *         description: Returned when successful
 *       400:
 *         description: Return on validation error
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Post and @IsGranted)
router.post(
  "/documents",
  verifyToken,
  checkRole("IS_TOKEN_FULL"),
  async (req, res) => {
    try {
      // 3. Extracting Body Parameters (Equivalent to @Rest\RequestParam)
      const {
        name,
        organisation,
        document_type,
        document_folder,
        created_by,
        created_date,
        rp = 0,
        srf = 0,
        description,
        owner,
        form,
        register,
        is_default_permission,
        allow_read_via_form,
        manager,
        member,
      } = req.body;

      // TODO: Validation & Database Logic here
      // const newDocument = await db.document.create({ ... });

      // 4. Send the Response (in JSON format)
      res.status(201).json({
        success: true,
        data: {}, // Replace with created document data
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Validation error or failed to create document",
      });
    }
  },
);

module.exports = router;
