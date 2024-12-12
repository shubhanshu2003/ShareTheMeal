import { Router } from "express";
import db from '../config/pg.js'

const router = Router();

// Route to handle food donation form submission
router.post("/fooddonation", async (req, res) => {
    try {
        const { foodName, foodTag, quantity, expiryDate, address, email } = req.body.formData;
        const addFood = await db.query("INSERT INTO foods (foodName , foodtag, quantity, expirydate,address) VALUES ($1, $2 , $3 ,$4, $5)",
            [foodName,foodTag,quantity,expiryDate, address ]
        );
        res.status(201).json(addFood);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Server Error" });
    }
});

export default router;
