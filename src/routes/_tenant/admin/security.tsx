import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_tenant/admin/security')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_tenant/admin/security"!</div>
}
