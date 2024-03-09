// src/index.js
import express, { Express, Request, Response } from "express";
import multer from "multer";
import App, { UserInputs } from "./application/index";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  },
});
const upload = multer({ dest: "uploads/", storage });

const app: Express = express();
const port = process.env.PORT || 3000;

const ROUTES = {
  IMAGES: "images",
};

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});

// respond with "hello world" when a GET request is made to the homepage
app.post(`/${ROUTES.IMAGES}`, upload.single("image"), async (req, res) => {
  const userPrefs = req.body as UserInputs;
  const filePath = req.file?.path;
  if (!filePath) {
    throw new Error("No file path found");
  }

  const analysis = await App.analyseImage(filePath);
  // await App.getStyleSuggestions(analysis);
  // const csv = await App.analyseCsv();
  // await App.pickStylesFromCSV(csv);
  const pickedStyles = await App.curateLook(analysis, userPrefs);
  res.send(pickedStyles);
});
