const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/subscribers:
 *   get:
 *     tags: [Documents]
 *     summary: Gets a collection of Document's subscribers
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
 *         name: contacts
 *         required: false
 *         schema:
 *           type: boolean
 *         description: "Show contact list instead of range collections"
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
 *                   type: array
 *                   items:
 *                     type: object
 *                     description: Subscriber (Employee) details or Contact list
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/subscribers",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your authorization strategy
  async (req, res) => {
    try {
      // 3. Extracting Path and Query Parameters
      const { id } = req.params;
      const { contacts } = req.query;

      // TODO: Fetch the document and verify access permissions
      // const document = await db.document.findUnique({ where: { id } });
      // if (!document) throw new Error("Document not found");

      // TODO: Fetch the subscribers or contacts based on the 'contacts' query parameter
      // let resultData = [];
      // if (contacts === 'true') {
      //     // Logic to fetch and return the contact list for this document
      //     // resultData = await getDocumentContacts(id);
      // } else {
      //     // Logic to fetch range collections / employees subscribed to this document
      //     // resultData = await getDocumentSubscribers(id);
      // }

      // 4. Send the Response (in JSON format)
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_details", "range_collections")
        // Note: Returns an array as specified by @SWG\Schema(type="array")
        data: [], // Replace with resultData (Array of employees/contacts)
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Document or subscribers not found",
        error: error.message
      });
    }
  }
);

module.exports = router;