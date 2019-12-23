const path = require("path");
process.env.DEBUG = "mongo-seeding";
const { Seeder } = require("mongo-seeding");

const config = {
  // 'library' is the database name,
  // If DB doesn't exist it will create one by default
  database: "mongodb://127.0.0.1:27017/library",
  dropDatabase: true
};
const seeder = new Seeder(config);
const collections = seeder.readCollectionsFromPath(path.resolve("../data"), {
  transformers: [Seeder.Transformers.replaceDocumentIdWithUnderscoreId]
});

seeder
  .import(collections)
  .then(() => {
    console.log("Success");
  })
  .catch(err => {
    console.log("Error", err);
  });
