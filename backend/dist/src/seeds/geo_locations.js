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
        yield knex("geo_locations").del();
        yield knex("geo_locations").insert([
            { latitude: 23.7495, longitude: 90.3945, location_name: 'sonargaon hotel' },
            { latitude: 23.8041, longitude: 90.4152, location_name: 'dhaka' }
        ]);
    });
}
;
