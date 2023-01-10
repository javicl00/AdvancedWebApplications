import { IVehicle } from "./IVehicle";
export default class Vehicle implements IVehicle {
  // constructor
  constructor(
    public model: string,
    public color: string,
    public year: number,
    public power: number,
    public bodyType?: string,
    public wheelCount?: number,
    public draft?: number,
    public wingspan?: number
  ) {
    this.model = model;
    this.color = color;
    this.year = year;
    this.power = power;
    this.bodyType = bodyType;
    this.wheelCount = wheelCount;
    this.draft = draft;
    this.wingspan = wingspan;
  }
}
