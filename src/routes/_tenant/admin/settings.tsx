import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_tenant/admin/settings')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_tenant/admin/settings"!</div>
}
