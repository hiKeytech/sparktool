import { r as reactExports, j as jsxRuntimeExports } from "../_libs/react.mjs";
import { af as Route$h, I as useAuthContext, _ as useListCourses, ag as useListCertificates, ah as useUpdateCertificate, P as PendingOverlay, M as DataTable, f as formatDate, g as useUsers, ae as useCreateCertificate, a9 as formatDateInput } from "./router-D664CQ4V.mjs";
import { N as NCSLogo } from "./ncs-logo-Drvs_Prq.mjs";
import { h as html2canvas } from "../_libs/html2canvas.mjs";
import { j as jsPDF } from "../_libs/jspdf.mjs";
import "./tenant-contract-BrIl-2Jr.mjs";
import "./course-structure-D2f1-VM0.mjs";
import "./index.mjs";
import "./platform-config-DKda_4-W.mjs";
import "./session-DEslDYHo.mjs";
import "./course-C8X6AilP.mjs";
import "./course-lesson-C_qGHOXP.mjs";
import "../_libs/aos.mjs";
import "../_libs/dayjs.mjs";
import { D as Container, y as Stack, E as Title, T as Text, G as Group, F as Card, J as TextInput, K as Select, a as Button, Q as Badge, Y as Tooltip, p as ActionIcon, V as Menu, x as Center, $ as Alert, B as Box } from "../_libs/mantine__core.mjs";
import { q as IconCertificate, c as IconSearch, h as IconFilter, X as IconPlus, ae as IconEye, A as IconDownload, ad as IconDots, a5 as IconSend, $ as IconTrash, I as IconCheck, b as IconAlertCircle } from "../_libs/tabler__icons-react.mjs";
import { m as modals } from "../_libs/mantine__modals.mjs";
import { u as useForm } from "../_libs/mantine__form.mjs";
import { m as motion } from "../_libs/framer-motion.mjs";
import "../_libs/tanstack__query-core.mjs";
import "../_libs/tanstack__react-router.mjs";
import "../_libs/tanstack__router-core.mjs";
import "../_libs/tanstack__history.mjs";
import "node:stream/web";
import "node:stream";
import "../_libs/react-dom.mjs";
import "util";
import "crypto";
import "async_hooks";
import "stream";
import "../_libs/isbot.mjs";
import "../_libs/@tanstack/react-router-ssr-query+[...].mjs";
import "../_libs/tanstack__react-query.mjs";
import "../_libs/@tanstack/router-ssr-query-core+[...].mjs";
import "../_libs/ibnlanre__builder.mjs";
import "../_libs/tanstack__react-query-devtools.mjs";
import "../_libs/@tanstack/react-router-devtools+[...].mjs";
import "../_libs/mantine-form-zod-resolver.mjs";
import "../_libs/zod.mjs";
import "../_libs/tanstack__react-table.mjs";
import "../_libs/tanstack__table-core.mjs";
import "../_libs/date-fns.mjs";
import "../_libs/mantine__notifications.mjs";
import "../_libs/mantine__hooks.mjs";
import "../_libs/mantine__store.mjs";
import "../_libs/react-transition-group.mjs";
import "../_libs/babel__runtime.mjs";
import "../_libs/react-remove-scroll.mjs";
import "tslib";
import "../_libs/react-remove-scroll-bar.mjs";
import "../_libs/react-style-singleton.mjs";
import "../_libs/get-nonce.mjs";
import "../_libs/use-sidecar.mjs";
import "../_libs/use-callback-ref.mjs";
import "node:async_hooks";
import "../_libs/clsx.mjs";
import "../_libs/react-textarea-autosize.mjs";
import "../_libs/use-latest.mjs";
import "../_libs/use-isomorphic-layout-effect.mjs";
import "../_libs/use-composed-ref.mjs";
import "../_libs/react-number-format.mjs";
import "../_libs/floating-ui__react.mjs";
import "../_libs/floating-ui__utils.mjs";
import "../_libs/floating-ui__react-dom.mjs";
import "../_libs/floating-ui__dom.mjs";
import "../_libs/floating-ui__core.mjs";
import "../_libs/klona.mjs";
import "../_libs/fast-deep-equal.mjs";
import "fs";
import "path";
import "../_libs/fflate.mjs";
import "../_libs/fast-png.mjs";
import "../_libs/iobuffer.mjs";
import "../_libs/pako.mjs";
import "../_libs/dompurify.mjs";
import "../_libs/canvg.mjs";
import "../_libs/core-js.mjs";
import "../_libs/raf.mjs";
import "../_libs/performance-now.mjs";
import "../_libs/rgbcolor.mjs";
import "../_libs/svg-pathdata.mjs";
import "../_libs/stackblur-canvas.mjs";
import "../_libs/motion-dom.mjs";
import "../_libs/motion-utils.mjs";
function CertificateGenerator({
  certificate,
  onClose,
  onGenerated,
  tenant,
  user
}) {
  const { data: courses } = useListCourses(tenant.id);
  const { data: users } = useUsers(tenant.id);
  const generateCertificateMutation = useCreateCertificate();
  const [generationComplete, setGenerationComplete] = reactExports.useState(false);
  const form = useForm({
    initialValues: {
      completionDate: certificate?.completionDate ? formatDateInput(certificate.completionDate).split(" ")[0] : "",
      courseId: certificate?.courseId || "",
      notes: "",
      studentId: certificate?.studentId || ""
    },
    validate: {
      completionDate: (value) => !value ? "Completion date is required" : null,
      courseId: (value) => !value ? "Course is required" : null,
      studentId: (value) => !value ? "Student is required" : null
    }
  });
  const handleSubmit = async (values) => {
    const selectedCourse = courses?.find((c) => c.id === values.courseId);
    const selectedStudent = users?.find((u) => u.uid === values.studentId);
    if (!selectedCourse || !selectedStudent) return;
    await generateCertificateMutation.mutateAsync(
      {
        data: {
          completionDate: new Date(values.completionDate).getTime(),
          courseId: values.courseId,
          courseName: selectedCourse.title ?? "Unknown Course",
          downloadCount: 0,
          instructorName: "System",
          issued: {
            at: Date.now(),
            by: user.uid,
            name: user.displayName ?? "System",
            photoUrl: user.photoURL ?? ""
          },
          modified: {
            at: Date.now(),
            by: user.uid,
            name: user.displayName ?? "System",
            photoUrl: user.photoURL ?? ""
          },
          status: "issued",
          studentId: values.studentId,
          studentName: selectedStudent.displayName || "Unknown Student",
          tenantId: tenant.id
        },
        userId: user.uid
      },
      {
        onSuccess: () => {
          onGenerated();
          setGenerationComplete(true);
        }
      }
    );
  };
  if (generationComplete) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { h: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "flex items-center justify-center w-16 h-16 bg-green-100 rounded-full", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCheck, { className: "text-green-600", size: 32 }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "text-green-800", fw: 500, size: "lg", children: "Certificate Generated Successfully!" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", ta: "center", children: "The certificate has been generated and is ready for download" })
    ] }) });
  }
  if (generateCertificateMutation.isPending) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(
      PendingOverlay,
      {
        instruction: "Please wait while we create the certificate with official branding",
        reason: "Generating Certificate...",
        visible: generateCertificateMutation.isPending
      }
    );
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx("form", { onSubmit: form.onSubmit(handleSubmit), children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-fun-green-600", size: 24 }),
      /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "lg", children: "Generate New Certificate" }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Create an official certificate for course completion" })
      ] })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          data: users?.map((user2) => ({
            label: `${user2.displayName || "Unknown"} (${user2.email || "No Email"})`,
            value: user2.uid || ""
          })) || [],
          label: "Student",
          placeholder: "Select a student",
          required: true,
          searchable: true,
          ...form.getInputProps("studentId")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Select,
        {
          data: courses?.map((course) => ({
            label: course.title ?? "Untitled Course",
            value: course.id
          })) || [],
          label: "Course",
          placeholder: "Select a course",
          required: true,
          searchable: true,
          ...form.getInputProps("courseId")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          label: "Completion Date",
          required: true,
          type: "date",
          ...form.getInputProps("completionDate")
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        TextInput,
        {
          label: "Additional Notes",
          placeholder: "Optional notes for the certificate",
          ...form.getInputProps("notes")
        }
      )
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      Alert,
      {
        color: "blue",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
        title: "Certificate Generation",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: "The certificate will be generated with official Nigerian Correctional Service branding and will include a unique verification code. Once generated, it can be downloaded as a PDF and will be automatically added to the student's achievements." })
      }
    ),
    generateCertificateMutation.isError && /* @__PURE__ */ jsxRuntimeExports.jsx(
      Alert,
      {
        color: "red",
        icon: /* @__PURE__ */ jsxRuntimeExports.jsx(IconAlertCircle, { size: 16 }),
        title: "Generation Failed",
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: generateCertificateMutation.error?.message || "An error occurred while generating the certificate. Please try again." })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", pt: "md", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          disabled: generateCertificateMutation.isPending,
          onClick: onClose,
          variant: "light",
          children: "Cancel"
        }
      ),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-800 hover:bg-fun-green-700",
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSend, { size: 16 }),
          loading: generateCertificateMutation.isPending,
          type: "submit",
          children: "Generate Certificate"
        }
      )
    ] })
  ] }) });
}
const CertificateTemplate = ({ certificate, institutionName = "Nigerian Correctional Service", instructorName = "Training Coordinator", ref }) => {
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(
    Box,
    {
      className: "bg-white",
      ref,
      style: {
        fontFamily: "Inter, system-ui, sans-serif",
        height: "210mm",
        // A4 landscape height
        padding: "20mm",
        width: "297mm"
        // A4 landscape width
      },
      children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { mb: 40, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "sm", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: 0, children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Box,
              {
                style: { backgroundColor: "#359a61", height: 40, width: 30 }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Box,
              {
                style: {
                  backgroundColor: "white",
                  border: "1px solid #359a61",
                  height: 40,
                  width: 30
                }
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Box,
              {
                style: { backgroundColor: "#359a61", height: 40, width: 30 }
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(NCSLogo, { size: 60 }) }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Title,
            {
              order: 1,
              style: {
                color: "#359a61",
                fontSize: "36px",
                fontWeight: 700,
                textAlign: "center"
              },
              children: "FEDERAL REPUBLIC OF NIGERIA"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Title,
            {
              order: 2,
              style: {
                color: "#1f2937",
                fontSize: "28px",
                fontWeight: 600,
                textAlign: "center"
              },
              children: institutionName.toUpperCase()
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Text,
            {
              style: {
                color: "#6b7280",
                fontSize: "18px",
                textAlign: "center"
              },
              children: "TechForward Professional Development Program"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { mb: 40, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "lg", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { size: 60, style: { color: "#359a61" } }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Title,
            {
              order: 1,
              style: {
                color: "#1f2937",
                fontSize: "42px",
                fontWeight: 700,
                textAlign: "center"
              },
              children: "CERTIFICATE OF COMPLETION"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Text,
            {
              style: {
                color: "#6b7280",
                fontSize: "20px",
                textAlign: "center"
              },
              children: "This is to certify that"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Box,
            {
              style: {
                borderBottom: "3px solid #359a61",
                paddingBottom: "8px",
                paddingLeft: "40px",
                paddingRight: "40px"
              },
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(
                Title,
                {
                  order: 1,
                  style: {
                    color: "#359a61",
                    fontSize: "38px",
                    fontWeight: 700,
                    textAlign: "center"
                  },
                  children: certificate.studentName
                }
              )
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Text,
            {
              style: {
                color: "#6b7280",
                fontSize: "20px",
                marginTop: "20px",
                textAlign: "center"
              },
              children: "has successfully completed the course"
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Title,
            {
              order: 2,
              style: {
                color: "#1f2937",
                fontSize: "32px",
                fontWeight: 600,
                marginTop: "20px",
                textAlign: "center"
              },
              children: certificate.courseName
            }
          ),
          /* @__PURE__ */ jsxRuntimeExports.jsx(
            Text,
            {
              style: {
                color: "#6b7280",
                fontSize: "18px",
                marginTop: "20px",
                textAlign: "center"
              },
              children: "demonstrating proficiency in the required competencies and meeting all assessment criteria"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-around", mb: 40, children: [
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                style: { color: "#359a61", fontSize: "16px", fontWeight: 600 },
                children: "COMPLETION DATE"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                style: { color: "#1f2937", fontSize: "18px", fontWeight: 500 },
                children: formatDate(certificate.completionDate)
              }
            )
          ] }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                style: { color: "#359a61", fontSize: "16px", fontWeight: 600 },
                children: "CERTIFICATE ID"
              }
            ),
            /* @__PURE__ */ jsxRuntimeExports.jsx(
              Text,
              {
                style: {
                  color: "#1f2937",
                  fontFamily: "monospace",
                  fontSize: "18px",
                  fontWeight: 500
                },
                children: certificate.id
              }
            )
          ] })
        ] }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(
          Group,
          {
            align: "flex-end",
            justify: "space-between",
            style: { marginTop: "40px" },
            children: [
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Box,
                  {
                    style: {
                      borderBottom: "2px solid #6b7280",
                      height: 1,
                      marginBottom: 8,
                      width: 200
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: "#1f2937",
                      fontSize: "16px",
                      fontWeight: 600,
                      textAlign: "center"
                    },
                    children: instructorName
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: "#6b7280",
                      fontSize: "14px",
                      textAlign: "center"
                    },
                    children: "Training Coordinator"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: "#6b7280",
                      fontSize: "12px",
                      textAlign: "center"
                    },
                    children: "Nigerian Correctional Service"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Box,
                  {
                    style: {
                      alignItems: "center",
                      backgroundColor: "#f0f9f4",
                      border: "2px solid #359a61",
                      borderRadius: "50%",
                      display: "flex",
                      height: 120,
                      justifyContent: "center",
                      width: 120
                    },
                    children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
                      Text,
                      {
                        style: {
                          color: "#359a61",
                          fontSize: "12px",
                          fontWeight: 600,
                          textAlign: "center"
                        },
                        children: [
                          "OFFICIAL",
                          /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                          "SEAL"
                        ]
                      }
                    )
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: "#6b7280",
                      fontSize: "12px",
                      textAlign: "center"
                    },
                    children: "Government Seal"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { align: "center", gap: "xs", children: [
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Box,
                  {
                    style: {
                      borderBottom: "2px solid #6b7280",
                      height: 1,
                      marginBottom: 8,
                      width: 200
                    }
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: "#1f2937",
                      fontSize: "16px",
                      fontWeight: 600,
                      textAlign: "center"
                    },
                    children: "Controller General"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: "#6b7280",
                      fontSize: "14px",
                      textAlign: "center"
                    },
                    children: "Nigerian Correctional Service"
                  }
                ),
                /* @__PURE__ */ jsxRuntimeExports.jsx(
                  Text,
                  {
                    style: {
                      color: "#6b7280",
                      fontSize: "12px",
                      textAlign: "center"
                    },
                    children: "Federal Republic of Nigeria"
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxRuntimeExports.jsx(
          Box,
          {
            style: {
              backgroundColor: "#f9fafb",
              border: "1px solid #e5e7eb",
              borderRadius: "8px",
              marginTop: "30px",
              padding: "15px"
            },
            children: /* @__PURE__ */ jsxRuntimeExports.jsxs(
              Text,
              {
                style: {
                  color: "#6b7280",
                  fontSize: "12px",
                  lineHeight: 1.5,
                  textAlign: "center"
                },
                children: [
                  "This certificate is issued electronically by the Nigerian Correctional Service TechForward Program.",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "For verification of authenticity, visit",
                  " ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: "techforward.corrections.gov.ng/verify" }),
                  " and enter the certificate ID: ",
                  /* @__PURE__ */ jsxRuntimeExports.jsx("strong", { children: certificate.id }),
                  /* @__PURE__ */ jsxRuntimeExports.jsx("br", {}),
                  "This document is protected by digital security measures and is valid only when verified through official channels."
                ]
              }
            )
          }
        )
      ]
    }
  );
};
CertificateTemplate.displayName = "CertificateTemplate";
function CertificatePreview({
  certificate,
  onClose
}) {
  const certificateRef = reactExports.useRef(null);
  if (!certificate) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(Center, { h: 200, children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "No certificate selected" }) });
  }
  const handleDownloadPDF = async () => {
    if (!certificateRef.current) return;
    try {
      const canvas = await html2canvas(certificateRef.current, {
        backgroundColor: "#ffffff",
        height: 794,
        // A4 landscape height in pixels at 96 DPI
        scale: 2,
        width: 1123
        // A4 landscape width in pixels at 96 DPI
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        format: "a4",
        orientation: "landscape",
        unit: "mm"
      });
      const imgWidth = 297;
      const imgHeight = canvas.height * imgWidth / canvas.width;
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`${certificate.id}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
    }
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "lg", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(
      motion.div,
      {
        animate: { opacity: 1, scale: 1 },
        initial: { opacity: 0, scale: 0.9 },
        style: {
          border: "1px solid #e5e7eb",
          borderRadius: "8px",
          maxHeight: "70vh",
          overflow: "auto"
        },
        transition: { duration: 0.5 },
        children: /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateTemplate, { certificate, ref: certificateRef })
      }
    ),
    /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { onClick: onClose, variant: "light", children: "Close Preview" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(
        Button,
        {
          className: "bg-fun-green-800 hover:bg-fun-green-700",
          leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 16 }),
          onClick: handleDownloadPDF,
          children: "Download PDF"
        }
      )
    ] })
  ] });
}
function createCertificatesTableColumns(actions) {
  return [
    {
      accessorKey: "studentName",
      cell: ({ row }) => /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: row.original.studentName }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs(Text, { c: "dimmed", size: "sm", children: [
          "ID: ",
          row.original.studentId
        ] })
      ] }),
      header: "Student"
    },
    {
      accessorKey: "courseName",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 500, size: "sm", children: getValue() }),
      header: "Course"
    },
    {
      accessorKey: "id",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: "font-mono", fw: 500, size: "sm", children: getValue() }),
      header: "Certificate ID"
    },
    {
      accessorKey: "completionDate",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: formatDate(getValue()) }),
      header: "Completion Date"
    },
    {
      accessorKey: "status",
      cell: ({ getValue }) => {
        const status = getValue();
        return /* @__PURE__ */ jsxRuntimeExports.jsx(Badge, { ...getStatusBadge(status), size: "sm" });
      },
      header: "Status"
    },
    {
      accessorKey: "downloadCount",
      cell: ({ getValue }) => /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { size: "sm", children: getValue() }),
      header: "Downloads"
    },
    {
      cell: ({ row }) => {
        const certificate = row.original;
        return /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "xs", children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: "Preview Certificate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionIcon,
            {
              color: "blue",
              onClick: () => actions.onPreview(),
              size: "sm",
              variant: "light",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconEye, { size: 14 })
            }
          ) }),
          certificate.status === "issued" && /* @__PURE__ */ jsxRuntimeExports.jsx(Tooltip, { label: "Download Certificate", children: /* @__PURE__ */ jsxRuntimeExports.jsx(
            ActionIcon,
            {
              color: "green",
              onClick: () => actions.onDownload(certificate.id),
              size: "sm",
              variant: "light",
              children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDownload, { size: 14 })
            }
          ) }),
          /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu, { position: "bottom-end", children: [
            /* @__PURE__ */ jsxRuntimeExports.jsx(Menu.Target, { children: /* @__PURE__ */ jsxRuntimeExports.jsx(ActionIcon, { color: "gray", size: "sm", variant: "light", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconDots, { size: 14 }) }) }),
            /* @__PURE__ */ jsxRuntimeExports.jsxs(Menu.Dropdown, { children: [
              certificate.status === "pending" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Menu.Item,
                {
                  leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSend, { size: 14 }),
                  onClick: () => actions.onGenerate(),
                  children: "Generate & Issue"
                }
              ),
              certificate.status === "issued" && /* @__PURE__ */ jsxRuntimeExports.jsx(
                Menu.Item,
                {
                  color: "red",
                  leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconTrash, { size: 14 }),
                  onClick: () => actions.onRevoke(certificate.id),
                  children: "Revoke Certificate"
                }
              )
            ] })
          ] })
        ] });
      },
      header: "Actions",
      id: "actions"
    }
  ];
}
function getStatusBadge(status) {
  switch (status) {
    case "issued":
      return { children: "Issued", color: "green" };
    case "pending":
      return { children: "Pending", color: "yellow" };
    case "revoked":
      return { children: "Revoked", color: "red" };
    default:
      return { children: "Unknown", color: "gray" };
  }
}
function AdminCertificates() {
  const {
    tenant
  } = Route$h.useRouteContext();
  const {
    user
  } = useAuthContext();
  const {
    data: courses,
    isLoading: coursesLoading
  } = useListCourses(tenant.id);
  const {
    data: certificates = [],
    isLoading: certificatesLoading
  } = useListCertificates(tenant.id);
  const updateCertificate = useUpdateCertificate();
  const [searchQuery, setSearchQuery] = reactExports.useState("");
  const [statusFilter, setStatusFilter] = reactExports.useState("all");
  const [courseFilter, setCourseFilter] = reactExports.useState("all");
  const filteredCertificates = certificates.filter((cert) => {
    const matchesSearch = (cert.studentName || "").toLowerCase().includes(searchQuery.toLowerCase()) || (cert.courseName || "").toLowerCase().includes(searchQuery.toLowerCase()) || cert.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || cert.status === statusFilter;
    const matchesCourse = courseFilter === "all" || cert.courseId === courseFilter;
    return matchesSearch && matchesStatus && matchesCourse;
  });
  function handleGenerateCertificate() {
    if (!tenant || !user) {
      return;
    }
    modals.open({
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CertificateGenerator, { certificate: null, onClose: () => modals.close("certificate-generator"), onGenerated: () => {
        modals.close("certificate-generator");
      }, tenant, user }),
      modalId: "certificate-generator",
      size: "lg",
      title: "Generate Certificate"
    });
  }
  function handlePreviewCertificate() {
    modals.open({
      children: /* @__PURE__ */ jsxRuntimeExports.jsx(CertificatePreview, { certificate: null, onClose: () => modals.close("certificate-preview") }),
      modalId: "certificate-preview",
      size: "xl",
      title: "Certificate Preview"
    });
  }
  const handleDownloadCertificate = (certificateId) => {
    const cert = certificates.find((c) => c.id === certificateId);
    if (!cert || !user?.uid) return;
    updateCertificate.mutate({
      certificateId,
      updates: {
        downloadCount: (cert.downloadCount || 0) + 1,
        status: cert.status || "issued"
      },
      userId: user.uid
    });
    modals.openConfirmModal({
      children: "This feature will be implemented to download the certificate as PDF.",
      labels: {
        cancel: "Cancel",
        confirm: "OK"
      },
      onConfirm: () => {
      },
      title: "Download Certificate"
    });
  };
  const handleRevokeCertificate = (certificateId) => {
    modals.openConfirmModal({
      children: "Are you sure you want to revoke this certificate? This action cannot be undone.",
      confirmProps: {
        color: "red"
      },
      labels: {
        cancel: "Cancel",
        confirm: "Revoke"
      },
      onConfirm: () => {
        const cert = certificates.find((c) => c.id === certificateId);
        if (!cert || !user?.uid) return;
        updateCertificate.mutate({
          certificateId,
          updates: {
            status: "revoked",
            downloadCount: cert.downloadCount || 0
          },
          userId: user.uid
        });
      },
      title: "Revoke Certificate"
    });
  };
  const totalCertificates = certificates.length;
  const issuedCertificates = certificates.filter((c) => c.status === "issued").length;
  const pendingCertificates = certificates.filter((c) => c.status === "pending").length;
  const isLoading = coursesLoading || certificatesLoading;
  if (isLoading) {
    return /* @__PURE__ */ jsxRuntimeExports.jsx(PendingOverlay, { reason: "Loading certificates...", visible: isLoading });
  }
  return /* @__PURE__ */ jsxRuntimeExports.jsx(Container, { className: "py-8", size: "xl", children: /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-duration": "500", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Stack, { gap: "xl", children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Title, { className: "text-fun-green-800", order: 1, children: "Certificate Management" }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "lg", children: "Generate, manage, and track certificates for course completions" })
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "100", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { grow: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-blue-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-blue-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Total Certificates" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: totalCertificates })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-green-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-green-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Issued" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: issuedCertificates })
        ] })
      ] }) }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { gap: "sm", children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "p-2 bg-yellow-100 rounded-lg", children: /* @__PURE__ */ jsxRuntimeExports.jsx(IconCertificate, { className: "text-yellow-600", size: 24 }) }),
        /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { children: [
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", size: "sm", children: "Pending" }),
          /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { fw: 700, size: "xl", children: pendingCertificates })
        ] })
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "200", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Card, { p: "lg", radius: "lg", withBorder: true, children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { justify: "space-between", children: [
      /* @__PURE__ */ jsxRuntimeExports.jsxs(Group, { children: [
        /* @__PURE__ */ jsxRuntimeExports.jsx(TextInput, { leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconSearch, { size: 16 }), onChange: (e) => setSearchQuery(e.target.value), placeholder: "Search certificates...", style: {
          minWidth: 300
        }, value: searchQuery }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
          label: "All Status",
          value: "all"
        }, {
          label: "Issued",
          value: "issued"
        }, {
          label: "Pending",
          value: "pending"
        }, {
          label: "Revoked",
          value: "revoked"
        }], leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconFilter, { size: 16 }), onChange: (value) => setStatusFilter(value || "all"), placeholder: "Status", value: statusFilter }),
        /* @__PURE__ */ jsxRuntimeExports.jsx(Select, { data: [{
          label: "All Courses",
          value: "all"
        }, ...(courses || []).map((course) => ({
          label: course.title || "Untitled Course",
          value: course.id
        }))], onChange: (value) => setCourseFilter(value || "all"), placeholder: "Course", value: courseFilter })
      ] }),
      /* @__PURE__ */ jsxRuntimeExports.jsx(Button, { color: "fun-green", leftSection: /* @__PURE__ */ jsxRuntimeExports.jsx(IconPlus, { size: 16 }), onClick: handleGenerateCertificate, children: "Generate Certificate" })
    ] }) }) }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("div", { "data-aos": "fade-up", "data-aos-delay": "300", children: /* @__PURE__ */ jsxRuntimeExports.jsxs(Card, { p: "lg", radius: "lg", withBorder: true, children: [
      /* @__PURE__ */ jsxRuntimeExports.jsx(DataTable, { columns: createCertificatesTableColumns({
        onDownload: handleDownloadCertificate,
        onGenerate: handleGenerateCertificate,
        onPreview: handlePreviewCertificate,
        onRevoke: handleRevokeCertificate
      }), data: filteredCertificates, enableFilters: true, enableSearch: true, enableSorting: true, pageSize: 10, searchPlaceholder: "Search certificates..." }),
      filteredCertificates.length === 0 && /* @__PURE__ */ jsxRuntimeExports.jsx("div", { className: "py-8 text-center", children: /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { c: "dimmed", children: "No certificates found matching your criteria" }) })
    ] }) })
  ] }) }) });
}
export {
  AdminCertificates as component
};
