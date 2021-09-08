import { getUserFeedback } from "@/lib/db-admin";
import admin from "@/lib/firebase-admin";

export default async (req, res) => {
  try {
    const { uid } = await admin.auth().verifyIdToken(req.headers.token);

    const feedback = await getUserFeedback(uid);

    res.status(200).json(feedback);
  } catch (error) {
    res.status(500).json({ error });
    console.log("error in api/feedback");
  }
};
