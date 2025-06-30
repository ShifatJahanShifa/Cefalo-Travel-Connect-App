import { getTransport } from "../../src/types/transport.type.ts";

export const mockTransport: getTransport = {
    transport_id: 'trans-123',
    transport_type: 'bus',
    transport_name: 'Hanif Poribohon'
};

export const mockUpdatedTransport: getTransport = {
    transport_id: 'trans-123',
    transport_type: 'train',
    transport_name: 'Hanif Poribohon'
};