function formatPersons(persons) {
  return persons.map(person => ({
    ...person,
    firstName: person.name,
    status: 'active',
  }));
}

export default formatPersons;
