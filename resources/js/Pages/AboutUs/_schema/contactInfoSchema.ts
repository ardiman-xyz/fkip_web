import { z } from "zod";

export const contactInfoSchema = z.object({
    email: z
        .string({
            required_error: "Email harus diisi",
        })
        .email("Format email tidak valid"),
    phone: z
        .string({
            required_error: "Nomor telepon harus diisi",
        })
        .min(1, "Nomor telepon harus diisi"),
    fax: z.string().optional(),
    address: z
        .string({
            required_error: "Alamat harus diisi",
        })
        .min(1, "Alamat harus diisi"),
    latitude: z.string().optional(),
    longitude: z.string().optional(),
    google_maps_url: z.string().optional(),
    operating_hours: z.object({
        monday_friday: z
            .string({
                required_error: "Jam operasional Senin-Jumat harus diisi",
            })
            .min(1, "Jam operasional Senin-Jumat harus diisi"),
        saturday: z.string().optional(),
        sunday: z.string().optional(),
    }),
    social_media: z.object({
        facebook: z.string().url("URL Facebook tidak valid").optional(),
        instagram: z.string().url("URL Instagram tidak valid").optional(),
        twitter: z.string().url("URL Twitter tidak valid").optional(),
        youtube: z.string().url("URL YouTube tidak valid").optional(),
        linkedin: z.string().url("URL LinkedIn tidak valid").optional(),
    }),
    department_contacts: z
        .array(
            z.object({
                name: z
                    .string({
                        required_error: "Nama departemen harus diisi",
                    })
                    .min(1, "Nama departemen harus diisi"),
                phone: z
                    .string({
                        required_error: "Nomor telepon harus diisi",
                    })
                    .min(1, "Nomor telepon harus diisi"),
                email: z
                    .string({
                        required_error: "Email harus diisi",
                    })
                    .email("Format email tidak valid"),
            })
        )
        .optional(),
});

export type ContactInfoFormData = z.infer<typeof contactInfoSchema>;
