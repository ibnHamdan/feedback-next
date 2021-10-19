import { compareDesc, parseISO } from "date-fns";
import admin from "./firebase-admin";

export async function getAllFeedback(siteId, route) {
  try {
    let ref = admin.firestore().collection("feedback").where("siteId", "==", siteId).where("status", "==", "active");

    if (route) {
      ref = ref.where("route", "==", route);
    }
    const snapshot = await ref.get();
    const feedback = [];

    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    feedback.sort((a, b) => compareDesc(parseISO(a.createdAt), parseISO(b.createdAt)));

    return { feedback };
  } catch (erro) {
    return { error };
  }
}

export async function getSite(siteId) {
  const doc = await admin.firestore().collection("sites").doc(siteId).get();
  const site = { id: doc.id, ...doc.data() };
  return { site };
}

export async function getUserSites(uid) {
  try {
    const sites = [];
    const snapshot = await admin.firestore().collection("sites").where("authorId", "==", uid).get();
    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    console.log(error);
  }
}

export async function getAllSites() {
  try {
    const sites = [];
    const snapshot = await admin.firestore().collection("sites").get();
    snapshot.forEach((doc) => {
      sites.push({ id: doc.id, ...doc.data() });
    });

    return { sites };
  } catch (error) {
    console.log(error);
  }
}

export async function getUserFeedback(uid) {
  try {
    const feedback = [];
    const snapshot = await admin
      .firestore()
      .collection("feedback")
      .where("authorId", "==", uid)
      .where("status", "in", ["pending", "active"])
      .get();
    snapshot.forEach((doc) => {
      feedback.push({ id: doc.id, ...doc.data() });
    });

    return { feedback };
  } catch (error) {
    console.log(error);
  }
}
