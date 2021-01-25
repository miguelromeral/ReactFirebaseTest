// import React, { useContext, useState, useEffect } from "react";
// import { UserContext } from "../providers/UserProvider";
// import { auth, firestore } from "../firebase.config";
// import Message from "../classes/messageClass"
// import Error from './error'
// import Layout from "../components/layout";

// const MessagesPage = () => {
//   const [user, setUser] = useState(null)
//   const [data, setData] = useState([])

//   useEffect(() => {
//     const onResult = (querySnapshot) => {
//       console.log('Total messages: ', querySnapshot.size);
//       const objectsArray = new Array();

//       querySnapshot.forEach(documentSnapshot => {
//         var id = documentSnapshot.id
//         var data = documentSnapshot.data()
//         objectsArray.push(new Message(id, data.content))
//       });

//       setData(objectsArray)
//     }

//     const onError = (error) => {
//       setData([])
//     }

//     const fetchData2 = async (authUser) => {
//       try {
//         await firestore.collection(`${authUser.uid}`).onSnapshot(onResult, onError)
//       } catch (e) {
//         console.error("Error: " + e)
//       }
//     }

//     const fetchData = async () => {

//       auth.onAuthStateChanged(
//         authUser => {
//           if (authUser) {
//             console.log("Auth User: " + authUser)
//             setUser(authUser)
//             fetchData2(authUser)
//           } else {
//             console.log("No user");
//             setUser(null)
//           }

//         },
//       );
//     }
//   }, [])



//   if (user == null || user == undefined) {
//     return <Error description="Sin usuario" />
//   }

//   return (
//     <Layout>
//       Messages!
//       {data.forEach(data => {
//         <div>
//           {data}
//         </div>
//       })}
//     </Layout>
//   )
// };

// export default MessagesPage;