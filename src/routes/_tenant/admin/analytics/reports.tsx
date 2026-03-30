import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_tenant/admin/analytics/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_tenant/admin/analytics/reports"!</div>
}
