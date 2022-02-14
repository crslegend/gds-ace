// endpoint to handle retrieval of entered url
import prisma from "../../../../lib/prisma.ts";

export default async function handler(req, res) {
  if (req.method === "GET") {
    const { shortenedURL } = req.query;

    if (shortenedURL) {
      const urlRequest = await prisma.ShortenURLRequest.findFirst({
        where: { shortened_url: shortenedURL },
      });

      if (urlRequest) {
        res.status(200).json(urlRequest);
        return;
      }
    }

    res.status(400).json(`Invalid URL entered`);
  }
}
