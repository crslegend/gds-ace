// Endpoint to handle shorten of URL
import { connectToDatabase } from "../../../lib/mongodb";
import { nanoid } from "nanoid";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { enteredURL } = req.body;

    // use regex to check if entered string is a valid URL
    const expression =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    if (!regex.test(enteredURL)) {
      res.status(400).json("You have entered an invalid URL!");
      return;
    }

    const { db } = await connectToDatabase();

    const urlRequest = await db.collection("ShortenURLRequest").findOne({
      entered_url: enteredURL,
    });

    if (urlRequest) {
      const shortenedURL = urlRequest["shortened_url"];
      res.status(200).json(shortenedURL);
    } else {
      // according to Nano ID Collison calculator (https://zelark.github.io/nano-id-cc/)
      // for 1000 IDs generated per hour, ~12 days needed
      // in order to have a 1% probability of at least one collision for 7 characters
      let shortenedURL;

      // try a maximum of 7 times if there is collision
      for (let i = 0; i < 7; i++) {
        shortenedURL = nanoid(7);
        try {
          await db.collection("ShortenURLRequest").insertOne({
            entered_url: enteredURL,
            shortened_url: shortenedURL,
          });

          res.status(200).json(shortenedURL);
          return;
        } catch (error) {
          console.log(error);
          // continue;
        }
      }
      res.status(400).json("Something went wrong. Please try again!");
    }
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
