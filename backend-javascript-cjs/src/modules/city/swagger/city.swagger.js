/**
 * @openapi
 * /cities:
 *   get:
 *     summary: Récupère la liste des villes
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Succès - Retourne la liste des villes
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: integer
 *                         example: 1
 *                       name:
 *                         type: string
 *                         example: Paris
 */
