
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import db from '../config/pg.js'
dotenv.config();


// Salt
const salt = await bcrypt.genSalt();

export async function signUp(req, res) {
    const { email, password, name, number } = req.body;
    
    try {
        // Check if the user already exists
        // const existingUser = await User.findOne({ email });
        // console.log(`SELECT ${email} FROM users`)
        // if (existingUser) {
        //     // return res.status(400).json({ message: 'User already exists' });
          const findEmail = await db.query(`SELECT email FROM users  WHERE email = ($1)`, [email])
          console.log(findEmail.rows)
         
            if(findEmail.rows.length !== 0){
                throw ("Already exists")
            }
        // }

        

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create the user in the database
        const newUser =await db.query("INSERT INTO users (email, password , name , number) VALUES ($1,$2,$3,$4) RETURNING *",[email,hashedPassword,name,number]);

            console.log(newUser.rows[0].email)
        // // Generate a JWT token
        const token = jwt.sign({ email: newUser.rows[0].email, id: newUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });

        res.status(201).json({Token :  token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error });
    }
}

export async function signIn(req, res) {
    const { email, password } = req.body;

    try {
        // Check if the user exists
        // const existingUser = await User.findOne({ email });
        const checkUser = await db.query(`SELECT * FROM users  WHERE email = ($1)`, [email])
        if(checkUser.rows.length === 1){

          
            
           
            // if (!existingUser) {
                //     return res.status(404).json({ message: "User doesn't exist" });
                // }
                
                // Check if the password is correct
                const isPasswordCorrect = await bcrypt.compare(password, checkUser.rows[0].password);
                if (!isPasswordCorrect) {
                    return res.status(400).json({ message: 'Invalid credentials' });
                }
                
                // // Generate a JWT token
                const token = jwt.sign({ email: email, id: checkUser.rows[0].id }, process.env.JWT_SECRET, { expiresIn: '1h' });
                const user={
                    id:checkUser.rows[0].id,
                    name:checkUser.rows[0].name,
                    email:checkUser.rows[0].email,
                    number:checkUser.rows[0].number,
    
                }
                console.log(user)
                res.status(200).json({Token : token,
                    user:user
                });
            }else{
                throw ("not exists")
            }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message:error });
    }
}


