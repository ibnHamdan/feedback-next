import { getAllFeedback } from "@/lib/db-admin"


export default async(req  , res) => {
  const siteId = req.query.siteId;
  const {feedback, error} = await getAllFeedback(siteId);
  if (  resutl.error ) {
    res.status(500).jsoun({ error })
  }
  res.status(200).json({feedback})
}