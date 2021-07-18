const data = require('./data');

// REQUISITO 1

function getSpeciesByIds(...ids) {
  return ids.map((id) => data.species.find((specie) => specie.id === id));
}

// REQUISITO 2

function getAnimalsOlderThan(animal, age) {
  return data.species.find((specie) => specie.name === animal)
    .residents.every((resident) => resident.age >= age);
}

// REQUISITO 3

function getEmployeeByName(employeeName) {
  if (!employeeName) return {};
  return data.employees.find((employee) => employee.firstName === employeeName
    || employee.lastName === employeeName);
}

// REQUISITO 4

function createEmployee(personalInfo, associatedWith) {
  const { id, firstName, lastName } = personalInfo;
  const { managers, responsibleFor } = associatedWith;
  const employee = {
    id,
    firstName,
    lastName,
    managers,
    responsibleFor,
  };
  return employee;
}

// REQUISITO 5

function isManager(id) {
  return data.employees.some((employee) => employee.managers.includes(id));
}

// REQUISITO 6

function addEmployee(id, firstName, lastName, managers = [], responsibleFor = []) {
  data.employees.push({ id, firstName, lastName, managers, responsibleFor });
}

// REQUISITO 7

function countAnimals(species) {
  const countedSpecies = data.species.reduce((acc, animal) => {
    acc[animal.name] = animal.residents.length;
    return acc;
  }, {});

  if (species) return countedSpecies[species];

  return countedSpecies;
}

// REQUISITO 8

function calculateEntry(entrants) {
  if (!entrants) return 0;
  if (Object.keys(entrants).length === 0) return 0;

  const persons = Object.entries(entrants);
  const prices = Object.entries(data.prices);
  let count = 0;

  persons.forEach((person) => {
    prices.forEach((price) => {
      if (price[0] === person[0]) count += person[1] * price[1];
    });
  });
  return count;
}

// REQUISITO 9

const location = (loc) => data.species.filter((specie) => specie.location === loc)
  .map((specie) => specie.name);

const namesIncluded = (loc, sort) => data.species.filter((specie) => specie.location === loc)
  .map((specie) => {
    const animals = specie.residents.map((resident) => resident.name);
    if (sort) {
      const animSort = {
        [specie.name]: animals.sort(),
      };
      return animSort;
    }
    const animObject = {
      [specie.name]: animals,
    };
    return animObject;
  });

const getBySex = (loc, sort, sex) => data.species
  .filter((specie) => specie.location === loc)
  .map((specie) => {
    if (sex) {
      const sexNames = specie.residents
        .filter((animal) => animal.sex === sex)
        .map(({ name }) => name);
      const animBySex = { [specie.name]: sexNames };
      if (sort) return { [specie.name]: sexNames.sort() };
      return animBySex;
    }
    const animals = specie.residents.map((resident) => resident.name);
    const animObject = { [specie.name]: animals };
    return animObject;
  });

const createAnimalMap = (callback, sort = false, sex = '') => ({
  NE: callback('NE', sort, sex),
  NW: callback('NW', sort, sex),
  SE: callback('SE', sort, sex),
  SW: callback('SW', sort, sex),
});

function getAnimalMap({ sorted = false, includeNames = false, sex = '' } = {}) {
  if (!includeNames) return createAnimalMap(location);
  if (sex) return createAnimalMap(getBySex, sorted, sex);
  if (sorted) return createAnimalMap(namesIncluded, sorted);
  if (includeNames) return createAnimalMap(namesIncluded);
  return createAnimalMap(location);
}

// REQUISITO 10
const hoursArr = Object.entries(data.hours);
function getSchedule(dayName) {
  const defSchedule = hoursArr.reduce((acc, day) => {
    const weekDay = day[0];
    const { open } = day[1];
    const { close } = day[1];
    const msg = `Open from ${open}am until ${close - 12}pm`;
    if (weekDay === 'Monday') {
      acc[weekDay] = 'CLOSED';
      return acc;
    }
    acc[weekDay] = msg;

    return acc;
  }, {});

  if (dayName) {
    return ({ [dayName]: defSchedule[dayName] });
  }
  return defSchedule;
}

// REQUISITO 11
function getOldestFromFirstSpecies(id) {
  const getEmployee = data.employees.find((employee) => employee.id === id).responsibleFor[0];
  const getAnimal = data.species.find((animal) => animal.id === getEmployee).residents;
  const getOlder = getAnimal.reduce((acc, actual) => (acc.age > actual.age ? acc : actual));
  return [getOlder.name, getOlder.sex, getOlder.age];
}
console.log(getOldestFromFirstSpecies('c5b83cb3-a451-49e2-ac45-ff3f54fbe7e1'));
// REQUISITO 12

function increasePrices(percentage) {
  // seu código aqui
}

// REQUISITO 13

function getEmployeeCoverage(idOrName) {
  // seu código aqui
}

module.exports = {
  calculateEntry,
  getSchedule,
  countAnimals,
  getAnimalMap,
  getSpeciesByIds,
  getEmployeeByName,
  getEmployeeCoverage,
  addEmployee,
  isManager,
  getAnimalsOlderThan,
  getOldestFromFirstSpecies,
  increasePrices,
  createEmployee,
};
