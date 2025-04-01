"use client"

import { IBrochureDownload, IWaitlistUser } from '@/types';
import React, { useEffect, useState } from 'react'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Download, Upload } from "lucide-react"
import { toast } from 'sonner';
import { BrochureTable } from '@/components';

const BrochurePage = () => {
    const [data, setData] = useState<IBrochureDownload[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const fetchUsers = async () => {
        try {
            setIsLoading(true)
            setError(null)

            const response = await fetch('/api/brochure')

            if (!response.ok) {
                throw new Error(`Failed to fetch brochure downloads list: ${response.status} ${response.statusText}`)
            }

            const data = await response.json()
            setData(data)

        } catch (err) {
            console.error('Error fetching data:', err)
            setError(err instanceof Error ? err.message : 'Failed to load waitbrochure downloads list')
            toast.error("There was a problem fetching the data. Please try again.")

        } finally {
            setIsLoading(false)
        }
    }

    console.log(error);

    // Load data on initial mount
    useEffect(() => {
        fetchUsers()
    }, [])

    // Handle manual refresh
    // const handleRefresh = () => {
    //     fetchUsers()
    // }

    // Handle export
    const handleExport = () => {
        if (data.length === 0) {
            toast.error("There are no users to export.")
            return
        }
        toast("Preparing CSV export of waitlist users")
    }


    return (

        <div className="container mx-auto py-10 space-y-6">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Brochure Downloads</h1>
                    <p className="text-muted-foreground">Manage and see users that have downloaded the brochure</p>
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
                    <CardTitle>Brochure Downloads</CardTitle>
                    <CardDescription>
                        Manage and see users that have downloaded the brochure
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <BrochureTable data={data} isLoading={isLoading} />
                </CardContent>
            </Card>


        </div>
    )
}

export default BrochurePage