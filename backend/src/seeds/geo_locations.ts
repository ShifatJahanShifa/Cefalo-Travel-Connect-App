import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {

    await knex("geo_locations").del();

    await knex("geo_locations").insert([
        { latitude:  23.7495 , longitude: 90.3945 , location_name: 'sonargaon hotel' },
        { latitude:  23.8041 , longitude: 90.4152 , location_name: 'dhaka' }
    ]);
};
