let siswa = {
    name: "Andika",
    age: 20,
    isGraduated: false,
    address: {
        city: "Jakarta",
        country: "Indonesia"
    }
}
// 1. Variables
// Using let, const, and var
const studentName = "Andika";   //cannot be changed
let studentAge = 20;            //can be changed
var studentGrade = undefined;   //older version of javascript

console.log(studentName)
console.log(studentAge)
console.log(studentGrade)

// 2. Data Types
// string
let courseName = "Belajar Javascript";
// number
let score = 80;
// boolean
let isPassed = true;
// null
let nullValue = null;
// undefined
let undefinedValue;

console.log(courseName)
console.log(score)
console.log(isPassed)
console.log(nullValue)
console.log(undefinedValue)

// 3. Data Structure
// array
let courseModules = ["Variable", "Function", "Array", "Object"];

//object
let student = {
    name: "Andika",
    age: 20,
    isGraduated: false,
    grades: [80, 90, 100],
    address: {
        city: "Jakarta",
        country: "Indonesia"
    },
    contact: {
        email: "dika@email",
        phone: "08123456789"
    }
};

console.log(courseModules)
console.log(student)
console.log(student.grades)

// 4. Operators
// arithmetic operator
let totalScore = 85 + 90;
let averageScore = totalScore / 2;
let bonusPoint

// logical operator
let hasPassingGrade = score >= 60;
let hasAttendance = true;

//AND opertator &&
let willPass = hasPassingGrade && hasAttendance;

//OR operator ||
// let needsHelp = (score<60) || (attendance<80);

//NOT operator !
let isNotPassed = !hasPassingGrade;


{
// 1. FOR LOOP
// Basic for loop
console.log("Basic for loop");
for (let i = 0; i <= 5; i++) {
    console.log(`Count: ${i}`);
}

//Loop through array
const fruit = ["apple", "banana", "orange", "grape"];
console.log("Loop through array");
for (let i = 0; i < fruit.length; i++) {
    console.log(`Fruit ${i + 1}: ${fruit[i]}`);
}

//2. FOR...OF LOOP
console.log("FOR...OF LOOP");
const colors = ["red", "green", "blue"];

for (const color of colors) {
    console.log(color);
}

//3. FOR...IN LOOP
console.log("FOR...IN LOOP");
const student = {
    name: "Andika",
    age: 20,
    isGraduated: false,
    grades: [80, 90, 100],
    address: {
        city: "Jakarta",
        country: "Indonesia"
    },
    contact: {
        email: "dika@email",
        phone: "08123456789"
    }
};

for (const key in student) {
    console.log(`${key}: ${student[key]}`);
}
// 4. WHILE LOOP
console.log("WHILE LOOP");
let count = 0;
while (count < 5) {
    console.log(`Count: ${count}`);
    count++;
}    

// 5. DO...WHILE LOOP
console.log("DO...WHILE LOOP");
let num = 0;
do {
    console.log(`Count: ${num}`);
    count++;
} while (count < 5);

// 6. BREAK & CONTINUE
console.log("BREAK & CONTINUE");
for (let i = 0; i <= 10; i++) {
    if (i === 5) continue
    if (i === 8) break
    console.log(`Number: ${i}`);
}
}

{
    // 1. Basic if statement
    let studentScore = 80;

    if (studentScore >= 80) {
        console.log("Excellent");
    }

    // 2. if...else statement
    let age = 20;

    if (age >= 18) {
        console.log("You are an adult");
    } else {
        console.log("You are a minor");
    }

    // 3. if...else if...else statement
    let grade = 80;

    if (grade >= 90) {
        console.log("Grade A");
    } else if (grade >= 80) {
        console.log("Grade B");
    } else if (grade >= 70) {
        console.log("Grade C");
    } else {
        console.log("Grade D");
    }

    // 4. nested if statement
    let isLoggedIn = true;
    let isAdmin = true;
    let hasPermission = true;

    if (isLoggedIn) {
        if (isAdmin) {
            if (hasPermission) {
                console.log("Welcome to admin dashboard");
            } else {
                console.log("Insufficient permission");
            }
        } else {
            console.log("Welcome to user dashboard");
        }
    } else {
        console.log("Please login first");
    }

    //5. using logical operator with if statement
    let username = "dika";
    let password = "password123";

    if (username === "dika" && password === "password123") {
        console.log("Login successful");
    } else {
        console.log("Invalid username or password");
    }

    //6/ Ternary operator
    let isSUbscribed = true;
    let message = isSUbscribed ? "You are subscribed" : "Please Subscribe";
}


