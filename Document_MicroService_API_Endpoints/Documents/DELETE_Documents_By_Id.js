const express = require("express");
const router = express.Router();

// 1. Swagger Documentation (using JSDoc format)
/**
 * @swagger
 * /documents/{id}:
 *   delete:
 *     tags: [Documents]
 *     summary: Deletes a Document object and all data related
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
 *         name: confirm
 *         required: false
 *         schema:
 *           type: boolean
 *         description: "Confirm delete?"
 *     responses:
 *       200:
 *         description: Returned when confirmation required
 *       204:
 *         description: Returned when successful (No Content)
 *       404:
 *         description: Return when not found
 */

// 2. Route & Security Middleware (Equivalent to @Rest\Delete and @IsGranted)
router.delete(
  "/documents/:id",
  verifyToken,
  checkRole("ROLE_USER"), // or "IS_TOKEN_FULL" depending on your auth setup
  async (req, res) => {
    try {
      // 3. Extracting Path and Query Parameters
      const { id } = req.params; // From the URL path (/documents/123)
      const { confirm } = req.query; // From the URL query string (?confirm=true)

      // TODO: Fetch the document from the database to ensure it exists
      // Example: const document = await db.document.findUnique({ where: { id } });
      // if (!document) throw new Error("Not found");

      // 4. Check if confirmation is provided
      if (confirm === 'true') {
        // TODO: Perform the actual deletion in the database
        // Example: await db.document.delete({ where: { id } });

        // Status 204 means "No Content", which is standard for successful DELETE operations
        return res.status(204).send(); 
      } else {
        // If confirm is not true, just return a report/warning (Status 200)
        // Equivalent to returning the "DocumentReport" serializer group in PHP
        return res.status(200).json({
          success: true,
          message: "Confirmation is required to delete this document and all related data.",
          data: {
             // Return document report details here
          }
        });
      }

    } catch (error) {
      // Handle errors (e.g., document not found)
      res.status(404).json({
        success: false,
        message: "Document not found",
      });
    }
  }
);

module.exports = router;