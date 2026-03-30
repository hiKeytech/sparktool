import type { CourseWithStructure } from "@/schemas/course";
import type { Course, CourseLesson, CourseSection } from "@/types";

import { Anchor, Breadcrumbs, Text } from "@mantine/core";
import { IconBook as IconBookOpen, IconHome, IconList, IconVideo } from "@tabler/icons-react";
import { Link } from "@tanstack/react-router";

import React from "react";

interface CourseBreadcrumbsProps {
  course?: Course | CourseWithStructure;
  lesson?: CourseLesson;
  section?: CourseSection;
  variant?: "compact" | "full";
}

export const CourseBreadcrumbs: React.FC<CourseBreadcrumbsProps> = ({
  course,
  lesson,
  section,
  variant = "full",
}) => {
  const breadcrumbItems = [
    {
      href: "/student/dashboard",
      icon: <IconHome size={14} />,
      title: "Home",
    },
    {
      href: "/student/courses",
      icon: <IconBookOpen size={14} />,
      title: "Course Catalog",
    },
  ];

  if (course) {
    breadcrumbItems.push({
      href: `/student/courses/${course.id}`,
      icon: <IconBookOpen size={14} />,
      title: course.title ?? "Untitled Course",
    });
  }

  if (section && course) {
    // Determine section ID fallback if missing
    const sectionId = (section as any).id || section.title || "section";
    breadcrumbItems.push({
      href: `/student/courses/${course.id}?section=${sectionId}`,
      icon: <IconList size={14} />,
      title: section.title ?? "Untitled Section",
    });
  }

  if (lesson && section && course) {
    breadcrumbItems.push({
      href: `/student/courses/${course.id}?lesson=${lesson.id}`,
      icon: <IconVideo size={14} />,
      title: lesson.title ?? "Untitled Lesson",
    });
  }

  if (variant === "compact") {
    // Show only the last 3 items for compact mode
    const compactItems = breadcrumbItems.slice(-3);
    return (
      <Breadcrumbs separator="/">
        {compactItems.map((item, index) => {
          const isLast = index === compactItems.length - 1;
          const isSecondLast = index === compactItems.length - 2;

          if (isLast) {
            return (
              <Text c="fun-green" fw={600} key={item.href} size="sm">
                {item.title.length > 25
                  ? `${item.title.substring(0, 25)}...`
                  : item.title}
              </Text>
            );
          }

          return (
            <Anchor
              c={isSecondLast ? "fun-green.6" : "dimmed"}
              component={Link}
              key={item.href}
              size="sm"
              to={item.href}
              underline="hover"
            >
              {item.title.length > 20
                ? `${item.title.substring(0, 20)}...`
                : item.title}
            </Anchor>
          );
        })}
      </Breadcrumbs>
    );
  }

  return (
    <Breadcrumbs separator="/">
      {breadcrumbItems.map((item, index) => {
        const isLast = index === breadcrumbItems.length - 1;

        if (isLast) {
          return (
            <Text c="fun-green" fw={600} key={item.href} size="sm">
              {item.title}
            </Text>
          );
        }

        return (
          <Anchor
            c="fun-green.6"
            component={Link}
            key={item.href}
            size="sm"
            to={item.href}
            underline="hover"
          >
            {item.title}
          </Anchor>
        );
      })}
    </Breadcrumbs>
  );
};
