import { z } from "zod";
export const enquirySchema = z.object({
  name: z.string().trim().min(2, "Enter your full name.").max(100),
  business: z.string().trim().min(2, "Enter your business name.").max(150),
  email: z.email("Enter a valid email address.").max(254),
  phone: z
    .string()
    .trim()
    .regex(/^\+?[\d\s()-]{8,20}$/, "Enter a valid phone number.")
    .refine(
      (v) => v.replace(/\D/g, "").length >= 8,
      "Enter at least eight digits.",
    ),
  category: z.string().min(1, "Choose a business category.").max(100),
  service: z.string().min(1, "Choose a service.").max(150),
  budget: z.string().min(1, "Choose a budget.").max(100),
  message: z
    .string()
    .trim()
    .min(20, "Please add at least 20 characters.")
    .max(5000),
  date: z
    .string()
    .refine(
      (v) =>
        !v ||
        (/^\d{4}-\d{2}-\d{2}$/.test(v) &&
          !Number.isNaN(Date.parse(v)) &&
          v >= new Date().toISOString().slice(0, 10)),
      "Choose today or a future date.",
    ),
  consent: z
    .boolean()
    .refine((v) => v, "Please consent to enquiry processing."),
  website: z.string().max(0),
  plan: z.string().max(150),
  assessment: z.string().max(2500),
});
export type Enquiry = z.infer<typeof enquirySchema>;
