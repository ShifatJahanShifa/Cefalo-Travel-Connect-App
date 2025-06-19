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
        yield knex('post_categories').del();
        // Inserts seed entries
        yield knex('post_categories').insert([
            { category_name: 'Adventure' },
            { category_name: 'Beach' },
            { category_name: 'Cultural Site' },
            { category_name: 'Food & Cuisine' },
            { category_name: 'Luxury' },
            { category_name: 'Budget Travel' },
            { category_name: 'Historical' },
            { category_name: 'Nature' },
            { category_name: 'Road Trip' },
            { category_name: 'Festival & Events' },
            { category_name: 'Heritage' }
        ]);
    });
}
;
