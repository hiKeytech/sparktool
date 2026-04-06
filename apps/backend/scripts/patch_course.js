const fs = require('fs');

let content = fs.readFileSync('src/schemas/course.ts', 'utf8');

// 1. Add zod import
if (!content.includes('import { z } from "zod";')) {
  // Add below other imports
  content = content.replace(/(import .*?from.*?;\n)/, '$1import { z } from "zod";\n');
}

// 2. Replace the Course type definition
content = content.replace(/export type Course = Nullish<\{[\s\S]*?updatedAt: number;\n\}>;/, 
`export const instructorSchema = z.object({
  biography: z.string(),
  email: z.string().email(),
  name: z.string(),
  title: z.string(),
});

export const courseSchema = z.object({
  averageRating: z.number(),
  category: z.string(),
  completionCount: z.number(),
  completionRate: z.number(),
  createdAt: z.number(),
  createdBy: z.string(),
  createdByMeta: z.object({
    name: z.string(),
    photoUrl: z.string(),
  }),
  description: z.string(),
  difficulty: z.enum(["advanced", "beginner", "intermediate"]),
  enrollmentCount: z.number(),
  estimatedDurationInMinutes: z.number(),
  featured: z.boolean(),
  hasCertificate: z.boolean().optional(),
  certificateTemplateId: z.string().optional(),
  id: z.string(),
  instructors: z.array(instructorSchema),
  language: z.string(),
  lastModifiedBy: z.string(),
  learningObjectives: z.array(z.string()),
  level: z.enum(["advanced", "beginner", "intermediate"]),
  prerequisites: z.array(z.string()),
  previewVideoUrl: z.string(),
  price: z.number(),
  published: z.boolean(),
  publishedAt: z.number(),
  sections: z.array(z.string()),
  shortDescription: z.string(),
  tags: z.array(z.string()),
  tenantId: z.string(),
  thumbnailUrl: z.string(),
  title: z.string(),
  totalLessons: z.number(),
  totalQuizzes: z.number(),
  totalRatings: z.number(),
  updatedAt: z.number(),
});

export type Instructor = z.infer<typeof instructorSchema>;
export type Course = z.infer<typeof courseSchema>;`);

// 3. Remove the existing Instructor type definition
content = content.replace(/export type Instructor = Nullish<\{[\s\S]*?\}>;/, '');
content = content.replace(/export type CourseLevel = "advanced" \| "beginner" \| "intermediate";/, 'export type CourseLevel = z.infer<typeof courseSchema>["level"];');

fs.writeFileSync('src/schemas/course.ts', content);
