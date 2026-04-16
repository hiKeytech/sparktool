import type { Course } from "sparktool-contracts/course";
import type { User } from "sparktool-contracts/user";

type CourseWithId = Course & { id: string };
type UserWithId = User & { id: string };

export function filterCoursesBySearch(
  courses: CourseWithId[],
  searchTerm: string,
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
      field?.toLowerCase().includes(normalizedSearch),
    );
  });
}

export function filterUsersBySearch(
  users: UserWithId[],
  searchTerm: string,
): UserWithId[] {
  if (!searchTerm) return users;

  const normalizedSearch = searchTerm.toLowerCase().trim();

  return users.filter((user) => {
    const searchableFields = [
      user.displayName,
      user.email,
      user.studentId,
    ].filter(Boolean);

    return searchableFields.some((field) =>
      field?.toLowerCase().includes(normalizedSearch),
    );
  });
}
