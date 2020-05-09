import db from '../main.js'
import firebase from "firebase";



// // LOGIN
// export const login = (user, pass) => {
//     firebase
//         .auth()
//         .signInWithEmailAndPassword(this.user, this.password)
//         .then(
//             user => {
//                 this.user = user;
//                 console.log("user", user);
//                 this.$router.replace("home");
//             },
//             error => console.error(error)
//         );
// }

// // LOGOUT
// export const logOut = () =>  {
//     firebase
//         .auth()
//         .signOut()
//         .then(() => {
//             this.$router.replace('login')
//         })
//         .catch((error) => console.error(error));
// }

// //SHOW THE ARRAY PEOPLE
// export const showPeople = () =>  {
//     return new promise
//     db.collection("people").get().then((querySnapshot) => {      
//         querySnapshot.forEach((person) => {
//             this.people.push({
//                 name: person.data().name,
//                 id: person.id
//             })
//             console.log(`${person.id} => ${person.data()}`);
//         });
//     });
// }

// // ADD NAME TO PEOPLE ARRAY
// export default  async  () => {
//     if (this.person !== null && this.person !== "") {
//         this.people.push({
//             name: this.person
//         });
//     }
//     try {
//         if (this.person) {
//             await db.collection('people').add({
//                 name: this.person
//             })
//             this.person = null
//         } else {
//             alert("Se te olvidó añadir a alguien")
//         }
//     } catch (error) {
//         console.log(error)
//     }
// }

// // DELETE A NAME FROM PEOPLE ARRAY
// export const deletePerson = (personId) =>  {
//     db.collection("people")
//         .doc(personId)
//         .delete()
//         .then((data) => {
//             console.log("Documento borrado");
//             console.log(data)
//             this.people = []
//             // this.people = this.people.filter(e => e.id !== personId)
//             this.showPeople()
//         })
//         .catch(function (error) {
//             console.error("Error al borrar el documento: ", error);
//         });
// }