import { z } from "zod";

export const liveSessionStatusSchema = z.enum([
  "active",
  "cancelled",
  "ended",
  "scheduled",
]);
export type LiveSessionStatus = z.infer<typeof liveSessionStatusSchema>;

export const liveSessionSchema = z.object({
  courseId: z.string().optional(),
  createdAt: z.number().default(() => Date.now()),
  description: z.string(),
  duration: z.number(),
  id: z.string(),
  instructorId: z.string(),
  instructorName: z.string(),
  jitsiMeetUrl: z.string(),
  maxParticipants: z.number().optional(),
  meetingId: z.string(),
  participants: z.array(z.string()).default([]),
  recordingUrl: z.string().optional(),
  scheduledAt: z.string(),
  status: liveSessionStatusSchema.default("scheduled"),
  tenantId: z.string(),
  title: z.string(),
  updatedAt: z.number().default(() => Date.now()),
});

export type LiveSession = z.infer<typeof liveSessionSchema>;

export const createLiveSessionSchema = z.object({
  courseId: z.string().optional(),
  description: z.string(),
  duration: z.number(),
  instructorName: z.string(),
  maxParticipants: z.number().optional(),
  scheduledAt: z.string(),
  title: z.string(),
});

export type CreateLiveSession = z.infer<typeof createLiveSessionSchema>;

export const updateLiveSessionSchema = liveSessionSchema
  .pick({
    description: true,
    duration: true,
    maxParticipants: true,
    recordingUrl: true,
    scheduledAt: true,
    status: true,
    title: true,
  })
  .partial();

export type UpdateLiveSession = z.infer<typeof updateLiveSessionSchema>;
