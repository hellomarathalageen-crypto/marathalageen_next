import Link from "next/link";
import {
  CheckCircle2,
  Crown,
  Heart,
  Users,
  ChevronLeft,
  ChevronRight,
  Star,
} from "lucide-react";

const plans = [
  {
    name: "Free",
    icon: "👤",
    tagline: "Start your journey for free",
    price: "₹0",
    period: "Lifetime",
    features: [
      "Create Profile",
      "Browse Profiles",
      "Express Interest (Limited)",
      "Basic Filters",
      "Receive Interests (Limited)",
    ],
    cta: "Get Started",
    href: "/signup",
    style: "border-[#FADADF]",
    ctaStyle: "border border-[#FADADF] text-[#2A3773] hover:bg-[#FFF1F5]",
    checkColor: "text-gray-400",
    popular: false,
  },
  {
    name: "Premium",
    icon: "💎",
    tagline: "Connect with more, faster",
    price: "₹999",
    period: "3 Months",
    features: [
      "Everything in Free",
      "View Contact Details",
      "Send Direct Messages",
      "Advanced Search Filters",
      "See Who Viewed Your Profile",
      "Express Interest (Unlimited)",
      "Priority Customer Support",
    ],
    cta: "Choose Premium",
    href: "/payment?plan=premium",
    style: "border-[#2A3773] shadow-2xl shadow-[#2A3773]/15",
    ctaStyle: "bg-[#DB1866] text-white hover:bg-[#B81456] shadow-lg shadow-[#DB1866]/30",
    checkColor: "text-[#DB1866]",
    popular: true,
  },
  {
    name: "Premium Plus",
    icon: "👑",
    tagline: "Maximum visibility. Better match.",
    price: "₹1,999",
    period: "3 Months",
    features: [
      "Everything in Premium",
      "Profile Highlight",
      "Featured in Search Results",
      "Verified Profile Badge",
      "Personalised Match Suggestions",
      "Relationship Manager Support",
      "Early Access to New Features",
    ],
    cta: "Choose Premium Plus",
    href: "/payment?plan=premium-plus",
    style: "border-[#FADADF]",
    ctaStyle: "bg-[#2A3773] text-white hover:bg-[#2A3773]",
    checkColor: "text-[#2A3773]",
    popular: false,
  },
];

const successStories = [
  {
    id: 1,
    names: "Sneha & Pratik",
    city: "Pune, Maharashtra",
    quote: "Maratha Matrimony helped us find each other at the perfect time. We're forever grateful.",
    img: "https://images.unsplash.com/photo-1606216794074-735e91aa2c92?w=400&h=300&fit=crop",
  },
  {
    id: 2,
    names: "Rutuja & Abhishek",
    city: "Nagpur, Maharashtra",
    quote: "The trust, the matches, the support — everything felt so personal and meaningful.",
    img: "https://images.unsplash.com/photo-1519741497674-611481863552?w=400&h=300&fit=crop",
  },
  {
    id: 3,
    names: "Kiran & Manasi",
    city: "Kolhapur, Maharashtra",
    quote: "We found not just a life partner, but a best friend for life. Thank you Maratha Matrimony!",
    img: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?w=400&h=300&fit=crop",
  },
];

const faqs = [
  { q: "Can I upgrade my plan later?", a: "Yes, you can upgrade from Free to Premium or Premium Plus at any time. Your existing data and matches are retained." },
  { q: "Is the Free plan really free forever?", a: "Yes! The Free plan has no time limit. You can create a profile and browse without any payment." },
  { q: "What payment methods are accepted?", a: "We accept UPI, Credit/Debit cards, Net Banking, and popular wallets like Paytm and PhonePe." },
  { q: "Can I get a refund?", a: "We offer refunds within 7 days of purchase if you have not used any premium features. See our Refund Policy for details." },
  { q: "What is a Relationship Manager?", a: "Premium Plus members get a dedicated Relationship Manager who helps you find the best matches and guides you through the process." },
  { q: "Is my payment information secure?", a: "Yes, all payments are processed through certified payment gateways with 256-bit SSL encryption." },
];

