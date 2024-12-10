import inquirer from "inquirer";
import Truck from "./Truck.js";
import Car from "./Car.js";
import Motorbike from "./Motorbike.js";
import { DiffieHellmanGroup } from "crypto";
import { TestContext } from "node:test";

class Cli {
  vehicles: (Car | Truck | Motorbike)[];
  selectedVehicleVin: string | undefined;
  exit: boolean = false;

  constructor(vehicles: (Car | Truck | Motorbike)[]) {
    this.vehicles = vehicles;
  }

  static generateVin(): string {
    return (
      Math.random().toString(36).substring(2, 15) +
      Math.random().toString(36).substring(2, 15)
    );
  }

  chooseVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "selectedVehicleVin",
          message: "Select a vehicle to perform an action on",
          choices: this.vehicles.map((vehicle) => ({
            name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
            value: vehicle.vin,
          })),
        },
      ])
      .then((answers) => {
        this.selectedVehicleVin = answers.selectedVehicleVin;
        this.performActions();
      });
  }

  createVehicle(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleType",
          message: "Select a vehicle type",
          choices: ["Car", "Truck", "Motorbike"],
        },
      ])
      .then((answers) => {
        if (answers.vehicleType === "Car") {
          this.createCar();
        } else if (answers.vehicleType === "Truck") {
          this.createTruck();
        } else if (answers.vehicleType === "Motorbike") {
          this.createMotorbike();
        }
      });
  }

  createCar(): void {
    inquirer
      .prompt([
        { type: "input", 
          name: "color", 
          message: "Enter Color" },
        { type: "input", 
          name: "make", 
          message: "Enter Make" },
        { type: "input", 
          name: "model", 
          message: "Enter Model" },
        { type: "input", 
          name: "year", 
          message: "Enter Year" },
        { type: "input", 
          name: "weight", 
          message: "Enter Weight" },
        { type: "input", 
          name: "topSpeed", 
          message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const car = new Car(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(car);
        this.selectedVehicleVin = car.vin;
        this.performActions();
      });
  }

  createTruck(): void {
    inquirer
      .prompt([
        { type: "input",
          name: "color",
            message: "Enter Color" },
        { type: "input", 
          name: "make", 
          message: "Enter Make" },
        { type: "input", 
          name: "model", 
          message: "Enter Model" },
        { type: "input", 
          name: "year", 
          message: "Enter Year" },
        { type: "input", 
          name: "weight", 
          message: "Enter Weight" },
        { type: "input", 
          name: "topSpeed", 
          message: "Enter Top Speed" },
        { type: "input", 
          name: "towingCapacity", 
          message: "Enter Towing Capacity" },
      ])
      .then((answers) => {
        const truck = new Truck(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          [],
          parseInt(answers.towingCapacity)
        );
        this.vehicles.push(truck);
        this.selectedVehicleVin = truck.vin;
        this.performActions();
      });
  }

  createMotorbike(): void {
    inquirer
      .prompt([
        { type: "input", 
          name: "color", 
          message: "Enter Color" },
        { type: "input", 
          name: "make", 
          message: "Enter Make" },
        { type: "input", 
          name: "model", 
          message: "Enter Model" },
        { type: "input", 
          name: "year", 
          message: "Enter Year" },
        { type: "input", 
          name: "weight", 
          message: "Enter Weight" },
        { type: "input", 
          name: "topSpeed", 
          message: "Enter Top Speed" },
      ])
      .then((answers) => {
        const motorbike = new Motorbike(
          Cli.generateVin(),
          answers.color,
          answers.make,
          answers.model,
          parseInt(answers.year),
          parseInt(answers.weight),
          parseInt(answers.topSpeed),
          []
        );
        this.vehicles.push(motorbike);
        this.selectedVehicleVin = motorbike.vin;
        this.performActions();
      });
  }

  findVehicleToTow(truck: Truck): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "vehicleToTow",
          message: "Select a vehicle to tow",
          choices: this.vehicles
            .filter((vehicle) => vehicle.vin !== truck.vin)
            .map((vehicle) => ({
              name: `${vehicle.vin} -- ${vehicle.make} ${vehicle.model}`,
              value: vehicle.vin,
            })),
        },
      ])
      .then((answers) => {
        const vehicleToTow = this.vehicles.find(
          (vehicle) => vehicle.vin === answers.vehicleToTow
        );

        if (!vehicleToTow) {
          console.log("Vehicle not found. Please try again.");
          this.performActions();
          return;
        }

        console.log(
          `Towing ${vehicleToTow.make} ${vehicleToTow.model} with ${truck.make} ${truck.model}`
        );
        truck.tow(vehicleToTow);
        this.performActions();
      });
  }

  performActions(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Select an action",
          choices: [
            "Print details",
            "Start vehicle",
            "Accelerate 5 MPH",
            "Decelerate 5 MPH",
            "Stop vehicle",
            "Turn right",
            "Turn left",
            "Reverse",
            "Tow",
            "wheelie",
            "Select or create another vehicle",
            "Exit",
          ],
        },
      ])
      .then((answers) => {
        const selectedVehicle = this.vehicles.find(
          (vehicle) => vehicle.vin === this.selectedVehicleVin
        );

        if (!selectedVehicle) {
          console.log("No vehicle selected.");
          this.performActions();
          return;
        }

        switch (answers.action) {
          case "Print details":
            selectedVehicle.printDetails();
            break;

          case "Start vehicle":
            selectedVehicle.start();
            break;

          case "Tow":
            if (selectedVehicle instanceof Truck) {
              this.findVehicleToTow(selectedVehicle);
              return;
            } else {
              console.log("Only trucks can tow vehicles!");
            }
            break;

          case "wheelie":
            if (selectedVehicle instanceof Motorbike) {
              selectedVehicle.wheelie();
            } else {
              console.log("Only motorbikes can perform wheelies!");
            }
            break;

          case "Select or create another vehicle":
            this.startCli();
            return;

          case "Exit":
            console.log("Exiting...");
            this.exit = true;
            return;
        }

        this.performActions();
      });
  }

  startCli(): void {
    inquirer
      .prompt([
        {
          type: "list",
          name: "CreateOrSelect",
          message: "Create a new vehicle or perform an action?",
          choices: ["Create a new vehicle", "Select an existing vehicle"],
        },
      ])
      .then((answers) => {
        if (answers.CreateOrSelect === "Create a new vehicle") {
          this.createVehicle();
        } else {
          this.chooseVehicle();
        }
      });
  }
}
export default Cli;