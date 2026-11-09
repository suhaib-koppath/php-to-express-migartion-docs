const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}/versions/{vid}/form:
 *   get:
 *     tags: [Documents]
 *     summary: Gets the form of a specific document version
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
 *                   description: Form details associated with the document version
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Get and @IsGranted)
router.get(
  "/documents/:id/versions/:vid/form",
  verifyToken,
  checkRole("IS_TOKEN_FULL"), // Or "ROLE_USER" based on your setup
  async (req, res) => {
    try {
      // 3. Extracting Path Parameters
      const { id, vid } = req.params;

      // TODO: Fetch the specific document version and extract its related Form
      // Example using Prisma:
      // const documentVersion = await db.documentVersion.findFirst({
      //   where: {
      //     id: vid,
      //     documentId: id
      //   },
      //   include: {
      //     form: true // Assuming there is a relation named 'form'
      //   }
      // });
      
      // if (!documentVersion) {
      //   throw new Error("Document version not found");
      // }
      // if (!documentVersion.form) {
      //   throw new Error("Form not found for this version");
      // }

      // 4. Send the Response (in JSON format)
      res.status(200).json({
        success: true,
        // Filter and return required fields (Equivalent to Serializer Groups: "document_versions")
        // Notice we are returning the form object, not the whole document version, as per PHP @SWG\Schema(ref=@Model(type="App\Entity\Form"))
        data: {}, // Replace with documentVersion.form data
      });
    } catch (error) {
      // Handle errors and return appropriate status codes
      res.status(404).json({
        success: false,
        message: "Form or Document version not found",
        error: error.message
      });
    }
  }
);

module.exports = router;