import express, { Express, Request, Response } from "express";
import Vehicle from "./models/Vehicle";
import Car from "./models/Car";
import Boat from "./models/Boat";
import Plane from "./models/Plane";
const app: Express = express();
app.use(express.json());
const port: number = 3000;

// array of vehicles to store all vehicles
let vehicles: Vehicle[] = [];

app.get("/", (req: Request, res: Response) => {
  res.send("Index page");
});

// task 1. Works
app.get("/hello", (req: Request, res: Response) => {
  res.send("Hello world");
});

// task 2 and 3. Works
app.post("/vehicle/add", (req: Request, res: Response) => {
  let model: string = req.body.model;
  let color: string = req.body.color;
  let year: number = req.body.year;
  let power: number = req.body.power;
  let bodyType: string = req.body.bodyType;
  let wheelCount: number = req.body.wheelCount;
  let draft: number = req.body.draft;
  let wingspan: number = req.body.wingspan;

  // Car
  if (bodyType && wheelCount) {
    // if it is a car
    let v: Car = new Car(model, color, year, power, bodyType, wheelCount);
    if (vehicles.push(v)) {
      return res.status(201).send("Vehicle added");
    } else {
      res.status(500).send("Error adding vehicle");
    }
  } else if (draft) {
    // if it is a boat
    let v: Boat = new Boat(model, color, year, power, draft);
    if (vehicles.push(v)) {
      return res.status(201).send("Vehicle added");
    } else {
      res.status(500).send("Error adding vehicle");
    }
  } else if (wingspan) {
    // if it is a plane
    let v: Plane = new Plane(model, color, year, power, wingspan);
    if (vehicles.push(v)) {
      return res.status(201).send("Vehicle added");
    } else {
      res.status(500).send("Error adding vehicle");
    }
  } else if (!bodyType && !wheelCount && !draft && !wingspan) {
    // if it is a generic vehicle
    let v: Vehicle = new Vehicle(model, color, year, power);
    if (vehicles.push(v)) {
      return res.status(201).send("Vehicle added");
    } else {
      res.status(500).send("Error adding vehicle");
    }
  }

  console.log(vehicles);
});

// task 4. Doesn't work
/**
 * Response should have the right data: 
 * expected '{"model":"Valmet L-70 Vinka","color":"Green","year":1982,"power":200}' to include '{"model":"Valmet L-70 Vinka","color":"Green","year":1982,"power":200,"wingspan":9.633}'
 * 
 * AssertionError: Response should have the right data: 
 * expected '{"model":"Valmet L-70 Vinka","color":"Green","year":1982,"power":200}' to include '{"model":"Valmet L-70 Vinka","color":"Green","year":1982,"power":200,"wingspan":9.633}'
 */
app.get("/vehicle/search/:model", (req: Request, res: Response) => {
  let model: string = req.params.model;
  let v = vehicles.find((v) => v.model === model);
  if (v) {
    if (v.bodyType && v.wheelCount) { // if it is a car
      let car: Car = new Car(
        v.model,
        v.color,
        v.year,
        v.power,
        v.bodyType,
        v.wheelCount
      );
      return res.send(car);
    } else if (v.draft) {
      let boat: Boat = new Boat(v.model, v.color, v.year, v.power, v.draft);
      return res.send(boat);
    } else if (v.wingspan) {
      let plane: Plane = new Plane(
        v.model,
        v.color,
        v.year,
        v.power,
        v.wingspan
      );
      return res.send(plane);
    } else if (!v.bodyType && !v.wheelCount && !v.draft && !v.wingspan) {
      let vehicle: Vehicle = new Vehicle(v.model, v.color, v.year, v.power);
      return res.send(vehicle);
    }
  } else {
    return res.status(404).send();
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
