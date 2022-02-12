// Endpoint to handle shorten of URL
// import prisma from "../../lib/prisma";

export default async function handler(req, res) {
  if (req.method === "POST") {
    const { enteredURL } = req.body;
    console.log(enteredURL);

    // use regex to check if entered string is a valid URL
    const expression =
      /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/g;
    const regex = new RegExp(expression);

    if (!regex.test(enteredURL)) {
      res.status(400).json("Invalid URL entered!");
      return;
    }

    res.status(200).json({ name: "John Doe" });
  } else {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method Not Allowed");
  }
}