{
    // 1. Basic Function
    function sayHello(name) {
        console.log(`Hello, ${name}`);
    }

    // Using the function
    console.log(sayHello("Andika")); // Output: Hello, Andika

    // 2. function with multiple parameters
    function calculateTotal(price, quantity) {
        return price * quantity;
    }

    //using the function
    console.log(calculateTotal(10, 5)); // Output: 50

    // 3. function with default parameters
    function greet(name = "Guest", greeting = "Hello") {
        console.log(`${greeting}, ${name}`);
    }

    //using the function
    greet(); // Output: Hello, Guest
    greet("Andika"); // Output: Hello, Andika
    greet("Andika", "Hi"); // Output: Hi, Andika

    // 4. function with rest parameters
    const add = (a, b) => {
        return a + b;
    };

    //simple arow function (one line)
    const multiply = (a, b) => a * b;

    //using the function
    console.log(add(1, 2)); // Output: 3
    console.log(multiply(2, 3)); // Output: 6

    // 5. function expression

}

{
    // 1. Basic class Definition
    class Student {
        //constructor
        //attribute adalah variable yang ada di dalam class
        constructor(name, age, grade) {
            this.name = name;
            this.age = age;
            this.grade = grade;
        }

        //class method
        //method adalah function yang ada di dalam class
        study() {
            return `${this.name} is studying`;
        }

        //Getter method
        get studentInfo() {
            return `Name: ${this.name}, Age: ${this.age}, Grade: ${this.grade}`
        }

        //Setter method
        set studentGrade(newGrade) {
            if (newGrade >= 0 && newGrade <= 100) {
                this.grade = newGrade;
            } else {
                console.log("Invalid grade");
            }
        }
    }

    //using the class
    const student1 = new Student("Andika", 20, 90);
    console.log(student1.study()); // Output: Andika is studying
    console.log(student1.studentInfo); // Output: Name: Andika, Age: 20, Grade: 90
    student1.studentGrade = 95;
    console.log(student1.studentInfo); // Output: Name: Andika, Age: 20, Grade: 95

    // 2. Class Inheritance
    class Person {
        constructor(name, age) {
            this.name = name;
            this.age = age;
        }

        introduce() {
            return `Hi, my name is ${this.name} and I am ${this.age} years old`;
        }
    }

    class Teacher extends Person {
        constructor(name, age, subject) {
            super(name, age);
            this.subject = subject;
        }

        teach() {
            return `${this.name} is teaching ${this.subject}`;
        }
    }

    //using the class
    const teacher1 = new Teacher("Andika", 30, "Mathematics");
    console.log(teacher1.introduce()); // Output: Hi, my name is Andika and I am 30 years old
    console.log(teacher1.teach()); // Output: Andika is teaching Mathematics

    // 3. Encapsulation
    class BankAccount {
        #balance = 0; //private fold

        constructor(accountHolder){
            this.accountHolder = accountHolder;
        }

        deposit(amount) {
            if(amount > 0) {
                this.#balance += amount;
                return `Deposited ${amount}. New balance: ${this.#balance}`;
            }
            return "Invalid deposit amount";
        }

        getBalance() {
            return this.#balance;
        }
    }

    const account1 = new BankAccount("Andika");
    console.log(account1.deposit(100)); // Output: Deposited 100. New balance: 100
    console.log(account1.getBalance()); // Output: 100
    console.log(account1.deposit(-50)); // Output: Invalid deposit amount
    console.log(account1.balance); // Output: undefined
    try {
        console.log(account1.balance); // Output: undefined
    } catch (error) {
        console.log(error.message); // Output: ReferenceError: balance is not defined
    }

}
