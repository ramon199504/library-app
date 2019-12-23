const path = require("path");
process.env.DEBUG = "mongo-seeding";
const { Seeder } = require("mongo-seeding");

const config = {
  database: {
    name: "library"
  },
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
