import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    await knex("places").del();

    
    await knex("places").insert([
        { place_name: 'dhaka', geo_location_id: 12 },
        
    ]);
};
