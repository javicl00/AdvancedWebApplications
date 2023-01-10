import express, { Express, Request, Response } from "express";
import Vehicle from "./models/Vehicle";
import Car from "./models/Car";
import Boat from "./models/Boat";
import Plane from "./models/Plane";
const app: Express = express();
app.use(express.json());
const port: number = 3000;

// array de objetos de varios tipos
let vehicles: Vehicle[] = [];

app.get("/", (req: Request, res: Response) => {
  res.send("Index page");
});

// task 1. Works
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world");
});

// task 2 works and 3 doesn't
app.post("/vehicle/add", (req: Request, res: Response) => {
  let model: string = req.body.model;
  let color: string = req.body.color;
  let year: number = req.body.year;
  let power: number = req.body.power;
  let bodyType: string = req.body.bodyType;
  let wheelCount: number = req.body.wheelCount;
  let draft: number = req.body.draft;
  let wingSpan: number = req.body.wingspan;

  if (
    bodyType != null &&
    wheelCount != null &&
    bodyType != undefined &&
    wheelCount != undefined
  ) {
    let v: Car = new Car(model, color, year, power, bodyType, wheelCount);

    if (vehicles.push(v)) {
      res.status(201).send("Vehicle added");
    } else {
      res.status(500).send("Error adding vehicle");
    }

    if (draft != null && draft != undefined) {
      let v: Boat = new Boat(model, color, year, power, draft);
      if (vehicles.push(v)) {
        res.status(201).send("Vehicle added");
      } else {
        res.status(500).send("Error adding vehicle");
      }
    }

    if (wingSpan != null && wingSpan != undefined) {
      let v: Plane = new Plane(model, color, year, power, wingSpan);
      if (vehicles.push(v)) {
        res.status(201).send("Vehicle added");
      } else {
        res.status(500).send("Error adding vehicle");
      }
    }
  } else if (
    bodyType == null &&
    wheelCount == null &&
    draft == null &&
    wingSpan == null
  ) {
    let v: Vehicle = new Vehicle(model, color, year, power);
    if (vehicles.push(v)) {
      res.status(201).send("Vehicle added");
    } else {
      res.status(500).send("Error adding vehicle");
    }
  }

  console.log(vehicles);
});

// task 4 doesn't work
app.get("/vehicle/search/:model", (req: Request, res: Response) => {
  let model: string = req.params.model;
  let v = vehicles.find((v) => v.model === model);
  if (v != null && v != undefined) {
    res.status(200);
    if (v.bodyType != null && v.bodyType != undefined) {
      res.send(
        "model: " +
          v.model +
          ", color: " +
          v.color +
          ", year: " +
          v.year +
          ", power: " +
          v.power +
          ", bodyType: " +
          v.bodyType +
          ", wheelCount: " +
          v.wheelCount
      );
    } else if (v.draft != null && v.draft != undefined) {
      res.send(
        "model: " +
          v.model +
          ", color: " +
          v.color +
          ", year: " +
          v.year +
          ", power: " +
          v.power +
          ", draft: " +
          v.draft
      );
    } else if (v.wingSpan != null && v.wingSpan != undefined) {
      res.send(
        "model: " +
          v.model +
          ", color: " +
          v.color +
          ", year: " +
          v.year +
          ", power: " +
          v.power +
          ", wingSpan: " +
          v.wingSpan
      );
    } else if (
      v.bodyType == null &&
      v.bodyType == undefined &&
      v.draft == null &&
      v.draft == undefined &&
      v.wingSpan == null &&
      v.wingSpan == undefined
    ) {
      res.send(
        "model: " +
          v.model +
          ", color: " +
          v.color +
          ", year: " +
          v.year +
          ", power: " +
          v.power
      );
    }
  } else {
    res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
