import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from "next/navigation";
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

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }

  const stats = [
    {
      title: "Waitlist Users",
      value: "1,234",
      icon: <Users className="h-6 w-6 text-muted-foreground" />,
      link: "/waitlist"
    },
    {
      title: "Brochure Downloads",
      value: "856",
      icon: <Download className="h-6 w-6 text-muted-foreground" />,
      link: "/brochure"
    },
    {
      title: "Investment Forms",
      value: "342",
      icon: <FileSpreadsheet className="h-6 w-6 text-muted-foreground" />,
      link: "/investments"
    }
  ];


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
        <Card className="mb-8">
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
        </Card>

        {/* Quick Actions */}
        <div className="flex flex-wrap gap-4">
          <Button asChild>
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
