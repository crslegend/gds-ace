// Test suites to test API functions
import index from "../pages/api/shorten-url";
import index2 from "../pages/api/shorten-url/[shortenedURL]";

import { createMocks } from "node-mocks-http";
import { connect, disconnect } from "./setupDb.js";

describe("Test API Endpoints", () => {
  let db;

  beforeAll(async () => {
    const dbObj = await connect();
    db = dbObj["db"];
  });

  afterAll(async () => {
    await disconnect();
  });

  it("Shorten URL fail", async () => {
    const { req, res } = createMocks({
      method: "POST",
      body: JSON.stringify({
        enteredURL: "",
      }),
    });

    await index(req, res);

    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toBe("You have entered an invalid URL!");

    const numURLRequests = await db.collection("ShortenURLRequest").count();
    expect(numURLRequests).toBe(0);
  });

  it("Shorten URL success", async () => {
    const URL = "http://www.google.com.hk";
    const { req, res } = createMocks({
      method: "POST",
      body: {
        enteredURL: URL,
      },
    });

    await index(req, res);

    // test for response status
    expect(res._getStatusCode()).toBe(200);

    // test for the presence of shorten url request record in test DB
    const urlRequest = await db.collection("ShortenURLRequest").findOne({ entered_url: URL });
    expect(urlRequest["entered_url"]).toMatch(URL);
    expect(urlRequest["shortened_url"]).toMatch(res._getJSONData());

    const numURLRequests = await db.collection("ShortenURLRequest").count();
    expect(numURLRequests).toBe(1);
  });

  it("Retrieval of invalid shortened URL", async () => {
    const shortenedURL = "1234124";

    const { req, res } = createMocks({
      method: "GET",
      body: {
        shortenedURL: URL,
      },
    });

    await index2(req, res);

    // test for response status and data
    expect(res._getStatusCode()).toBe(400);
    expect(res._getJSONData()).toBe("Invalid URL entered");

    //test for the absence of shorten url request record in test DB given an invalid shortenedURL
    const urlRequest = await db.collection("ShortenURLRequest").findOne({ shortened_url: shortenedURL });
    expect(urlRequest).toBe(null);

    const numURLRequests = await db.collection("ShortenURLRequest").count();
    expect(numURLRequests).toBe(1); // because of previous test case
  });
});