export default function MembershipPage() {
  return (
    <div className="bg-[#FFF1F5] min-h-screen">
      {/* Hero */}
      <section className="bg-white py-16 border-b border-[#FADADF] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute right-0 top-0 w-96 h-96 opacity-[0.05]">
            <svg viewBox="0 0 400 400" fill="none"><path d="M200 0C200 0 300 150 400 200C300 250 200 400 200 400C200 400 100 250 0 200C100 150 200 0 200 0Z" fill="#DB1866" /></svg>
          </div>
          <div className="absolute left-0 bottom-0 w-64 h-64 opacity-[0.05]">
            <svg viewBox="0 0 300 300" fill="none"><path d="M150 0C150 0 250 100 300 150C250 200 150 300 150 300C150 300 50 200 0 150C50 100 150 0 150 0Z" fill="#2A3773" /></svg>
          </div>
        </div>
        <div className="container mx-auto max-w-4xl px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-6">
            <div className="h-px w-16 bg-[#DB1866]/40" />
            <Crown className="w-5 h-5 text-[#DB1866]" />
            <div className="h-px w-16 bg-[#DB1866]/40" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold font-sans text-[#2A3773] mb-4">Premium Memberships</h1>
          <p className="text-gray-500 text-base max-w-xl mx-auto leading-relaxed">
            Choose the plan that helps you connect with the one who completes your world.
          </p>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            {plans.map((plan) => (
              <div
                key={plan.name}
                className={`relative bg-white rounded-2xl border p-7 ${plan.style} ${plan.popular ? "scale-105 z-10" : ""} transition-all`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-0 right-0 flex justify-center">
                    <span className="bg-[#2A3773] text-white text-[11px] font-bold px-5 py-1.5 rounded-full uppercase tracking-widest flex items-center gap-1.5">
                      <Star className="w-3 h-3" fill="currentColor" /> Most Popular
                    </span>
                  </div>
                )}

                {/* Plan header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-12 h-12 rounded-xl bg-[#FFF1F5] flex items-center justify-center text-2xl">
                    {plan.icon}
                  </div>
                  <div>
                    <h3 className={`text-lg font-bold ${plan.popular ? "text-[#DB1866]" : "text-[#2A3773]"}`}>{plan.name}</h3>
                    <p className="text-xs text-gray-500">{plan.tagline}</p>
                  </div>
                </div>

                <div className="mb-6">
                  <span className="text-4xl font-black text-[#2A3773]">{plan.price}</span>
                  <span className="text-sm text-gray-400 ml-1">/ {plan.period}</span>
                </div>

                <ul className="space-y-3 mb-7">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-gray-600">
                      <CheckCircle2 className={`w-4 h-4 shrink-0 mt-0.5 ${plan.checkColor}`} />
                      {f}
                    </li>
                  ))}
                </ul>

                <Link
                  href={plan.href}
                  className={`block w-full text-center py-3.5 rounded-xl text-sm font-bold transition-all ${plan.ctaStyle}`}
                >
                  {plan.cta}
                </Link>
              </div>
            ))}
          </div>

          {/* Footnote */}
          <p className="text-center text-xs text-gray-400 mt-8 flex items-center justify-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-green-500" />
            All plans include a 7-day refund guarantee. No questions asked.
          </p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 bg-white" id="stories">
        <div className="container mx-auto max-w-6xl px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold font-sans text-[#2A3773] mb-2">Success Stories</h2>
            <div className="flex items-center justify-center gap-2 mb-3">
              <div className="h-px w-12 bg-[#DB1866]/40" />
              <Heart className="w-4 h-4 text-[#DB1866]" fill="currentColor" />
              <div className="h-px w-12 bg-[#DB1866]/40" />
            </div>
            <p className="text-gray-500 text-sm">Real people. Real stories. Real happiness.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
            {successStories.map((story) => (
              <div key={story.id} className="rounded-2xl overflow-hidden border border-[#FADADF] bg-[#FFF1F5] group hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4 p-5">
                  <img
                    src={story.img}
                    alt={story.names}
                    className="w-20 h-20 rounded-xl object-cover object-top shrink-0"
                  />
                  <div>
                    <p className="text-[#DB1866] text-3xl font-sans leading-none mb-1">"</p>
                    <p className="text-sm text-gray-600 italic leading-relaxed">{story.quote}</p>
                    <p className="mt-3 font-bold text-[#2A3773] text-sm">— {story.names}</p>
                    <p className="text-xs text-gray-400">{story.city}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quote banner */}
          <div className="text-center py-10 border-t border-[#FADADF]">
            <p className="text-xl md:text-2xl font-sans italic text-[#2A3773] mb-6">
              "Two hearts. One journey. A lifetime of togetherness."
            </p>
            <Link
              href="/success-stories#submit"
              className="inline-flex items-center gap-2 bg-[#DB1866] hover:bg-[#B81456] text-white font-bold px-7 py-3.5 rounded-xl shadow-lg shadow-[#DB1866]/30 transition-all hover:-translate-y-0.5"
            >
              <Users className="w-5 h-5" /> Share Your Success Story
            </Link>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-16 bg-[#FFF1F5]">
        <div className="container mx-auto max-w-3xl px-4">
          <h2 className="text-2xl font-bold font-sans text-[#2A3773] mb-8 text-center">Frequently Asked Questions</h2>
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <div key={i} className="bg-white rounded-xl border border-[#FADADF] p-5">
                <p className="font-semibold text-[#2A3773] mb-2">{faq.q}</p>
                <p className="text-sm text-gray-500 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
