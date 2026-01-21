import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Link } from "wouter";
import {
  Check,
  X,
  ArrowRight,
  Sparkles,
  Calculator,
  HelpCircle,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const plans = [
  {
    name: "Starter CRM",
    price: 79,
    description: "Get started with our affordable Starter Plan for essential features and seamless functionality.",
    badge: null,
    badgeColor: "bg-orange-500",
    cardStyle: "bg-white border-2 border-border",
    features: [
      { text: "All The Tools To Capture More Leads", included: true },
      { text: "Nurture & Close Leads Into Customers", included: true },
      { text: "Full Online Booking, Pipelines, Social Calendar, Website Builder, And More!", included: true },
      { text: "Unlimited Contacts & Users", included: true },
      { text: "Setup Up to Three Sub-Accounts", included: true },
      { text: "Email & SMS Marketing", included: true },
      { text: "Reputation Management", included: true },
      { text: "API Access", included: false },
      { text: "Unlimited Sub-Accounts", included: false },
      { text: "Branded Desktop App", included: false },
    ],
    cta: "Start A 14 Day Free Trial",
    ctaStyle: "bg-orange-500 hover:bg-orange-600 text-white",
  },
  {
    name: "Pro CRM",
    price: 149,
    description: "Boundless Features, Limitless Potential. Choose Our Pro Plan For Unlimited Possibilities.",
    badge: "MOST POPULAR",
    badgeColor: "bg-green-500",
    cardStyle: "bg-purple-900 text-white border-2 border-purple-700",
    features: [
      { text: "Everything In Starter", included: true, highlight: true },
      { text: "API Access – Integrate With Anything", included: true },
      { text: "Unlimited Sub-Accounts as Many Client Accounts as You Need for One Price!", included: true },
      { text: "Branded Desktop App – Custom Domains And Complete Control Over The Look And Feel Of The Platform!", included: true },
      { text: "Priority Support", included: true },
      { text: "Advanced Reporting & Analytics", included: true },
      { text: "White Label Options", included: true },
      { text: "Custom Integrations", included: true },
      { text: "Dedicated Account Manager", included: true },
      { text: "SLA Guarantee", included: true },
    ],
    cta: "Start A 14 Day Free Trial",
    ctaStyle: "bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white",
  },
];

const comparisonFeatures = [
  { category: "Lead Capture", features: [
    { name: "Landing Pages", starter: true, pro: true },
    { name: "Forms & Surveys", starter: true, pro: true },
    { name: "Calendar Booking", starter: true, pro: true },
    { name: "Call Tracking", starter: true, pro: true },
  ]},
  { category: "Automation", features: [
    { name: "Email Sequences", starter: true, pro: true },
    { name: "SMS Sequences", starter: true, pro: true },
    { name: "Workflow Builder", starter: true, pro: true },
    { name: "AI Automation", starter: "Limited", pro: true },
  ]},
  { category: "Sales Tools", features: [
    { name: "Pipeline Management", starter: true, pro: true },
    { name: "Proposals & Invoices", starter: true, pro: true },
    { name: "Payment Processing", starter: true, pro: true },
    { name: "Advanced Reporting", starter: false, pro: true },
  ]},
  { category: "Marketing", features: [
    { name: "Email Marketing", starter: true, pro: true },
    { name: "SMS Marketing", starter: true, pro: true },
    { name: "Social Media Scheduler", starter: true, pro: true },
    { name: "Reputation Management", starter: true, pro: true },
  ]},
  { category: "Platform", features: [
    { name: "Sub-Accounts", starter: "Up to 3", pro: "Unlimited" },
    { name: "API Access", starter: false, pro: true },
    { name: "White Label", starter: false, pro: true },
    { name: "Custom Domains", starter: true, pro: true },
  ]},
  { category: "Support", features: [
    { name: "Email Support", starter: true, pro: true },
    { name: "Chat Support", starter: true, pro: true },
    { name: "Priority Support", starter: false, pro: true },
    { name: "Dedicated Account Manager", starter: false, pro: true },
  ]},
];

const toolSavings = [
  { name: "CRM Software", cost: 99, tooltip: "Typical CRM like HubSpot or Salesforce" },
  { name: "Email Marketing", cost: 49, tooltip: "Email platforms like Mailchimp" },
  { name: "SMS Marketing", cost: 29, tooltip: "SMS tools like Twilio" },
  { name: "Landing Page Builder", cost: 79, tooltip: "Tools like Unbounce or Leadpages" },
  { name: "Appointment Scheduling", cost: 15, tooltip: "Calendly or similar" },
  { name: "Reputation Management", cost: 99, tooltip: "Review management tools" },
  { name: "Website Builder", cost: 29, tooltip: "Wix, Squarespace, etc." },
  { name: "Funnel Builder", cost: 97, tooltip: "ClickFunnels or similar" },
];

export default function Pricing() {
  const [selectedTools, setSelectedTools] = useState<string[]>(
    toolSavings.map(t => t.name)
  );

  const totalToolsCost = toolSavings
    .filter(t => selectedTools.includes(t.name))
    .reduce((sum, t) => sum + t.cost, 0);

  const savings = totalToolsCost - 79;

  const toggleTool = (toolName: string) => {
    setSelectedTools(prev =>
      prev.includes(toolName)
        ? prev.filter(t => t !== toolName)
        : [...prev, toolName]
    );
  };

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
                Simple, Transparent Pricing
              </span>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                One Platform.
                <br />
                <span className="text-orange-400">Two Perfect Plans.</span>
              </h1>
              <p className="text-xl md:text-2xl text-purple-100 mb-6 max-w-2xl mx-auto">
                Choose the plan that fits your business. No hidden fees. Cancel anytime.
              </p>
            </div>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="py-20 bg-background -mt-10">
          <div className="container">
            <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
              {plans.map((plan, index) => (
                <Card
                  key={index}
                  className={`relative overflow-hidden ${plan.cardStyle}`}
                >
                  {plan.badge && (
                    <div className={`absolute top-4 right-4 ${plan.badgeColor} text-white text-xs font-bold px-3 py-1 rounded-full`}>
                      {plan.badge}
                    </div>
                  )}
                  <CardHeader className="pb-4">
                    <div className={`inline-block px-4 py-1.5 rounded-full text-sm font-semibold mb-4 ${
                      index === 0 ? "bg-orange-500 text-white" : "bg-green-500 text-white"
                    }`}>
                      {plan.name.toUpperCase().replace(" CRM", "")}
                    </div>
                    <div className="flex items-baseline gap-1">
                      <span className="text-5xl font-bold">${plan.price}</span>
                      <span className={`text-lg ${index === 1 ? "text-purple-200" : "text-muted-foreground"}`}>/mo</span>
                    </div>
                    <p className={`mt-4 ${index === 1 ? "text-purple-200" : "text-muted-foreground"}`}>
                      {plan.description}
                    </p>
                  </CardHeader>
                  <CardContent className="pt-0">
                    <div className={`border-t ${index === 1 ? "border-purple-700" : "border-border"} my-6`} />
                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, i) => (
                        <li key={i} className="flex items-start gap-3">
                          {feature.included ? (
                            <Check className={`h-5 w-5 mt-0.5 flex-shrink-0 ${
                              index === 1 ? "text-green-400" : "text-orange-500"
                            }`} />
                          ) : (
                            <X className="h-5 w-5 mt-0.5 flex-shrink-0 text-gray-400" />
                          )}
                          <span className={`${
                            !feature.included ? "text-gray-400" : ""
                          } ${(feature as any).highlight ? "font-semibold" : ""}`}>
                            {feature.text}
                          </span>
                        </li>
                      ))}
                    </ul>
                    <Button
                      size="lg"
                      className={`w-full text-lg py-6 ${plan.ctaStyle}`}
                      asChild
                    >
                      <a href="https://app.360forbusiness.com" target="_blank" rel="noopener noreferrer">
                        {plan.cta}
                      </a>
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Cost Savings Calculator */}
        <section className="py-20 bg-purple-50" id="calculator">
          <div className="container">
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-100 rounded-full text-purple-700 text-sm font-medium mb-6">
                <Calculator className="h-4 w-4" />
                Cost Savings Calculator
              </div>
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                See How Much You Could Save
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Select the tools you're currently paying for and see your potential savings with our all-in-one platform.
              </p>
            </div>

            <div className="max-w-4xl mx-auto">
              <Card className="overflow-hidden">
                <CardContent className="p-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-semibold text-lg mb-4">Select Your Current Tools</h3>
                      <div className="space-y-3">
                        {toolSavings.map((tool) => (
                          <label
                            key={tool.name}
                            className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-purple-50 cursor-pointer transition-colors"
                          >
                            <div className="flex items-center gap-3">
                              <input
                                type="checkbox"
                                checked={selectedTools.includes(tool.name)}
                                onChange={() => toggleTool(tool.name)}
                                className="w-5 h-5 rounded border-gray-300 text-purple-600 focus:ring-purple-500"
                              />
                              <span>{tool.name}</span>
                              <Tooltip>
                                <TooltipTrigger>
                                  <HelpCircle className="h-4 w-4 text-muted-foreground" />
                                </TooltipTrigger>
                                <TooltipContent>
                                  <p>{tool.tooltip}</p>
                                </TooltipContent>
                              </Tooltip>
                            </div>
                            <span className="font-medium">${tool.cost}/mo</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    <div className="flex flex-col justify-center">
                      <div className="bg-purple-100 rounded-2xl p-8 text-center">
                        <p className="text-sm text-purple-600 font-semibold mb-2">
                          YOUR CURRENT MONTHLY COST
                        </p>
                        <p className="text-4xl font-bold text-purple-900 mb-6 line-through decoration-red-500">
                          ${totalToolsCost}
                        </p>
                        
                        <div className="border-t border-purple-200 my-6" />
                        
                        <p className="text-sm text-purple-600 font-semibold mb-2">
                          WITH 360 FOR BUSINESS
                        </p>
                        <p className="text-5xl font-bold text-purple-900 mb-2">
                          $79
                        </p>
                        <p className="text-purple-600 mb-6">per month</p>
                        
                        <div className="bg-green-100 rounded-xl p-4 mb-6">
                          <p className="text-sm text-green-700 font-semibold">
                            MONTHLY SAVINGS
                          </p>
                          <p className="text-3xl font-bold text-green-700">
                            ${savings > 0 ? savings : 0}
                          </p>
                          <p className="text-sm text-green-600">
                            That's ${(savings > 0 ? savings : 0) * 12}/year!
                          </p>
                        </div>
                        
                        <Button
                          size="lg"
                          className="w-full bg-orange-500 hover:bg-orange-600 text-white"
                          asChild
                        >
                          <a href="https://app.360forbusiness.com" target="_blank" rel="noopener noreferrer">
                            Start Saving Today
                            <ArrowRight className="ml-2 h-5 w-5" />
                          </a>
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Feature Comparison Table */}
        <section className="py-20 bg-background">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Detailed Feature Comparison
              </h2>
              <div className="section-divider mx-auto mb-6" />
              <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
                Compare our plans side by side to find the perfect fit for your business.
              </p>
            </div>

            <div className="max-w-4xl mx-auto overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left py-4 px-4 font-semibold">Feature</th>
                    <th className="text-center py-4 px-4 font-semibold">
                      <div className="flex flex-col items-center">
                        <span>Starter</span>
                        <span className="text-orange-500 font-bold">$79/mo</span>
                      </div>
                    </th>
                    <th className="text-center py-4 px-4 font-semibold">
                      <div className="flex flex-col items-center">
                        <span>Pro</span>
                        <span className="text-purple-600 font-bold">$149/mo</span>
                      </div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {comparisonFeatures.map((category, catIndex) => (
                    <>
                      <tr key={`cat-${catIndex}`} className="bg-purple-50">
                        <td colSpan={3} className="py-3 px-4 font-semibold text-purple-900">
                          {category.category}
                        </td>
                      </tr>
                      {category.features.map((feature, featIndex) => (
                        <tr key={`feat-${catIndex}-${featIndex}`} className="border-b border-border/50">
                          <td className="py-3 px-4">{feature.name}</td>
                          <td className="py-3 px-4 text-center">
                            {typeof feature.starter === "boolean" ? (
                              feature.starter ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm text-muted-foreground">{feature.starter}</span>
                            )}
                          </td>
                          <td className="py-3 px-4 text-center">
                            {typeof feature.pro === "boolean" ? (
                              feature.pro ? (
                                <Check className="h-5 w-5 text-green-500 mx-auto" />
                              ) : (
                                <X className="h-5 w-5 text-gray-300 mx-auto" />
                              )
                            ) : (
                              <span className="text-sm font-medium text-purple-600">{feature.pro}</span>
                            )}
                          </td>
                        </tr>
                      ))}
                    </>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="text-center mt-12">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white"
                asChild
              >
                <a href="https://app.360forbusiness.com" target="_blank" rel="noopener noreferrer">
                  Start Your Free Trial
                  <ArrowRight className="ml-2 h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-20 bg-purple-50">
          <div className="container">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked Questions
              </h2>
              <div className="section-divider mx-auto mb-6" />
            </div>

            <div className="max-w-3xl mx-auto space-y-6">
              {[
                {
                  q: "Is there a free trial?",
                  a: "Yes! We offer a 14-day free trial on all plans. No credit card required to start.",
                },
                {
                  q: "Can I switch plans later?",
                  a: "Absolutely. You can upgrade or downgrade your plan at any time. Changes take effect on your next billing cycle.",
                },
                {
                  q: "What payment methods do you accept?",
                  a: "We accept all major credit cards (Visa, MasterCard, American Express) and can also arrange invoicing for annual plans.",
                },
                {
                  q: "Is there a contract or commitment?",
                  a: "No long-term contracts. All plans are month-to-month and you can cancel anytime.",
                },
                {
                  q: "Do you offer discounts for annual billing?",
                  a: "Yes! Contact our sales team to learn about annual billing discounts and custom enterprise pricing.",
                },
              ].map((faq, index) => (
                <Card key={index}>
                  <CardContent className="p-6">
                    <h3 className="font-semibold text-lg mb-2">{faq.q}</h3>
                    <p className="text-muted-foreground">{faq.a}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 hero-gradient text-white">
          <div className="container text-center">
            <Sparkles className="h-12 w-12 mx-auto mb-6 text-orange-400" />
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-10 max-w-2xl mx-auto">
              Join thousands of businesses that trust 360 For Business. Start your free trial today.
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
                <Link href="/contact">Contact Sales</Link>
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
