'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Users,
  FileText,
  Landmark,
  ArrowRight,
  Download,
  FileSpreadsheet
} from "lucide-react";
import Link from "next/link";
import { useQuery } from '@tanstack/react-query';
import { JSX } from 'react';
import { AppButton } from '@/components';

interface StatItem {
  title: string;
  value: string;
  icon: JSX.Element;
  link: string;
}

interface IRecentActivity {
  id: string; 
  title: string;
}

async function fetchWaitlist() {
  const res = await fetch('/api/waitlist');
  if (!res.ok) throw new Error('Failed to fetch waitlist');
  return res.json();
}

async function fetchBrochureDownloads() {
  const res = await fetch('/api/brochure');
  if (!res.ok) throw new Error('Failed to fetch brochure downloads');
  return res.json();
}

// async function fetchInvestments() {
//   const res = await fetch('/api/investments');
//   if (!res.ok) throw new Error('Failed to fetch investments');
//   return res.json();
// }

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const recentActivities: IRecentActivity[] = [];

  const {
    data: waitlistData,
    isLoading: isLoadingWaitlist,
    error: waitlistError
  } = useQuery({
    queryKey: ['waitlist'],
    queryFn: fetchWaitlist,
    enabled: status === 'authenticated'
  });

  const {
    data: brochureData,
    isLoading: isLoadingBrochure,
    error: brochureError
  } = useQuery({
    queryKey: ['brochure'],
    queryFn: fetchBrochureDownloads,
    enabled: status === 'authenticated'
  });

  // const {
  //   data: investmentData,
  //   isLoading: isLoadingInvestments,
  //   error: investmentError
  // } = useQuery({
  //   queryKey: ['investments'],
  //   queryFn: fetchInvestments,
  //   enabled: status === 'authenticated'
  // });

  if (status === 'unauthenticated') {
    router.push('/login');
    return null;
  }

  console.log(session);

  // Loading state
  const isLoading = status === 'loading' || isLoadingWaitlist || isLoadingBrochure; // || isLoadingInvestments;

  // Error state
  const error = waitlistError || brochureError; // || investmentError;

  // Prepare stats data
  const stats: StatItem[] = [
    {
      title: "Waitlist Users",
      value: waitlistData?.length.toLocaleString() || '0',
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
      link: "/waitlist"
    },
    {
      title: "Brochure Downloads",
      value: brochureData?.length.toLocaleString() || '0',
      icon: <Download className="h-6 w-6 text-muted-foreground" />,
      link: "/brochure"
    },
    {
      title: "Investment Forms",
      value: '0',
      icon: <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />,
      link: "/investment-requests"
    }
  ];

  if (isLoading) {
    return (
      <section className="w-full h-full min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 text-center">
          Loading dashboard...
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="w-full h-full min-h-[80vh] flex items-center justify-center">
        <div className="container mx-auto px-4 py-8 text-center">
          <div className="text-red-500 mb-4">
            Error loading dashboard data: {error.message}
          </div>
          <AppButton variant='Secondary' extraClass='!rounded-lg !px-8 !py-2' onClick={() => window.location.reload()}>Retry</AppButton>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full h-full min-h-[80vh]">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8 text-body">Admin Dashboard</h1>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-8">
          {stats.map((stat, index) => (
            <Card key={index}>
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                {stat.icon}
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <Button asChild variant="ghost" className="mt-4 p-0 h-auto">
                  <Link href={stat.link} className="flex items-center text-sm">
                    View all <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity Section */}
        {/* <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[1, 2, 3].map((item) => (
                <div key={item} className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center space-x-4">
                    <Landmark className="h-5 w-5 text-primary" />
                    <div>
                      <p className="font-medium">New investment form submitted</p>
                      <p className="text-sm text-muted-foreground">2 hours ago</p>
                    </div>
                  </div>
                  <Button variant="outline" size="sm">
                    View
                  </Button>
                </div>
              ))}
            </div>
          </CardContent>
        </Card> */}

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center justify-between p-4 border rounded-lg">
                    <div className="flex items-center space-x-4">
                      <Landmark className="h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">{activity.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {/* {formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true })} */}
                        </p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm">
                      View
                    </Button>
                  </div>
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-8 space-y-4">
                <FileText className="h-10 w-10 text-muted-foreground" />
                <p className="text-lg font-medium text-muted-foreground">No recent activity</p>
                <p className="text-sm text-muted-foreground text-center">
                  When new activities occur, they&apos;ll appear here
                </p>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button asChild className='text-white'>
            <Link href="/waitlist" className="flex items-center gap-2">
              <Users className="h-4 w-4" /> Manage Waitlist
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/brochure" className="flex items-center gap-2">
              <FileText className="h-4 w-4" /> View Brochure Downloads
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/investments" className="flex items-center gap-2">
              <Landmark className="h-4 w-4" /> Review Investments
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}