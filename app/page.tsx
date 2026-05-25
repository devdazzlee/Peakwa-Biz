import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustedBy from "@/components/TrustedBy";
import StatsBar from "@/components/StatsBar";
import ServicesGrid from "@/components/ServicesGrid";
import Industries from "@/components/Industries";
import WhyChooseUs from "@/components/WhyChooseUs";
import HowItWorks from "@/components/HowItWorks";
import CaseStudies from "@/components/CaseStudies";
import Integrations from "@/components/Integrations";
import Testimonials from "@/components/Testimonials";
import SmartForm from "@/components/SmartForm";
import FAQ from "@/components/FAQ";
import CTASection from "@/components/CTASection";
import Footer from "@/components/Footer";
import Chatbot from "@/components/Chatbot";

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <TrustedBy />
      <StatsBar />
      <ServicesGrid />
      <Industries />
      <WhyChooseUs />
      <HowItWorks />
      <CaseStudies />
      <Integrations />
      <Testimonials />
      <SmartForm />
      <FAQ />
      <CTASection />
      <Footer />
      <Chatbot />
    </>
  );
}
