import { Button, Container, Group, Paper, Select, Stack, Text, Title } from "@mantine/core";
import { DatePickerInput } from "@mantine/dates";
import { IconDownload, IconFileAnalytics } from "@tabler/icons-react";
import { useState } from "react";

export function GenerateReport() {
  const [reportType, setReportType] = useState<string | null>("student-progress");
  const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([null, null]);

  const handleGenerate = () => {
    // Mock generation
    console.log("Generating report:", reportType, dateRange);
  };

  return (
    <Container size="lg" py="xl">
      <Stack gap="xl">
        <div>
          <Title order={2}>Analytics Reports</Title>
          <Text c="dimmed">Generate and download detailed system reports</Text>
        </div>

        <Paper p="xl" radius="md" withBorder>
            <Stack gap="lg">
                <Group justify="space-between">
                    <Group gap="sm">
                        <IconFileAnalytics size={24} className="text-blue-600" />
                        <Title order={4}>Generate New Report</Title>
                    </Group>
                </Group>

                <Group grow>
                     <Select
                        label="Report Type"
                        placeholder="Select report type"
                        data={[
                            { value: 'student-progress', label: 'Student Progress Report' },
                            { value: 'course-engagement', label: 'Course Engagement Stats' },
                            { value: 'financial-summary', label: 'Financial Summary' },
                            { value: 'system-usage', label: 'System Usage Logs' },
                        ]}
                        value={reportType}
                        onChange={setReportType}
                    />
                    <DatePickerInput
                        type="range"
                        label="Date Range"
                        placeholder="Pick dates range"
                        value={dateRange}
                        onChange={(value) => setDateRange(value as [Date | null, Date | null])}
                    />
                </Group>

                <Group justify="flex-end">
                    <Button
                        leftSection={<IconDownload size={16} />}
                        onClick={handleGenerate}
                        disabled={!reportType}
                    >
                        Generate & Download
                    </Button>
                </Group>
            </Stack>
        </Paper>

        <Paper p="md" radius="md" withBorder>
            <Title order={5} mb="md">Recent Reports</Title>
            <Text c="dimmed" size="sm" ta="center" py="xl">No recent reports generated.</Text>
        </Paper>
      </Stack>
    </Container>
  );
}
