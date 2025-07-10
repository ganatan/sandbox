import { getDb } from '../../config/database.js';

class CityRepository {
  constructor(useDatabase) {
    this.useDatabase = useDatabase;
    this.collectionName = 'cities';
    this.items = [
      { id: 1, name: 'New York' },
      { id: 2, name: 'Los Angeles' },
      { id: 3, name: 'Chicago' },
    ];
  }

  async getItems() {
    if (this.useDatabase) {
      try {
        const db = getDb();

        return await db.collection(this.collectionName).find({}).toArray();
      } catch (error) {
        console.error(`Database error: ${error.message}`);
      }

      return [];
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
      }

      return null;
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
      }

      return null;
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
      }

      return null;
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
      }

      return null;
    }

    const index = this.items.findIndex((item) => item.id === id);
    if (index === -1) {
      return Promise.resolve(null);
    }

    return Promise.resolve(this.items.splice(index, 1)[0]);
  }
}

export default CityRepository;
