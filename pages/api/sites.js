import { getAllSite } from "@/lib/db-admin";
import db from "@/lib/firebase-admin";


export default async ( eq, res) => {
  const {sites, error} = await getAllSite()
  if(error) {
    res.status(500).json({error})
  }
  res.status(200).json({sites})
};