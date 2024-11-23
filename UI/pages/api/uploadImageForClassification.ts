import { NextApiRequest, NextApiResponse } from "next";
import formidable, { Fields, Files } from "formidable";
import fs from "fs";
import FormData from "form-data";
import fetch from "node-fetch";

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = formidable({ multiples: false });

    // Parse the incoming request
    form.parse(req, async (err: Error | null, fields: Fields, files: Files) => {
      if (err) {
        console.error("Error parsing the form data", err);
        return res.status(500).json({ error: "Error parsing form data." });
      }

      try {
        // Correctly access the image file
        const imageFile = Array.isArray(files.image) ? files.image[0] : files.image;

        // Ensure the imageFile is properly typed and not undefined
        if (!imageFile || typeof imageFile.filepath !== "string" || !imageFile.filepath) {
          return res.status(400).json({ error: "No image file provided" });
        }

        // Create FormData object to send to the Flask server
        const formData = new FormData();
        formData.append("image", fs.createReadStream(imageFile.filepath), imageFile.originalFilename ?? ""); // Stream file to Flask

        // Make the request to the Flask API
        const response = await fetch("https://127.0.0.1:443/classification", {
          method: "POST",
          body: formData,
          headers: formData.getHeaders(),
        });

        if (response.ok) {
          const data = await response.json();
          res.status(200).json(data);
        } else {
          const errorData = await response.json();
          console.error("Error from Flask API", errorData);
          res.status(response.status).json(errorData);
        }
      } catch (error) {
        console.error("Error processing request", error);
        res.status(500).json({ error: "An error occurred while processing the image." });
      }
    });
  } else {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
