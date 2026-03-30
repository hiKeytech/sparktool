import { createFileRoute } from '@tanstack/react-router'

import { CreateUser } from '@/pages/admin/create-user'

export const Route = createFileRoute('/_tenant/admin/users/new')({
  component: CreateUser,
})
