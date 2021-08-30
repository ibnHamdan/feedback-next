import db from "@/lib/firebase-admin";


export default async ( eq, res) => {
  const sitesRef = await db.collection( 'sites').get();
  const sites = [];

  sitesRef.forEach((doc) => {

    sites.push({
      id: doc.id,
      ...doc.data()
    });
  })
  res.status(200).json({sites})
};