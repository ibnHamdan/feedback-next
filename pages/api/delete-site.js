import { deleteSite } from "@/lib/db";

import admin from "@/lib/firebase-admin";
import { logger, formatObjectKeys } from "@/utils/logger";

export default async (req, res) => {
  try {
    const { uid } = await admin.auth().verifyIdToken(req.headers.token);
    const { siteId } = req.query;
    const sites = await deleteSite(uid);

    res.status(200).json(sites);
  } catch (error) {
    const headers = formatObjectKeys(req.headers);

    logger.error(
      {
        request: {
          headers: headers,
          url: req.url,
          method: req.method,
        },
        response: {
          statusCode: res.statusCode,
        },
      },
      error.message
    );
    res.status(500).json({ error });
  }
};
