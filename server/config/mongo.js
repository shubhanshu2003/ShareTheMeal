import pg from 'pg'

// module.exports = async function connectDB() {
//     try {
   
//     db = new pg.Client({
//         user:"postgres",
//         host:"localhost",
//         database:"ShareTheMEAL",
//         password:"22112003",
//         port:5432
//     })
//     db.connect();
//     // .then(()=>{
//         console.log("connected")
//     // })
//     } catch (err) {
//         console.error(err);
//         process.exit(1);
//     }
// };
const db = new pg.Client({
    user:"postgres",
    host:"localhost",
    database:"ShareTheMEAL",
    password:"22112003",
    port:5432
})
db.connect();


export default db