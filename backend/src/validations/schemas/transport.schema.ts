import { z } from "zod";

export const transportCreationSchema = z.object({
    transport_type: z.string({
        required_error: "Transport type is required"
    }),

    transport_name: z.string({
        required_error: "Transport name is required"
    }),

    cost_per_person: z
        .number({
        required_error: "Cost per person is required"
        })
        .min(0)
        .transform((val) => Number(val.toFixed(2))).optional(),

    starting_location_name: z.string({
        required_error: "Starting location name is required"
    }).optional(),

    starting_location_latitude: z
        .number({
        required_error: "Starting location latitude is required"
        })
        .min(-90)
        .max(90).optional(),

    starting_location_longitude: z
        .number({
        required_error: "Starting location longitude is required"
        })
        .min(-180)
        .max(180).optional(),

    ending_location_name: z.string({
        required_error: "Ending location name is required"
    }).optional(),

    ending_location_latitude: z
        .number({
        required_error: "Ending location latitude is required"
        })
        .min(-90)
        .max(90).optional(),

    ending_location_longitude: z
        .number({
        required_error: "Ending location longitude is required"
        })
        .min(-180)
        .max(180).optional()
});


export const transportUpdationSchema = z.object({
  transport_type: z.string().optional(),

  transport_name: z.string().optional(),

  cost_per_person: z
    .number()
    .nonnegative("Cost must be a non-negative number")
    .optional(),

  starting_location_name: z.string().optional(),

  starting_location_latitude: z
    .number()
    .min(-90)
    .max(90)
    .optional(),

  starting_location_longitude: z
    .number()
    .min(-180)
    .max(180)
    .optional(),

  ending_location_name: z.string().optional(),

  ending_location_latitude: z
    .number()
    .min(-90)
    .max(90)
    .optional(),

  ending_location_longitude: z
    .number()
    .min(-180)
    .max(180)
    .optional()
});
