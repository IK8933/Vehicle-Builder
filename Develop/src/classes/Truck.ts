// import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

//=====>Truck class extends the Vehicle class and implement the AbleToTow interface<===
// =====>Declare properties and type of the Truck class<=========
class Truck extends Vehicle  implements AbleToTow{
  vin: string;
  color: string;
  make: string;
  model: string;
  year: number;
  weight: number;
  topSpeed: number;
  wheels: Wheel[];
  towingCapacity: number;

  //======>Creates a constructor that accepts the properties of the Truck class<=====
  constructor(
    vin: string,
    color: string,
    make: string,
    model: string,
    year: number,
    weight: number,
    topSpeed: number,
    wheels: Wheel[],
    towingCapacity: number
  ) {

    //=====>call the constructor of the parent class, Vehicle<=====
    super();
    //  The constructor should initialize the properties of the Truck class
    //  The constructor should check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
    this.vin = vin;
    this.color = color;
    this.make = make;
    this.model = model;
    this.year = year;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;
    if (wheels.length !== 4) {
      this.wheels = [new Wheel(), new Wheel(), new Wheel(), new Wheel()];
    } else {
      this.wheels = wheels;
    }
  }
  // Implement the tow method from the AbleToTow interface
  // Get the make and model of the vehicle if it exists
  // Check if the vehicle's weight is less than or equal to the truck's towing capacity
  // If it is, log that the vehicle is being towed
  // If it is not, log that the vehicle is too heavy to be towed
  tow(vehicle: Truck | Motorbike | Car): void {
    const vehicleType = vehicle.constructor.name;
    const getMakeNmodel = `${vehicle.make} ${vehicle.model}`;
  
    
if(vehicle.weight <= this.towingCapacity){
  console.log(`the vehicle ${vehicleType}: ${getMakeNmodel}: is being towed`);
}else{
  console.log(`the ${vehicleType}: ${getMakeNmodel}: vehicle is too heavy to be towed`);
}
}

  // Override the printDetails method from the Vehicle class
  // The method should call the printDetails method of the parent class
  // The method should log the details of the Truck
  // The details should include the VIN, make, model, year, weight, top speed, color, towing capacity, and wheels
    override printDetails(): void { 
      super.printDetails(); 
      console.log(`VIN #: ${this.vin}`);
      console.log(`Make: ${this.make}`)
      console.log(`Model: ${this.model}`)
      console.log(`Year: ${this.year}`)
      console.log(`Weight: ${this.weight} lbs`)
      console.log(`Top Speed: ${this.topSpeed}mph`)
      console.log(`Color: ${this.color}`)
      console.log(`Towing capacity: ${this.towingCapacity}`)
      console.log(`Wheels: ${this.wheels.length}`)
      console.log(
        `Wheel 1: ${this.wheels[0].getDiameter} inch with a ${this.wheels[0].getTireBrand} tire`
      );
      console.log(
        `Wheel 2: ${this.wheels[1].getDiameter} inch with a ${this.wheels[1].getTireBrand} tire`
      );
      console.log(
        `Wheel 3: ${this.wheels[2].getDiameter} inch with a ${this.wheels[2].getTireBrand} tire`
      );
      console.log(
        `Wheel 4: ${this.wheels[3].getDiameter} inch with a ${this.wheels[3].getTireBrand} tire`
      );
      }
    }
    // Export the Truck class as the default export
export default Truck;