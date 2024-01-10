const data = [{name: "Alef", Age:18, sallary: 2500, driverLicense: false}, {name: "Avraham", Age: undefined, sallary: 0, driverLicense: false}, {name: "Sarah", Age: undefined, sallary: 10, driverLicense: false}]
console.log(data)
const lowestSallary = data.findIndex((e)=>e.sallary > 0 && e.sallary < 2000)

data[lowestSallary].sallary += 200

console.log(data)