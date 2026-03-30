import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_tenant/admin/profile')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_tenant/admin/profile"!</div>
}
