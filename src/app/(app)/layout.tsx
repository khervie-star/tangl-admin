import { DashboardLaoyout } from '@/components'
import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
    return (
        <DashboardLaoyout>
            {children}
        </DashboardLaoyout>)
}
