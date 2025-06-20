import { Knex } from "knex";

export async function seed(knex: Knex): Promise<void> {
  
    await knex("transports").del();

    // Inserts seed entries
    await knex("transports").insert([
        { transport_type: 'bus', transport_provider: 'hanif poribohon', starting_location_id: 11, ending_location_id: 12, cost_per_person: 100.00},
        
    ]);
};
