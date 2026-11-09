const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/subscribers:
 *   post:
 *     tags: [Documents]
 *     summary: Subscribe new contacts
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
 *       required: false
 *       content:
 *         application/x-www-form-urlencoded:
 *           schema:
 *             type: object
 *             properties:
 *               subscribers:
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Updated list of Employee subscribers (document_details, range_collections groups)
 *       400:
 *         description: Return on validation error
 *       404:
 *         description: Return when document not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Post and @IsGranted)
router.post(
  "/documents/:id/subscribers",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id } = req.params;

      // 4. Extracting Body Parameters (Form Data)
      const { subscribers } = req.body;

      // TODO: Fetch the existing document and verify permissions
      // const document = await db.document.findUnique({ where: { id } });
      // if (!document) throw new Error("Document not found");

      // TODO: Process and save the subscribers (Range entities structure)
      // subscribers payload structure expected:
      // [
      //   {
      //       id: "(string)",
      //       type: "'contact' | 'organisation'",
      //       selector: "(string)",
      //       entities: ["entityId1", "entityId2"]
      //   }
      // ]
      // const updatedSubscribers = await documentService.addSubscriberRanges(id, subscribers);

      // 5. Send the Response
      // Status 201 Created as per PHP documentation
      // Note: As per @SWG\Schema(type="array"), the data property should return an array of employees/subscribers
      res.status(201).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_details", "range_collections")
        data: [], // Replace with updatedSubscribers array
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(400).json({
        success: false,
        message: "Validation error or unable to subscribe contacts",
        error: error.message
      });
    }
  }
);

module.exports = router;