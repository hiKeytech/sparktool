import type { Course, User } from "@/types";

/**
 * Create certificate document data
 */
export function createCertificateData(
  courseId: string,
  studentId: string,
  courseData: Course | null,
  studentData: null | User,
) {
  const { courseName, instructorName } = extractCourseDetails(courseData);
  const { studentName } = extractStudentDetails(studentData);

  return {
    completionDate: Date.now(),
    courseId,
    courseName,
    downloadCount: 0,
    instructorName,
    issued: {
      at: Date.now(),
      by: "system",
      name: "System",
      photoUrl: null,
    },
    modified: {
      at: Date.now(),
      by: "system",
      name: "System",
      photoUrl: null,
    },
    status: "issued",
    studentId,
    studentName,
  };
}

/**
 * Extract course details with fallback values
 */
export function extractCourseDetails(courseData: Course | null) {
  return {
    courseName: courseData?.title || "Unknown Course",
    instructorName:
      courseData?.instructors
        ?.map((instructor) => instructor.name)
        .join(", ") || "Unknown Instructor",
  };
}

/**
 * Extract student details with fallback values
 */
export function extractStudentDetails(studentData: null | User) {
  return {
    studentName: studentData?.displayName || "Unknown Student",
  };
}
