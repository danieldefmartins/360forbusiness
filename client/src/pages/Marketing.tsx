import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import {
  Palette,
  Code,
  Smartphone,
  Target,
  TrendingUp,
  Share2,
  ArrowRight,
  CheckCircle2,
  Sparkles,
  FileText,
  Layers,
  PenTool,
  Globe,
  Zap,
  BarChart3,
  Mail,
  MessageSquare,
  Search,
  DollarSign,
  Users,
  Video,
  Camera,
  Calendar,
} from "lucide-react";

const marketingServices = [
  {
    id: "branding",
    icon: Palette,
    title: "Branding & Identity",
    subtitle: "Stand Out From The Crowd",
    description: "Create a memorable brand that resonates with your audience and sets you apart from competitors.",
    services: [
      { icon: PenTool, name: "Logo Design", desc: "Custom logos that capture your brand essence" },
      { icon: Layers, name: "Brand Guidelines", desc: "Complete visual identity systems" },
      { icon: FileText, name: "Print Materials", desc: "Business cards, flyers, brochures" },
      { icon: Sparkles, name: "Brand Positioning", desc: "Strategic messaging that connects" },
    ],
    color: "purple",
  },
  {
    id: "web-dev",
    icon: Code,
    title: "Web Development",
    subtitle: "Convert Visitors Into Customers",
    description: "High-performance websites built for conversions, optimized for search engines, and designed to impress.",
    services: [
      { icon: Globe, name: "Business Websites", desc: "Professional sites that build trust" },
      { icon: Target, name: "Landing Pages", desc: "High-converting lead capture pages" },
      { icon: Search, name: "SEO Optimization", desc: "Rank higher in search results" },
      { icon: Smartphone, name: "Mobile-First Design", desc: "Perfect on every device" },
    ],
    color: "orange",
  },
  {
    id: "app-dev",
    icon: Smartphone,
    title: "App Development",
    subtitle: "Extend Your Digital Reach",
    description: "Custom mobile applications that engage customers and streamline your business operations.",
    services: [
      { icon: Smartphone, name: "iOS & Android Apps", desc: "Native mobile experiences" },
      { icon: Users, name: "Customer Apps", desc: "Engage your audience on-the-go" },
      { icon: Zap, name: "Automation Solutions", desc: "Streamline business processes" },
      { icon: Layers, name: "Custom Integrations", desc: "Connect all your systems" },
    ],
    color: "purple",
  },
  {
    id: "digital",
    icon: Target,
    title: "Digital Marketing",
    subtitle: "Generate Leads On Autopilot",
    description: "Data-driven marketing strategies that attract qualified leads and nurture them through your sales funnel.",
    services: [
      { icon: Users, name: "Lead Generation", desc: "Attract your ideal customers" },
      { icon: Zap, name: "Marketing Funnels", desc: "Automated conversion systems" },
      { icon: Mail, name: "Email Marketing", desc: "Nurture leads with targeted campaigns" },
      { icon: MessageSquare, name: "SMS Marketing", desc: "Direct mobile engagement" },
    ],
    color: "orange",
  },
  {
    id: "paid-ads",
    icon: TrendingUp,
    title: "Paid Advertising",
    subtitle: "Maximize Your ROI",
    description: "Strategic ad campaigns across Google, Facebook, and Instagram that deliver measurable results.",
    services: [
      { icon: Search, name: "Google Ads", desc: "Capture high-intent searchers" },
      { icon: Share2, name: "Facebook & Instagram Ads", desc: "Reach your target audience" },
      { icon: BarChart3, name: "Campaign Optimization", desc: "Continuous improvement" },
      { icon: DollarSign, name: "ROI Tracking", desc: "Know exactly what's working" },
    ],
    color: "purple",
  },
  {
    id: "social",
    icon: Share2,
    title: "Social Media Content",
    subtitle: "Build Your Brand Authority",
    description: "Engaging content that grows your following, builds trust, and positions you as an industry leader.",
    services: [
      { icon: Calendar, name: "Content Strategy", desc: "Planned, purposeful posting" },
      { icon: Video, name: "Reels & Short-Form Video", desc: "Capture attention fast" },
      { icon: Camera, name: "Visual Content", desc: "Scroll-stopping graphics" },
      { icon: TrendingUp, name: "Organic Growth", desc: "Build a loyal following" },
    ],
    color: "orange",
  },
];

const processSteps = [
  {
    number: "01",
    title: "Discovery",
    description: "We dive deep into your business, goals, and target audience to understand exactly what you need.",
  },
  {
    number: "02",
    title: "Strategy",
    description: "Our team creates a customized marketing plan designed to achieve your specific objectives.",
  },
  {
    number: "03",
    title: "Execution",
    description: "We implement your strategy with precision, continuously optimizing for maximum results.",
  },
];

const stats = [
  { value: "500+", label: "Clients Served" },
  { value: "95%", label: "Client Retention" },
  { value: "10M+", label: "Leads Generated" },
  { value: "24/7", label: "Support Available" },
];

