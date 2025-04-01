import Image from "next/image";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { redirect } from "next/navigation";

export default async function Home() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/login');
  }


  return (
    <section className="w-full h-full min-h-[80vh] flex items-center justify-center">
      <p className="text-body text-2xl font-bold my-auto">In progress</p>
    </section>
  );
}
