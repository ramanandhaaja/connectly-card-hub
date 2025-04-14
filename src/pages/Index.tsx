
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { QrCode, Smartphone, Link as LinkIcon, Globe } from "lucide-react";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-connectly-100 via-white to-connectly-50 py-16 md:py-24">
        <div className="container">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="flex-1 text-center lg:text-left max-w-2xl">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Your <span className="text-gradient">Digital Identity</span> in One Card
              </h1>
              <p className="mt-6 text-lg text-gray-700">
                Create, customize, and share your digital business card instantly. 
                Connect more effectively and leave a lasting impression.
              </p>
              <div className="mt-8 flex flex-wrap gap-4 justify-center lg:justify-start">
                <Link to="/create">
                  <Button size="lg" className="font-medium">Get Started</Button>
                </Link>
                <Link to="/dashboard">
                  <Button size="lg" variant="outline" className="font-medium">View Demo</Button>
                </Link>
              </div>
            </div>
            <div className="flex-1 flex justify-center lg:justify-end">
              <div className="relative business-card scale-100 md:scale-125 shadow-xl animate-fade-in">
                <div className="card-gradient absolute inset-0"></div>
                <div className="absolute inset-0 bg-white/90 backdrop-blur-sm p-6 flex flex-col">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-16 h-16 rounded-full bg-connectly-100 flex items-center justify-center">
                      <span className="text-connectly-600 font-bold text-xl">C</span>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg">Connectly Card</h3>
                      <p className="text-sm text-gray-600">Digital Business Card</p>
                    </div>
                  </div>
                  <div className="space-y-2 text-sm mb-auto">
                    <div className="flex items-center gap-2">
                      <Smartphone className="h-4 w-4 text-connectly-500" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <LinkIcon className="h-4 w-4 text-connectly-500" />
                      <span>connectly.example</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Globe className="h-4 w-4 text-connectly-500" />
                      <span>San Francisco, CA</span>
                    </div>
                  </div>
                  <div className="mt-4 flex justify-end">
                    <QrCode className="h-6 w-6 text-connectly-500" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-3xl font-bold">Features Designed for Connection</h2>
            <p className="mt-4 text-gray-600">
              Connectly provides all the tools you need to create a memorable digital presence and make connecting easier than ever.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-connectly-50 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-connectly-100 flex items-center justify-center mb-4">
                <QrCode className="h-6 w-6 text-connectly-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">QR Codes</h3>
              <p className="text-gray-600">
                Generate custom QR codes that make sharing your contact info as simple as a scan.
              </p>
            </div>
            
            <div className="bg-connectly-50 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-connectly-100 flex items-center justify-center mb-4">
                <LinkIcon className="h-6 w-6 text-connectly-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Direct Links</h3>
              <p className="text-gray-600">
                Share your card via a personalized link that works across any platform or device.
              </p>
            </div>
            
            <div className="bg-connectly-50 p-6 rounded-xl">
              <div className="w-12 h-12 rounded-lg bg-connectly-100 flex items-center justify-center mb-4">
                <Smartphone className="h-6 w-6 text-connectly-600" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Digital Wallets</h3>
              <p className="text-gray-600">
                Add your card to Apple or Google Wallet for quick access whenever you need it.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-connectly-50">
        <div className="container text-center max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold mb-4">Ready to Transform Your Networking?</h2>
          <p className="text-lg text-gray-700 mb-8">
            Create your digital business card in minutes and start making meaningful connections.
          </p>
          <Link to="/create">
            <Button size="lg" className="font-medium">Create Your Card</Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default Index;
