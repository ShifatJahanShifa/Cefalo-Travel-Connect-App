var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export function seed(knex) {
    return __awaiter(this, void 0, void 0, function* () {
        yield knex("transports").del();
        // Inserts seed entries
        yield knex("transports").insert([
            { transport_type: 'bus', transport_provider: 'hanif poribohon', starting_location_id: 11, ending_location_id: 12, cost_per_person: 100.00 },
        ]);
    });
}
;
