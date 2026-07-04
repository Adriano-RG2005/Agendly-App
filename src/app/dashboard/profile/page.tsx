import { createClient } from "@infrastructure/lib/supabase/server";
import { redirect } from "next/navigation";
import { businessRepository } from "@/core/container";
import BusinessProfileForm from "../components/BusinessProfileForm";

export default async function BusinessProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  // Obtener datos actuales del negocio si existen
  const business = await businessRepository.findByUserId(user.id);

  return (
    <div className="space-y-6 animate-fade-in max-w-2xl">
      <h1 className="text-2xl font-bold">Perfil del negocio</h1>

      <BusinessProfileForm
        userId={user.id}
        initialData={
          business
            ? {
                id: business.id,
                name: business.name,
                serviceName: business.serviceName,
                durationMin: business.durationMin,
                description: business.description,
                slug: business.slug,
              }
            : null
        }
      />
    </div>
  );
}
