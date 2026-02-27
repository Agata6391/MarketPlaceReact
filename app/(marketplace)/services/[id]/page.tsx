import { notFound } from "next/navigation";
import { connectDB } from "@/lib/db";
import { ServiceModel } from "@/models/Service";
import { ReviewModel } from "@/models/Review";
import { Navbar } from "@/components/layout/Navbar";
import { ServiceDetailClient } from "@/components/marketplace/ServiceDetailClient";
import "@/styles/components/button.css";

interface PageProps {
  params: { id: string };
}

export default async function ServiceDetailPage({ params }: PageProps) {
  await connectDB();

  const service = await ServiceModel.findById(params.id)
    .populate("vendor", "name avatar createdAt")
    .lean();

  if (!service || !(service as any).isActive) notFound();

  const reviews = await ReviewModel.find({ service: params.id })
    .populate("reviewer", "name avatar")
    .sort({ createdAt: -1 })
    .lean();

  const serialized = JSON.parse(JSON.stringify({ service, reviews }));

  return (
    <>
      <Navbar />
      <ServiceDetailClient {...serialized} />
    </>
  );
}
