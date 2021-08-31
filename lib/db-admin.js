import { compareDesc, parseISO } from "date-fns";
import firebase from "./firebase-admin";

export async function getAllFeedback(siteId) {
  try {
    const feedback= []
  const snapshot =await firebase.collection('feedback').where('siteId', '==', siteId).get();

  snapshot.forEach((doc) => {
    feedback.push({id: doc.id, ...doc.data()})
  });

  feedback.sort((a,b ) =>
   compareDesc(parseISO(a.createdAt), parseISO(b.createdAt))
   );

  return {feedback};
  } catch (erro) {
    return { error }
  }
  
}

export async function getAllSite(){
  try {
    const sites= []
  const snapshot =await firebase.collection('sites').get();

  snapshot.forEach((doc) => {
    sites.push({id: doc.id, ...doc.data()})
  });

  return {sites};

  } catch (error) {
    return { error }
  }
  
}


