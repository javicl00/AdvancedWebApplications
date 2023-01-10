import { IVehicle } from "./IVehicle";

export default class Car implements IVehicle {
    
    // constructor
    constructor(public model: string, public color: string, public year: number, public power: number, public bodyType: string, public wheelCount: number) {
        this.model = model;
        this.color = color;
        this.year = year;
        this.power = power;
        this.bodyType = bodyType;
        this.wheelCount = wheelCount;
    }
}