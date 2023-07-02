import express, { Request, Response } from "express";
import cloudinary from "cloudinary";

// Configuração do Cloudinary
cloudinary.v2.config({
  cloud_name: "CLOUD_NAME",
  api_key: "API_KEY",
  api_secret: "API_SECRET",
});

const app = express();

app.post("/upload", async (req: Request, res: Response) => {
  cloudinary.v2.uploader.upload(
    "teste.pdf",
    { ocr: "adv_ocr" },
    function (error, result) {
      if (result && result["info"]["ocr"]["adv_ocr"]["status"] === "complete") {
        let data = result["info"]["ocr"]["adv_ocr"]["data"];
        console.log(data[0].fullTextAnnotation.text);
      }
    }
  );
});

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
