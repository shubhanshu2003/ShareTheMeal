import { Router } from 'express';
import db from '../config/pg.js'; // Ensure this points to your PostgreSQL configuration

const userouter = Router();

userouter.put('/update', async (req, res) => {
    console.log("hit1")
    const { id, name, number, email } = req.body;

    try {
        // Execute SQL update query
        const result = await db.query(
            'UPDATE users SET name = $1, number = $2, email = $3 WHERE id = $4 RETURNING *',
            [name, number, email, id]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Return the updated user object
        res.json(result.rows[0]);
    } catch (error) {
        console.error("Error updating user:", error.message);
        res.status(500).json({ message: 'Server Error' });
    }

    
});

// export default router;


export default userouter