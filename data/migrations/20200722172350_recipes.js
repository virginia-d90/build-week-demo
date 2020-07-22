
exports.up = function(knex) {
  return knex.schema.table("recipes", tbl => {
      tbl.integer("users")
        .unsigned()
        .references("users.id")
  })
};

exports.down = function(knex) {
  return knex.schema.table("recipes", tbl => {
      tbl.dropColumn("users")
  })
};
