import { createClient } from "@infrastructure/lib/supabase/server";
import { redirect } from "next/navigation";
import { businessRepository, availabilityRepository } from "@/core/container";
import AvailabilityForm from "../components/AvailabilityForm";
import NoBusinessView from "@/components/NoBusinessView";

export default async function AvailabilityPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  const business = await businessRepository.findByUserId(user.id);

  if (!business) {
    return <NoBusinessView userName={user.user_metadata?.name || user.email?.split("@")[0] || "Usuario"} />;
  }

  const availability = await availabilityRepository.findByBusiness(business.id);

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold">Disponibilidad</h1>
      
      <AvailabilityForm 
        userId={user.id} 
        businessId={business.id} 
        initialData={availability} 
      />
    </div>
  );
}
