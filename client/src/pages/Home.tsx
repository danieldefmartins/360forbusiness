import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import {
  Users,
  Zap,
  BarChart3,
  Globe,
  Mail,
  Star,
  Palette,
  Code,
  Smartphone,
  Target,
  TrendingUp,
  Share2,
  CheckCircle2,
  ArrowRight,
  DollarSign,
  Clock,
  Shield,
} from "lucide-react";

// CRM Features
const crmFeatures = [
  {
    icon: Users,
    title: "Lead Capture",
    description: "Capture leads from landing pages, forms, surveys, and calendars—all in one place.",
  },
  {
    icon: Zap,
    title: "Automated Follow-ups",
    description: "Never miss a lead with intelligent automation via email, SMS, and voicemail drops.",
  },
  {
    icon: BarChart3,
    title: "Sales Pipelines",
    description: "Visualize your entire sales process and move deals forward with drag-and-drop pipelines.",
  },
  {
    icon: Globe,
    title: "Website Builder",
    description: "Create stunning websites and landing pages with our drag-and-drop builder.",
  },
  {
    icon: Mail,
    title: "Email & SMS Marketing",
    description: "Send targeted campaigns that convert with built-in email and SMS tools.",
  },
  {
    icon: Star,
    title: "Reputation Management",
    description: "Collect and manage reviews to build trust and attract more customers.",
  },
];

// Marketing Services
const marketingServices = [
  {
    icon: Palette,
    title: "Branding & Identity",
    description: "Logo design, brand guidelines, and visual identity that makes you stand out.",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "High-conversion websites and landing pages built for results.",
  },
  {
    icon: Smartphone,
    title: "App Development",
    description: "Custom mobile apps and business automation solutions.",
  },
  {
    icon: Target,
    title: "Digital Marketing",
    description: "Lead generation, funnels, and CRM-driven marketing workflows.",
  },
  {
    icon: TrendingUp,
    title: "Paid Advertising",
    description: "ROI-focused Google, Facebook, and Instagram ad campaigns.",
  },
  {
    icon: Share2,
    title: "Social Media Content",
    description: "Content strategy, reels, posts, and organic growth systems.",
  },
];

// Benefits
const benefits = [
  {
    icon: DollarSign,
    title: "Save Money",
    description: "Replace 10+ tools with one platform. Save thousands per year.",
  },
  {
    icon: Clock,
    title: "Save Time",
    description: "Automate repetitive tasks and focus on what matters most.",
  },
  {
    icon: Shield,
    title: "Scale Confidently",
    description: "Built for growth with enterprise-grade reliability.",
  },
];

export default function Home() {
  const [activeTab, setActiveTab] = useState<"crm" | "marketing">("crm");

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 lg:py-32 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your All-in-One
                <br />
                <span className="text-orange-400">Growth Engine</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
                Choose your path to success: a complete CRM to streamline operations or full-service marketing to accelerate growth.
              </p>

              {/* Toggle Button */}
              <div className="inline-flex items-center bg-purple-800/50 rounded-full p-1.5 mb-12">
                <button
                  onClick={() => setActiveTab("crm")}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    activeTab === "crm"
                      ? "bg-white text-purple-900 shadow-lg"
                      : "text-white hover:bg-purple-700/50"
                  }`}
                >
                  Complete CRM
                </button>
                <button
                  onClick={() => setActiveTab("marketing")}
                  className={`px-6 py-3 rounded-full text-sm font-semibold transition-all ${
                    activeTab === "marketing"
                      ? "bg-white text-purple-900 shadow-lg"
                      : "text-white hover:bg-purple-700/50"
                  }`}
                >
                  Complete Marketing
                </button>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6"
                  asChild
                >
                  <a href="https://app.360forbusiness.com" target="_blank" rel="noopener noreferrer">
                    Start 14-Day Free Trial
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </a>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  asChild
                >
                  <Link href={activeTab === "crm" ? "/crm" : "/marketing"}>
                    Learn More
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Dynamic Content Section */}
        <section className="py-20 bg-background">
          <div className="container">
            {activeTab === "crm" ? (
              <>
                <div className="text-center mb-16">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                    CRM Platform
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                    The Last CRM You'll Ever Need
                  </h2>
                  <div className="section-divider mx-auto mb-6" />
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    Our all-in-one platform centralizes sales, marketing, automation, and customer communication in one powerful system.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {crmFeatures.map((feature, index) => (
                    <Card key={index} className="card-hover border-border/50">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mb-4">
                          <feature.icon className="h-6 w-6 text-purple-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-muted-foreground">{feature.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Button size="lg" asChild>
                    <Link href="/crm">
                      Explore CRM Features
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </>
            ) : (
              <>
                <div className="text-center mb-16">
                  <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                    Marketing Services
                  </span>
                  <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                    Your Complete 360° Marketing Partner
                  </h2>
                  <div className="section-divider mx-auto mb-6" />
                  <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                    From idea to execution, we handle everything your business needs to grow—branding, web, digital marketing, and more.
                  </p>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {marketingServices.map((service, index) => (
                    <Card key={index} className="card-hover border-border/50">
                      <CardContent className="p-6">
                        <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center mb-4">
                          <service.icon className="h-6 w-6 text-orange-600" />
                        </div>
                        <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center mt-12">
                  <Button size="lg" asChild>
                    <Link href="/marketing">
                      Discover Our Services
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </>
            )}
          </div>
        </section>

        {/* Why 360 Section */}
        <section className="py-20 bg-purple-50">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Why Choose Us
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                One Platform. Unlimited Potential.
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Stop juggling multiple tools and subscriptions. Our unified platform gives you everything you need to capture, nurture, and convert leads.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {benefits.map((benefit, index) => (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-purple-600 flex items-center justify-center mx-auto mb-6">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold mb-3">{benefit.title}</h3>
                  <p className="text-muted-foreground">{benefit.description}</p>
                </div>
              ))}
            </div>

            {/* Cost Comparison Preview */}
            <div className="mt-16 bg-white rounded-2xl shadow-xl p-8 md:p-12">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-4">
                    How Much Could You Save?
                  </h3>
                  <p className="text-muted-foreground mb-6">
                    Most businesses pay for 5-10 different tools to manage their sales and marketing. With 360 For Business, you get everything in one platform starting at just $79/month.
                  </p>
                  <ul className="space-y-3 mb-6">
                    {[
                      "CRM & Contact Management",
                      "Email Marketing Platform",
                      "SMS Marketing Tool",
                      "Landing Page Builder",
                      "Appointment Scheduling",
                      "Reputation Management",
                    ].map((item, index) => (
                      <li key={index} className="flex items-center gap-3">
                        <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <Button size="lg" asChild>
                    <Link href="/pricing">
                      See Pricing
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
                <div className="bg-purple-100 rounded-xl p-8 text-center">
                  <p className="text-sm text-purple-600 font-semibold mb-2">
                    AVERAGE MONTHLY SAVINGS
                  </p>
                  <p className="text-5xl md:text-6xl font-bold text-purple-900 mb-2">
                    $500+
                  </p>
                  <p className="text-purple-600">
                    compared to using multiple tools
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Grow Your Business?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that trust 360 For Business to power their growth. Start your free trial today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6"
                asChild
              >
                <a href="https://app.360forbusiness.com" target="_blank" rel="noopener noreferrer">
                  Start 14-Day Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <Link href="/contact">
                  Contact Sales
                </Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
