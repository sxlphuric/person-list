import { Component, signal } from "@angular/core";
import { Person } from "../const/person";
import { Car } from "../const/car";
import { Personinput } from "../components/personinput/personinput";
import { Persontable } from "../components/persontable/persontable";
import { PersonWithCar } from "../const/personWithCar.const";
import { Header } from "../components/header/header";
import { Footer } from "../components/footer/footer";

@Component({
  selector: "app-root",
  imports: [Personinput, Persontable, Header, Footer],
  templateUrl: "./app.html",
  styleUrl: "./app.scss",
})
export class App {
  protected readonly title = signal("projetC-voiture");
  // Create an array of preset people
  people: Person[] = [
    new Person("Martin", 23),
    new Person("El Gringo", 47),
    new Person("Skibidi Mark", 3),
    new Person("Him.", -1),
    new Person("William Smith", 28),
    new Person("Wemmbu", 19),
    new Person("Stalin", 74),
  ];

  // Create an array of preset cars
  cars: Car[] = [
    new Car("Toyota", "Corolla"),
    new Car("Honda", "Civic"),
    new Car("Jeep", "Highlander"),
    new Car("Little Tykes", "Kids' Scooter"),
    new Car("Kamaz", "Typhoon-K"),
    new Car("Lamborghini", "Huracan"),
    new Car("Jaguar", "XJR"),
    new Car("Airbus", "A350"),
  ];

  peopleTable: PersonWithCar[] = [];
  uniquePersonTable = new Set<string>();

  peopleKey(o: PersonWithCar): string {
    return `${o.name}|${o.age}|${o.brand}|${o.model}`;
  }

  inputHandler(personInput: PersonWithCar) {
    // Set an object key of our object
    const inputkey = this.peopleKey(personInput);

    // Check if it is in the unique set
    if (this.uniquePersonTable.has(inputkey)) {
      return;
    }

    // Add the input to the peopleTable and the Set
    this.uniquePersonTable.add(inputkey);
    this.peopleTable.push(personInput);
  }

  onRemove(personToRemove: PersonWithCar) {
    // Deletes a person from the peopleTable when the Remove button is clicked on
    this.peopleTable.splice(this.peopleTable.indexOf(personToRemove), 1);
    this.uniquePersonTable.delete(this.peopleKey(personToRemove));
  }

  ngOnInit() {
    // Set the random values
    var person = Math.floor(Math.random() * this.people.length);
    var car = Math.floor(Math.random() * this.cars.length);

    // The number of random users
    const runs = 3;

    for (let i = 0; i < runs; i++) {
      // Add a random user
      this.inputHandler({
        name: this.people[person].name,
        age: this.people[person].age,
        brand: this.cars[car].brand,
        model: this.cars[car].model,
      });

      // Reset the variables randomness for the next run
      person = Math.floor(Math.random() * this.people.length);
      car = Math.floor(Math.random() * this.cars.length);
    }
  }
}
