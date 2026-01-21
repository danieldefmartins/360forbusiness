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
  ArrowRight,
  CheckCircle2,
  MessageSquare,
  Phone,
  Calendar,
  FileText,
  Bot,
  Workflow,
  PieChart,
  Target,
} from "lucide-react";

const crmFeatures = [
  {
    id: "lead-capture",
    icon: Users,
    title: "Lead Capture",
    subtitle: "Capture Every Opportunity",
    description: "Turn visitors into leads with powerful capture tools that work 24/7.",
    features: [
      "Custom landing pages with drag-and-drop builder",
      "Smart forms with conditional logic",
      "Surveys and quizzes for lead qualification",
      "Calendar booking integration",
      "Inbound phone system with call tracking",
      "QR codes for offline-to-online conversion",
    ],
    color: "purple",
  },
  {
    id: "automation",
    icon: Zap,
    title: "Automated Follow-ups",
    subtitle: "Never Miss a Lead",
    description: "Intelligent automation that nurtures leads while you focus on closing deals.",
    features: [
      "Multi-channel sequences (email, SMS, voicemail)",
      "Trigger-based workflows",
      "AI-powered response suggestions",
      "Automatic lead scoring",
      "Personalized message templates",
      "Time-zone aware scheduling",
    ],
    color: "orange",
  },
  {
    id: "pipelines",
    icon: BarChart3,
    title: "Sales Pipelines",
    subtitle: "Visualize Your Success",
    description: "Track every deal from first contact to closed-won with intuitive pipelines.",
    features: [
      "Drag-and-drop deal management",
      "Multiple pipeline support",
      "Custom stages and fields",
      "Deal value tracking and forecasting",
      "Activity logging and notes",
      "Team collaboration tools",
    ],
    color: "purple",
  },
  {
    id: "website-builder",
    icon: Globe,
    title: "Website Builder",
    subtitle: "Build Without Limits",
    description: "Create stunning websites and funnels without writing a single line of code.",
    features: [
      "Drag-and-drop page builder",
      "Mobile-responsive templates",
      "Custom domains and SSL",
      "Built-in SEO optimization",
      "A/B testing capabilities",
      "Membership site functionality",
    ],
    color: "orange",
  },
  {
    id: "marketing",
    icon: Mail,
    title: "Email & SMS Marketing",
    subtitle: "Reach Your Audience",
    description: "Send targeted campaigns that convert with built-in marketing tools.",
    features: [
      "Visual email builder",
      "SMS and MMS campaigns",
      "Segmentation and targeting",
      "Campaign analytics and reporting",
      "Automated drip sequences",
      "Template library",
    ],
    color: "purple",
  },
  {
    id: "reputation",
    icon: Star,
    title: "Reputation Management",
    subtitle: "Build Trust & Credibility",
    description: "Collect, manage, and showcase reviews to attract more customers.",
    features: [
      "Automated review requests",
      "Multi-platform review monitoring",
      "Review response management",
      "Widget for website display",
      "Negative review alerts",
      "Review analytics dashboard",
    ],
    color: "orange",
  },
];

const additionalFeatures = [
  { icon: MessageSquare, title: "Unified Inbox", description: "All conversations in one place" },
  { icon: Phone, title: "Call Tracking", description: "Track and record all calls" },
  { icon: Calendar, title: "Appointment Scheduling", description: "Let clients book online" },
  { icon: FileText, title: "Proposals & Invoices", description: "Send and track documents" },
  { icon: Bot, title: "AI Assistant", description: "Automate with AI" },
  { icon: Workflow, title: "Workflow Automation", description: "Build custom workflows" },
  { icon: PieChart, title: "Analytics Dashboard", description: "Track all your metrics" },
  { icon: Target, title: "Goal Tracking", description: "Set and achieve targets" },
];

export default function CRM() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="hero-gradient text-white py-20 lg:py-28 relative overflow-hidden">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500/20 rounded-full blur-3xl" />
          </div>

          <div className="container relative z-10">
            <div className="max-w-4xl mx-auto text-center">
              <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium mb-6">
                All-in-One CRM Platform
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                One System to Run Your
                <br />
                <span className="text-orange-400">Entire Business</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
                Centralize sales, marketing, automation, and customer communication in one powerful platform built for growth.
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
                  <Link href="/pricing">View Pricing</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Core Features
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                Everything You Need to Grow
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Six powerful modules that work together seamlessly to help you capture, nurture, and convert more leads.
              </p>
            </div>

            <div className="space-y-24">
              {crmFeatures.map((feature, index) => (
                <div
                  key={feature.id}
                  id={feature.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                        feature.color === "purple"
                          ? "bg-purple-100"
                          : "bg-orange-100"
                      }`}
                    >
                      <feature.icon
                        className={`h-7 w-7 ${
                          feature.color === "purple"
                            ? "text-purple-600"
                            : "text-orange-600"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        feature.color === "purple"
                          ? "text-purple-600"
                          : "text-orange-600"
                      }`}
                    >
                      {feature.subtitle}
                    </span>
                    <h3 className="text-3xl font-bold mt-2 mb-4">{feature.title}</h3>
                    <p className="text-muted-foreground text-lg mb-6">
                      {feature.description}
                    </p>
                    <ul className="space-y-3">
                      {feature.features.map((item, i) => (
                        <li key={i} className="flex items-start gap-3">
                          <CheckCircle2
                            className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                              feature.color === "purple"
                                ? "text-purple-600"
                                : "text-orange-600"
                            }`}
                          />
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div
                      className={`aspect-video rounded-2xl ${
                        feature.color === "purple"
                          ? "bg-gradient-to-br from-purple-100 to-purple-200"
                          : "bg-gradient-to-br from-orange-100 to-orange-200"
                      } flex items-center justify-center`}
                    >
                      <feature.icon
                        className={`h-24 w-24 ${
                          feature.color === "purple"
                            ? "text-purple-400"
                            : "text-orange-400"
                        }`}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Additional Features Grid */}
        <section className="py-20 bg-purple-50">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                And Much More
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                Additional Features Included
              </h2>
              <div className="section-divider mx-auto mb-6" />
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {additionalFeatures.map((feature, index) => (
                <Card key={index} className="card-hover text-center">
                  <CardContent className="p-6">
                    <div className="w-12 h-12 rounded-lg bg-purple-100 flex items-center justify-center mx-auto mb-4">
                      <feature.icon className="h-6 w-6 text-purple-600" />
                    </div>
                    <h3 className="font-semibold mb-2">{feature.title}</h3>
                    <p className="text-sm text-muted-foreground">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Streamline Your Business?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Start your 14-day free trial today. No credit card required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6"
                asChild
              >
                <a href="https://app.360forbusiness.com" target="_blank" rel="noopener noreferrer">
                  Start Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <Link href="/pricing">View Pricing</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
