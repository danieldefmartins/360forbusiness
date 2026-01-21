import { Link } from "wouter";
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  company: [
    { href: "/", label: "Home" },
    { href: "/crm", label: "CRM Platform" },
    { href: "/marketing", label: "Marketing Services" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ],
  crm: [
    { href: "/crm#lead-capture", label: "Lead Capture" },
    { href: "/crm#automation", label: "Automation" },
    { href: "/crm#pipelines", label: "Sales Pipelines" },
    { href: "/crm#website-builder", label: "Website Builder" },
    { href: "/crm#marketing", label: "Email & SMS Marketing" },
  ],
  marketing: [
    { href: "/marketing#branding", label: "Branding & Identity" },
    { href: "/marketing#web-dev", label: "Web Development" },
    { href: "/marketing#digital", label: "Digital Marketing" },
    { href: "/marketing#paid-ads", label: "Paid Advertising" },
    { href: "/marketing#social", label: "Social Media" },
  ],
};

const socialLinks = [
  { href: "#", icon: Facebook, label: "Facebook" },
  { href: "#", icon: Twitter, label: "Twitter" },
  { href: "#", icon: Linkedin, label: "LinkedIn" },
  { href: "#", icon: Instagram, label: "Instagram" },
];

export default function Footer() {
  return (
    <footer className="bg-purple-900 text-white">
      <div className="container py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Column */}
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-6">
              <img
                src="/logo-horizontal.png"
                alt="360 For Business"
                className="h-12 w-auto"
              />
            </Link>
            <p className="text-purple-200 mb-6 max-w-sm">
              Your all-in-one growth engine. Complete CRM platform and 360° marketing solutions to help your business scale.
            </p>
            <div className="space-y-3">
              <a
                href="tel:561-559-5556"
                className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors"
              >
                <Phone className="h-5 w-5" />
                <span>561-559-5556</span>
              </a>
              <a
                href="mailto:support@360forbusiness.com"
                className="flex items-center gap-3 text-purple-200 hover:text-white transition-colors"
              >
                <Mail className="h-5 w-5" />
                <span>support@360forbusiness.com</span>
              </a>
            </div>
          </div>

          {/* Company Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Company</h4>
            <ul className="space-y-3">
              {footerLinks.company.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* CRM Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">CRM Features</h4>
            <ul className="space-y-3">
              {footerLinks.crm.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Marketing Links */}
          <div>
            <h4 className="font-semibold text-lg mb-4">Marketing</h4>
            <ul className="space-y-3">
              {footerLinks.marketing.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-purple-200 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-purple-300 text-sm">
            © {new Date().getFullYear()} 360 For Business. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                className="text-purple-300 hover:text-white transition-colors"
                aria-label={social.label}
              >
                <social.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
