import { Router } from "express";
import db from '../config/pg.js';

const router = Router();



router.get('/allfoods', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM foods'); // Query to fetch all records from the foods table
        res.status(200).json(result.rows); // `rows` contains the data from the query
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Server Error' });
    }
});


export default router;




