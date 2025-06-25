var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { dbClient } from "../../db/db.js";
const db = dbClient.getConnection();
class Proximity {
    createProximity(input) {
        return __awaiter(this, void 0, void 0, function* () {
            const [proximity] = yield db("proximity").insert({
                user_id: input.user_id,
                type: input.type,
                reference_id: input.reference_id,
                radius: input.radius
            })
                .returning("*");
            return proximity;
        });
    }
    findUserProximity(user_id) {
        return __awaiter(this, void 0, void 0, function* () {
            const proximity = yield db("proximity").where({
                user_id: user_id,
                type: "wishlist"
            });
            return proximity;
        });
    }
    updateProximity(input) {
        return __awaiter(this, void 0, void 0, function* () {
            // at first deleteing the existing ones 
            yield db("proximity").where({
                user_id: input.user_id,
                type: input.type
            })
                .del();
            // then add ones 
            const result = yield this.createProximity(input);
            return result;
        });
    }
    deleteProximityById(proximity_id) {
        return __awaiter(this, void 0, void 0, function* () {
            // add try catch
            yield db("proximity").where({
                proximity_id: proximity_id
            })
                .del();
            return true;
        });
    }
    deleteProximity(input) {
        return __awaiter(this, void 0, void 0, function* () {
            yield db("proximity").where({
                user_id: input.user_id,
                type: input.type,
                reference_id: input.reference_id
            })
                .del();
            return true;
        });
    }
}
const proximityDao = new Proximity();
export default proximityDao;
