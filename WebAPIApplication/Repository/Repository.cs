
using System.Collections.Generic;
using MongoDB.Bson;
using MongoDB.Bson.Serialization;
using MongoDB.Driver;
using WebAPIApplication.Models;

namespace WebAPIApplication.Repository
{
    public class Repository<T> 
    {
        private string _collectionName { get; set; }
        private static IMongoClient _client;
        private static IMongoDatabase _database;
        private IMongoCollection<T> _collection;

        public Repository(string collectionName)
        {
            this._collectionName = collectionName;
            string connectionString = "mongodb://mongodb:27017";
            MongoClientSettings settings = MongoClientSettings.FromUrl(new MongoUrl(connectionString));
            _client = new MongoClient(settings);
            _database = _client.GetDatabase("productmanager");
            _collection = _database.GetCollection<T>(this._collectionName);
        }
        protected T Insert(T obj)
        {
            this._collection.InsertOne(obj);
            return this.Get((obj as StorableObject).Id);
        }

        protected List<T> SelectAll()
        {
            return this._collection.Find(new BsonDocument()).ToList();
        }

        protected List<T> Filter(string jsonQuery)
        {
            var queryDoc = new QueryDocument(BsonSerializer.Deserialize<BsonDocument>(jsonQuery));
            return _collection.Find<T>(queryDoc).ToList();
        }

        protected T Get(string id)
        {
            return this._collection.Find(new BsonDocument { { "Id", new ObjectId(id) } }).FirstAsync().Result;
        }
        protected T Get(ObjectId id)
        {
            return this._collection.Find(new BsonDocument { { "Id", id } }).FirstAsync().Result;
        }
        protected T Update(string id, T obj)
        {
            (obj as StorableObject).Id = new ObjectId(id);

            var filter = Builders<T>.Filter.Eq(s => (s as StorableObject).Id, (obj as StorableObject).Id);
            this._collection.ReplaceOneAsync(filter, obj);
            return this.Get(id);
        }

        protected bool Remove(string id){
            var obj = new ObjectId(id);

            var filter = Builders<T>.Filter.Eq(s => (s as StorableObject).Id, obj);
            var result = this._collection.DeleteOne(filter);
            return result.DeletedCount == 1;
        }
        
    }
}