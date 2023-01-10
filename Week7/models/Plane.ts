import { IVehicle } from "./IVehicle";
export default class Plane implements IVehicle {
    constructor(public model: string, public color: string, public year: number, public power: number, public wingspan: number) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
        this.wingspan = wingspan;
    }
}
