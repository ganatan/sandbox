/**
 * @swagger
 * /api/cities:
 *   get:
 *     summary: Récupère toutes les villes
 *     tags:
 *       - Cities
 *     responses:
 *       200:
 *         description: Liste des villes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/City'
 */

/**
 * @swagger
 * components:
 *   schemas:
 *     City:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         name:
 *           type: string
 */
