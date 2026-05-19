import React from "react";
import { appPlans } from "../assets/assets";
import Footer from "../components/Footer";
import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";
import api from "@/configs/axios";

interface Plan {
  id: string;
  name: string;
  price: string;
  credits: number;
  description: string;
  features: string[];
}

const Pricing = () => {
  const { data: session } = authClient.useSession();
  const [plans] = React.useState<Plan[]>(appPlans);

  const handlePurchase = async (planId: string) => {
    try {
      if (!session?.user) return toast("Please login to purchase credits");
      const { data } = await api.post("/api/user/purchase-credits", { planId });
      window.location.href = data.payment_link;
    } catch (error: any) {
      toast.error(error?.response?.data?.message || error.message);
      console.log(error);
    }
  };

  return (
    <section className="min-h-screen text-white bg-gray-900 bg-[radial-gradient(60%_60%_at_50%_0%,#0f172a_0%,#111827_35%,#0b1020_100%)]">
      <main className="w-full max-w-5xl mx-auto z-20 max-md:px-4 min-h-[80vh] py-10">
        <div className="text-center mt-8">
          <h2 className="text-3xl font-semibold tracking-tight text-gray-100">
            Choose Your Plan
          </h2>
          <p className="text-sm max-w-md mx-auto mt-2 text-gray-400">
            Start for free and scale up as you grow. Find the perfect plan for
            your content creation needs.
          </p>
        </div>
        <div className="pt-12 py-4 px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 flex-wrap gap-4">
            {plans.map((plan, idx) => (
              <div
                key={idx}
                className="p-6 bg-gray-900/60 border border-gray-700 mx-auto w-full max-w-sm rounded-lg text-white shadow-md hover:border-indigo-800/80 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold">{plan.name}</h3>
                <div className="my-2">
                  <span className="text-4xl font-bold">{plan.price}</span>
                  <span className="text-gray-300">
                    {" "}
                    / {plan.credits} credits
                  </span>
                </div>

                <p className="text-gray-300 mb-6">{plan.description}</p>

                <ul className="space-y-1.5 mb-6 text-sm">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center">
                      <svg
                        className="h-5 w-5 text-blue-300 mr-2"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 13l4 4L19 7"
                        />
                      </svg>
                      <span className="text-gray-400">{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => handlePurchase(plan.id)}
                  className="w-full py-2 px-4 bg-blue-400 text-emerald-950 hover:-translate-y-0.5 hover:bg-blue-300 active:scale-95 text-sm rounded-md transition-all shadow-lg shadow-black/30"
                >
                  Buy Now
                </button>
              </div>
            ))}
          </div>
        </div>
        <p className="mx-auto text-center text-sm max-w-md mt-10 text-white/60 font-light">
          Project <span className="text-white">Creation / Revision</span>{" "}
          consume <span className="text-white">5 credits</span>. You can
          purchase more credits to create more projects.
        </p>
      </main>
      <Footer />
    </section>
  );
};

export default Pricing;
