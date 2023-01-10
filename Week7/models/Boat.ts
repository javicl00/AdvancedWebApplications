import { IVehicle } from "./IVehicle";
export default class Boat implements IVehicle {
    constructor(public model: string, public color: string, public year: number, public power: number, public draft: number) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
        this.draft = draft;
    }
}