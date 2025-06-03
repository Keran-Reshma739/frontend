"use strict";
var bootstrap;
class Employee {
    constructor(name, id, department) {
        this.name = name;
        this.id = id;
        this.department = department;
    }
    getDetails() {
        return `ID: ${this.id}<br>Name: ${this.name}<br>Department: ${this.department}`;
    }
}
class FullTimeEmployee extends Employee {
    constructor(name, id, department, salary) {
        super(name, id, department);
        this.salary = salary;
    }
    getDetails() {
        return `${super.getDetails()}<br>Salary: $${this.salary}`;
    }
}
class PartTimeEmployee extends Employee {
    constructor(name, id, department, hourlyRate, hoursWorked) {
        super(name, id, department);
        this.hourlyRate = hourlyRate;
        this.hoursWorked = hoursWorked;
    }
    getDetails() {
        const total = this.hourlyRate * this.hoursWorked;
        return `${super.getDetails()}<br>Hourly Rate: $${this.hourlyRate}<br>Hours Worked: ${this.hoursWorked}<br>Total: $${total}`;
    }
}
const employees = [
    new FullTimeEmployee("Alice Johnson", 101, "Engineering", 6000),
    new FullTimeEmployee("Mark Davis", 102, "HR", 5000),
    new FullTimeEmployee("Nina Patel", 103, "Marketing", 5500),
    new FullTimeEmployee("John Miller", 104, "Finance", 6200),
    new PartTimeEmployee("Bob Smith", 201, "Support", 25, 80),
    new PartTimeEmployee("Sarah Lee", 202, "Sales", 20, 60),
    new PartTimeEmployee("Emily Brown", 203, "Design", 22, 70),
    new PartTimeEmployee("James Wilson", 204, "Logistics", 18, 90),
];
function renderCards() {
    const fullTimeContainer = document.getElementById("fullTimeContainer");
    const partTimeContainer = document.getElementById("partTimeContainer");
    const pastelClasses = ["pastel-1", "pastel-2", "pastel-3", "pastel-4", "pastel-5", "pastel-6"];
    let pastelIndex = 0;
    employees.forEach((emp) => {
        const card = document.createElement("div");
        card.className = "col-md-3";
        const cardBody = document.createElement("div");
        cardBody.className = `card p-4 shadow-sm h-100 ${pastelClasses[pastelIndex % pastelClasses.length]}`;
        pastelIndex++;
        cardBody.innerHTML = `
      <h5 class="mb-1">${emp.name}</h5>
      <p class="mb-0">${emp.department}</p>
    `;
        cardBody.onclick = () => {
            const modalBody = document.getElementById("modalContent");
            modalBody.innerHTML = emp.getDetails();
            const modal = new bootstrap.Modal(document.getElementById("employeeModal"));
            modal.show();
        };
        card.appendChild(cardBody);
        if (emp instanceof FullTimeEmployee) {
            fullTimeContainer.appendChild(card);
        }
        else {
            partTimeContainer.appendChild(card);
        }
    });
}
renderCards();
