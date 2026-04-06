import type { Course, User } from "@/types";

// Types for entities with id (from Firebase docs)
type CourseWithId = Course & { id: string };
type UserWithId = User & { id: string };

/**
 * Filter courses by search term (client-side for now)
 * TODO: Consider server-side search indexing for large datasets
 */
export function filterCoursesBySearch(
  courses: CourseWithId[],
  searchTerm: string
): CourseWithId[] {
  if (!searchTerm) return courses;

  const normalizedSearch = searchTerm.toLowerCase().trim();

  return courses.filter((course) => {
    const instructorNames =
      course.instructors?.map((instructor) => instructor.name).join(" ") || "";
    const searchableFields = [
      course.title,
      course.description,
      course.category,
      instructorNames,
    ].filter(Boolean);

    return searchableFields.some((field) =>
      field?.toLowerCase().includes(normalizedSearch)
    );
  });
}

/**
 * Filter users by search term (client-side for now)
 * TODO: Consider server-side search indexing for large datasets
 */
export function filterUsersBySearch(
  users: UserWithId[],
  searchTerm: string
): UserWithId[] {
  if (!searchTerm) return users;

  const normalizedSearch = searchTerm.toLowerCase().trim();

  return users.filter((user) => {
    const searchableFields = [
      user.displayName,
      user.email,
      user.studentId,
    ].filter(Boolean); // Remove undefined/null values

    return searchableFields.some((field) =>
      field?.toLowerCase().includes(normalizedSearch)
    );
  });
}

/**
 * Check if any filters require database queries
 */
export function hasServerSideFilters(filters: Record<string, any>): boolean {
  const serverSideFilterKeys = [
    "published",
    "category",
    "difficulty",
    "role",
    "isActive",
  ];
  return serverSideFilterKeys.some((key) => filters[key] !== undefined);
}
