import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
    
    await knex("hotels").del();

    await knex("hotels").insert([
        { hotel_name: 'sonargaon', geo_location_id: 11 , cost_per_night: 12.90}
    ]);
};
