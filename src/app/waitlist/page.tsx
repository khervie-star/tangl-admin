"use client"

import { IWaitlistUser } from '@/types';
import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {  Download, Upload } from "lucide-react"
import { UsersDataTable } from '@/components';
import { toast } from 'sonner';

const WaitlistPage = () => {
    const [users, setUsers] = useState<IWaitlistUser[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch('/api/waitlist')

            if (!response.ok) {
                throw new Error(`Failed to fetch waitlist: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            setUsers(data)

        } catch (err) {
            console.error('Error fetching waitlist users:', err)
            setError(err instanceof Error ? err.message : 'Failed to load waitlist users')
            toast.error("There was a problem fetching the waitlist data. Please try again.")

        } finally {
            setIsLoading(false)
        }
    }

    // Load data on initial mount
    useEffect(() => {
        fetchUsers()
    }, [])

    // Handle manual refresh
    const handleRefresh = () => {
        fetchUsers()
    }

    // Handle export
    const handleExport = () => {
        if (users.length === 0) {
            toast.error("There are no users to export.")
            return
        }
        toast("Preparing CSV export of waitlist users")
    }


    return (

        <div className="container mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Waitlist users</h1>
                    <p className="text-muted-foreground">Manage your users and their accounts</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" className="flex items-center gap-1">
                        <Upload className="h-4 w-4" />
                        Import
                    </Button>
                    <Button variant="outline" className="flex items-center gap-1" onClick={handleExport}>
                        <Download className="h-4 w-4" />
                        Export
                    </Button>

                </div>
            </div>


            <Card>
                <CardHeader className="pb-2">
                    <CardTitle>All Users</CardTitle>
                    <CardDescription>
                        View and manage all registered users in your waitlist
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <UsersDataTable data={users} isLoading={isLoading} />
                </CardContent>
            </Card>


        </div>
    )
}

export default WaitlistPage