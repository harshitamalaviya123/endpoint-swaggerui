/**
 * External Routes
 * Contains documentation-only routes for external API testing.
 */

/**
 * @openapi
 * /contact/search/contact:
 *   post:
 *     tags:
 *       - External Search
 *     summary: Search contact from external prospectconnect API
 *     description: This is a standalone route for testing external API with Authorization header. It does not hit the local backend.
 *     servers:
 *       - url: https://api.prospectconnect.ai
 *     security:
 *       - AuthorizationHeader: []
 *     responses:
 *       200:
 *         description: Search results from the external API.
 */
