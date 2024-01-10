const data = [{name: "Alef", Age:18, Sallary: 2500, driverLicense: false}, {name: "Avraham", Age: undefined, Sallary: 0, driverLicense: false}, {name: "Sarah", Age: undefined, Sallary: 0, driverLicense: false}]

const lowestSallary = data.findIndex((e)=>e.Sallary > 0 && e.Sallary < 2000)

console.log(lowestSallary)