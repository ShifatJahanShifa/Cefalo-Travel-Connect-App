import { getDistanceInKm } from "../../../src/utils/getDistance.ts";


describe('getDistanceInKm', () => {
   
    it('should return 0 when both points are the same', () => {
        const distance = getDistanceInKm(23.8103, 90.4125, 23.8103, 90.4125);

        expect(distance).toBeCloseTo(0, 5);
    });

   
    it('should return approx. 215 km for Dhaka to Chittagong', () => {
        const distance = getDistanceInKm(23.8041, 90.4152, 22.3752, 91.8349);

        expect(distance).toBeCloseTo(215, 0); 
    });

   
    it('should return approx. 3936 km for New York to LA', () => {
        const distance = getDistanceInKm(40.7128, -74.0060, 34.0549, -118.2426);

        expect(distance).toBeCloseTo(3936, 0); 
    });

  
    it('should work near the poles and international date line', () => {
        const distance = getDistanceInKm(89.9, 179.9, -89.9, -179.9);

        expect(distance).toBeGreaterThan(0);
        expect(distance).toBeLessThan(20040); 
    });

    
    it('should return same result if coordinates are swapped', () => {
        const d1 = getDistanceInKm(23.8103, 90.4125, 22.3569, 91.7832);
        const d2 = getDistanceInKm(22.3569, 91.7832, 23.8103, 90.4125);

        expect(d1).toBeCloseTo(d2, 0);
    });


    it('should return a number', () => {
        const distance = getDistanceInKm(0, 0, 10, 10);

        expect(typeof distance).toBe('number');
    });

});