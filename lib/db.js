import firebase from "./firebase";
import "firebase/firestore";

const firestore = firebase.firestore();

export function createUser(uid, data) {
  return firestore
    .collection("users")
    .doc(uid)
    .set({ uid, ...data }, { merge: true });
}

export function createSite(data) {
  const site = firestore.collection("sites").doc();
  site.set(data);
  return site;
}

export async function deleteSite(id) {
  firestore.collection("sites").doc(id).delete();
  const snapshot = await firestore.collection("feedback").where("siteId", "==", id).get();
  const batch = db.batch();
  snapshot.forEach((doc) => {
    batch.delete(doc);
  });

  return batch.commit();
}

export function updateSite(id, newValues) {
  return firestore.collection("sites").doc(id).update(newValues);
}

export function createFeedback(data) {
  return firestore.collection("feedback").add(data);
}

export function deleteFeedback(id) {
  return firestore.collection("feedback").doc(id).update({ status: "removed" });
}

export function updateFeedback(id, newValues) {
  return firestore.collection("feedback").doc(id).update(newValues);
}
