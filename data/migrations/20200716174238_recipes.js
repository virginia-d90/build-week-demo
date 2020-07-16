
exports.up = function(knex) {
  return knex.schema.createTable("recipes", tbl => {
      tbl.increments()
      tbl.string("title", 50)
        .notNullable()
      tbl.string("source", 1024)
      tbl.string("ingredients", 2500)
      tbl.string("instructions", 2500)
  })
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists("recipes")
};
