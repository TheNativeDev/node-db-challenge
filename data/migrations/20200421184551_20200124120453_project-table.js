exports.up = function(knex) {
    return knex.schema
    .createTable('projects', tbl => {
      tbl.increments();
      tbl.text('project_name', 128)
        .unique()
        .notNullable();
	tbl.text('project_description');
	tbl.boolean('completed').defaultTo(false);
	})

    .createTable('resources', tbl => {
        tbl.increments();
        tbl.text('resource_name')
        .unsigned()
        .notNullable()
      
	tbl.text('resource_description');
	})


    .createTable('tasks', tbl => {
        tbl.increments();
        tbl.text('task_description')
          .unsigned()
          .notNullable()
	tbl.text('notes');
	tbl.boolean('completed').defaultTo(false);
    tbl.integer('project_id')
        .unsigned()
        .notNullable()
        .references('id')
        .inTable('projects')
        .onUpdate('CASCADE')
        .onDelete('CASCADE');
    })

}

exports.down = function(knex) {
    return knex.schema
    .dropTableIfExists('tasks')
    .dropTableIfExists('resources')
    .dropTableIfExists('projects')
    
};