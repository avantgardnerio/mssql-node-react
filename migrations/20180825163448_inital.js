
exports.up = function (knex, Promise) {
    return knex.schema.createTable('person', (table) => {
        table.increments();
        table.string('givenName');
        table.string('familyName');
    })
};

exports.down = function (knex, Promise) {

};
