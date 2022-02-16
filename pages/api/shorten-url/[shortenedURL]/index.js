// endpoint to handle retrieval of entered url
import { connectToDatabase } from "../../../../lib/mongodb";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { shortenedURL } = req.query;

    const { db } = await connectToDatabase();

    if (shortenedURL) {
      const urlRequest = await db.collection("ShortenURLRequest").findOne({
        shortened_url: shortenedURL,
      });

      if (urlRequest) {
        res.status(200).json(urlRequest);
        return;
      }
    }

    res.status(400).json(`Invalid URL entered`);
  }
}
