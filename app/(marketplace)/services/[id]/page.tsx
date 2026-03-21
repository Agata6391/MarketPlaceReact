// app/(marketplace)/services/[id]/page.tsx
import { notFound } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { ReviewModel } from "@/models/Review";
import { FavoriteModel } from "@/models/Favorite";
import { Navbar } from "@/components/layout/Navbar";
import { ServiceDetailClient } from "@/components/marketplace/ServiceDetailClient";
import "@/styles/services/services.css";
import "@/styles/components/button.css";

interface PageProps {
  params: { id: string };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  const session = await getServerSession(authOptions);
  const user    = session?.user as any;

  await connectDB();

  // Busca por _id o slug
  const service = await ServiceModel.findOne({
    $or: [{ _id: params.id.length === 24 ? params.id : null }, { slug: params.id }],
    isActive: true,
  })
    .populate("vendor", "name avatar createdAt")
    .lean();

  if (!service) notFound();

  const svc = service as any;

  const reviews = await ReviewModel.find({ service: svc._id })
    .populate("reviewer", "name avatar")
    .sort({ createdAt: -1 })
    .lean();

  // Verificar si el usuario tiene este servicio en favoritos
  let isFaved = false;
  if (user?.id) {
    const fav = await FavoriteModel.findOne({ user: user.id, service: svc._id });
    isFaved = !!fav;
  }

  const serialized = JSON.parse(JSON.stringify({
    service: svc,
    reviews,
    isFaved,
    userId: user?.id ?? null,
    userRole: user?.role ?? null,
  }));

  return (
    <>
      <Navbar />
      <ServiceDetailClient {...serialized} />
    </>
  );
}
