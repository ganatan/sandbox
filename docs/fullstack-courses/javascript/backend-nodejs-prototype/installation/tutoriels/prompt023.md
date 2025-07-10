
Si tu veux simuler un comportement asynchrone
Si tu veux que toutes les méthodes fonctionnent comme une base de données asynchrone, tu peux ajouter Promise.resolve() :



person-repository.js


  class PersonRepository {
    constructor() {
      this.items = [
        { id: 1, name: 'Steven Spielberg', city: 'Cincinnati' },
        { id: 2, name: 'Martin Scorsese', city: 'New York' },
        { id: 3, name: 'Quentin Tarantino', city: 'Knoxville' },
        { id: 4, name: 'Christopher Nolan', city: 'London' },
        { id: 5, name: 'Francis Ford Coppola', city: 'Detroit' },
        { id: 6, name: 'James Cameron', city: 'Kapuskasing' },
        { id: 7, name: 'David Fincher', city: 'Denver' },
        { id: 8, name: 'Tim Burton', city: 'Burbank' },
        { id: 9, name: 'Clint Eastwood', city: 'San Francisco' },
        { id: 10, name: 'Wes Anderson', city: 'Houston' },
        { id: 11, name: 'Spike Lee', city: 'Atlanta' },
        { id: 12, name: 'George Lucas', city: 'Modesto' },
      ];
    }

    async getItems() {
      return Promise.resolve(this.items);
    }

    async getItemById(id) {
      return Promise.resolve(this.items.find((item) => item.id === id) || null);
    }

    async createItem(person) {
      const newPerson = { id: this.items.length + 1, ...person };
      this.items.push(newPerson);
      return Promise.resolve(newPerson);
    }

    async updateItem(id, updatedData) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index === -1) return Promise.resolve(null);
      this.items[index] = { ...this.items[index], ...updatedData };
      return Promise.resolve(this.items[index]);
    }

    async deleteItem(id) {
      const index = this.items.findIndex((item) => item.id === id);
      if (index === -1) return Promise.resolve(null);
      return Promise.resolve(this.items.splice(index, 1)[0]);
    }
  }

  export default PersonRepository;