export default function Marketing() {
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
                Full-Service Marketing Agency
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Your Complete
                <br />
                <span className="text-orange-400">360° Marketing Partner</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-10 max-w-2xl mx-auto">
                From idea to execution, we handle everything your business needs to grow—branding, web, digital marketing, and more.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6"
                  asChild
                >
                  <Link href="/contact">
                    Get a Free Consultation
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                  asChild
                >
                  <a href="#services">Explore Services</a>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-12 bg-white border-b border-border">
          <div className="container">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <p className="text-3xl md:text-4xl font-bold text-purple-600 mb-1">
                    {stat.value}
                  </p>
                  <p className="text-muted-foreground">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 bg-background" id="services">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Services
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                Everything You Need to Grow
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                We offer comprehensive marketing solutions tailored to your business needs. From brand creation to lead generation, we've got you covered.
              </p>
            </div>

            <div className="space-y-24">
              {marketingServices.map((service, index) => (
                <div
                  key={service.id}
                  id={service.id}
                  className={`grid lg:grid-cols-2 gap-12 items-center ${
                    index % 2 === 1 ? "lg:flex-row-reverse" : ""
                  }`}
                >
                  <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                    <div
                      className={`w-14 h-14 rounded-xl flex items-center justify-center mb-6 ${
                        service.color === "purple"
                          ? "bg-purple-100"
                          : "bg-orange-100"
                      }`}
                    >
                      <service.icon
                        className={`h-7 w-7 ${
                          service.color === "purple"
                            ? "text-purple-600"
                            : "text-orange-600"
                        }`}
                      />
                    </div>
                    <span
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        service.color === "purple"
                          ? "text-purple-600"
                          : "text-orange-600"
                      }`}
                    >
                      {service.subtitle}
                    </span>
                    <h3 className="text-3xl font-bold mt-2 mb-4">{service.title}</h3>
                    <p className="text-muted-foreground text-lg mb-8">
                      {service.description}
                    </p>
                    <div className="grid sm:grid-cols-2 gap-4">
                      {service.services.map((item, i) => (
                        <div
                          key={i}
                          className="flex items-start gap-3 p-4 rounded-lg bg-muted/50"
                        >
                          <div
                            className={`w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0 ${
                              service.color === "purple"
                                ? "bg-purple-100"
                                : "bg-orange-100"
                            }`}
                          >
                            <item.icon
                              className={`h-5 w-5 ${
                                service.color === "purple"
                                  ? "text-purple-600"
                                  : "text-orange-600"
                              }`}
                            />
                          </div>
                          <div>
                            <h4 className="font-semibold mb-1">{item.name}</h4>
                            <p className="text-sm text-muted-foreground">{item.desc}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className={index % 2 === 1 ? "lg:order-1" : ""}>
                    <div
                      className={`aspect-square rounded-2xl ${
                        service.color === "purple"
                          ? "bg-gradient-to-br from-purple-100 to-purple-200"
                          : "bg-gradient-to-br from-orange-100 to-orange-200"
                      } flex items-center justify-center`}
                    >
                      <service.icon
                        className={`h-32 w-32 ${
                          service.color === "purple"
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

        {/* Process Section */}
        <section className="py-20 bg-purple-50">
          <div className="container">
            <div className="text-center mb-16">
              <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                Our Process
              </span>
              <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-4">
                How We Work With You
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                A proven three-step process that delivers results for every client.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {processSteps.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="h-full card-hover">
                    <CardContent className="p-8 text-center">
                      <div className="text-6xl font-bold text-purple-200 mb-4">
                        {step.number}
                      </div>
                      <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                      <p className="text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                  {index < processSteps.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2">
                      <ArrowRight className="h-8 w-8 text-purple-300" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="text-primary font-semibold text-sm uppercase tracking-wider">
                  Why Choose Us
                </span>
                <h2 className="text-3xl md:text-4xl font-bold mt-3 mb-6">
                  A True 360° Marketing Partner
                </h2>
                <p className="text-muted-foreground text-lg mb-8">
                  We're not just another marketing agency. We're your dedicated growth partner, committed to understanding your business and delivering results that matter.
                </p>
                <ul className="space-y-4">
                  {[
                    "Dedicated team assigned to your account",
                    "Transparent reporting and communication",
                    "Data-driven strategies that deliver ROI",
                    "Integrated approach across all channels",
                    "Scalable solutions that grow with you",
                    "No long-term contracts required",
                  ].map((item, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-8">
                  <Button size="lg" asChild>
                    <Link href="/contact">
                      Schedule a Consultation
                      <ArrowRight className="ml-2 h-5 w-5" />
                    </Link>
                  </Button>
                </div>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-purple-200 rounded-2xl aspect-square flex items-center justify-center">
                <div className="text-center p-8">
                  <Sparkles className="h-24 w-24 text-purple-400 mx-auto mb-6" />
                  <p className="text-2xl font-bold text-purple-900">
                    Your Success Is Our Mission
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
              Let's discuss how our marketing services can help you reach your goals. Schedule a free consultation today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white text-lg px-8 py-6"
                asChild
              >
                <Link href="/contact">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white/10 text-lg px-8 py-6"
                asChild
              >
                <a href="tel:561-559-5556">Call 561-559-5556</a>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
