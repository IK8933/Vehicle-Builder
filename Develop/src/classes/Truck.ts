import Vehicle from './Vehicle.js';
import Motorbike from './Motorbike.js';
import Car from './Car.js';
import Wheel from './Wheel.js';
import AbleToTow from '../interfaces/AbleToTow.js';

class Truck extends Vehicle implements AbleToTow {
  vin: string;
  color: string;
  make: string | undefined;
  model: string | undefined;
  year: number | undefined;
  weight: number; 
  topSpeed: number; 
  wheels: Wheel[]; 
  towingCapacity: number; 

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
    super(make, model, year); 

    
    this.vin = vin;
    this.color = color;
    this.weight = weight;
    this.topSpeed = topSpeed;
    this.towingCapacity = towingCapacity;

    
    if (wheels.length !== 4) {
      console.log("Invalid wheels array. Creating 4 default wheels.");
      this.wheels = [
        new Wheel(), 
        new Wheel(),
        new Wheel(),
        new Wheel(),
      ];
    } else {
      this.wheels = wheels; 
    }
  }

  
  tow(vehicle: Vehicle): void {
    if (vehicle.weight <= this.towingCapacity) {
      console.log(`Towing ${vehicle.model} successfully!`);
    } else {
      console.log(`Cannot tow ${vehicle.model}. Exceeds towing capacity.`);
    }
  }
}
export default Truck;
    // Implement the tow method from the AbleToTow interface
    // TODO: Implement the tow method from the AbleToTow interface
    // TODO: The Truck class should extend the Vehicle class and should implement the AbleToTow interface
    // import the Vehicle, Motorbike, Car, Wheel, and AbleToTow classes/interfaces
    // TODO: Declare properties of the Truck class
    // TODO: The properties should include vin, color, make, model, year, weight, top speed, wheels, and towing capacity
    // TODO: The types should be as follows: vin (string), color (string), make (string), model (string), year (number), weight (number), topSpeed (number), wheels (Wheel[]), towingCapacity (number)
    
    // TODO: Create a constructor that accepts the properties of the Truck class
      // TODO: The constructor should call the constructor of the parent class, Vehicle
      // TODO: The constructor should initialize the properties of the Truck class
      // TODO: The constructor should check if the wheels array has 4 elements and create 4 new default Wheel objects if it does not
    // Declare properties with types
    // TODO: Get the make an model of the vehicle if it exists
    // TODO: Check if the vehicle's weight is less than or equal to the truck's towing capacity
    // TODO: If it is, log that the vehicle is being towed
    // TODO: If it is not, log that the vehicle is too heavy to be towed
  
  
  // TODO: Override the printDetails method from the Vehicle class
  // TODO: The method should call the printDetails method of the parent class
  // TODO: The method should log the details of the Truck
  // TODO: The details should include the VIN, make, model, year, weight, top speed, color, towing capacity, and wheels


// Export the Truck class as the default export
