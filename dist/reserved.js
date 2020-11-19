"use strict";
// api.ts
/*
export const registration = (req: Request, res: Response) => {
    const user: User = req.body.user;
    checkIfUserAlreadyRegistered(user, (userFound: boolean) => {
        if(userFound){
            console.log("Istnieje juz konto z takimi danymi");
        }else{
          bcrypt.hash(user.password, 12)
            .then((hashedPswd) => {
                let password = hashedPswd
                saveUser({ ...user, password })
            })
            .then(() => res.redirect("/user"))
            .catch((err) => console.log(err))
        }
    })
}
*/
// checkIfUserAlready...
/*
export const checkIfUserAlreadyRegistered = (user: User, cb: Function) => {
    fetchAllUsers()
      .then(res => {
         const rows = res[0];
         const usersFromDB = Object.values(JSON.parse(JSON.stringify(rows)));
         const userFound = usersFromDB.some(item => searchForUser(item, user))
       cb(userFound)
      })
      .catch(err => console.log(err))

}*/
// SERVER SIDE EVENTS
/*
import SSE from 'express-sse-ts';



const sse = new SSE();

app.get('/events', sse.init);

setInterval(() => {
  sse.send(`Istnieje juz konto z takimi danymi`);
}, 1000);
*/ 
