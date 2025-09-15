import { getDb } from '../../config/database.js';

class PersonRepository {
  constructor(useDatabase) {
    this.useDatabase = useDatabase;
    this.collectionName = 'persons';
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
    if (this.useDatabase) {
      try {
        const db = getDb();

        return await db.collection(this.collectionName).find({}).toArray();
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return [];
      }
    }

    return Promise.resolve(this.items);
  }

  async getItemById(id) {
    if (this.useDatabase) {
      try {
        const db = getDb();

        return await db.collection(this.collectionName).findOne({ id });
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }

    return Promise.resolve(this.items.find((item) => item.id === id) || null);
  }

  async createItem(item) {
    if (this.useDatabase) {
      try {
        const db = getDb();
        const result = await db.collection(this.collectionName).insertOne(item);

        return result.ops[0];
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }
    const newItem = { id: this.items.length + 1, ...item };
    this.items.push(newItem);

    return Promise.resolve(newItem);
  }

  async updateItem(id, updatedData) {
    if (this.useDatabase) {
      try {
        const db = getDb();
        const result = await db
          .collection(this.collectionName)
          .updateOne({ id }, { $set: updatedData });

        if (result.modifiedCount === 0) {
          return null;
        }

        return await db.collection(this.collectionName).findOne({ id });
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }

    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }
    this.items[index] = { ...this.items[index], ...updatedData };

    return Promise.resolve(this.items[index]);
  }

  async deleteItem(id) {
    if (this.useDatabase) {
      try {
        const db = getDb();
        const result = await db.collection(this.collectionName).deleteOne({ id });

        if (result.deletedCount === 0) {
          return null;
        }

        return { id };
      } catch (error) {
        console.error(`Database error: ${error.message}`);

        return null;
      }
    }

    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {

      return Promise.resolve(null);
    }

    return Promise.resolve(this.items.splice(index, 1)[0]);
  }
}

export default PersonRepository;
