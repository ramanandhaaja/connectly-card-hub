
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Activity, 
  BarChart3, 
  QrCode, 
  Users, 
  Share2, 
  Download, 
  Globe, 
  Link as LinkIcon,
  Mail,
  Smartphone
} from "lucide-react";

const AnalyticsPage = () => {
  // Mock data for demo purposes
  const analytics = {
    views: 32,
    shares: 8,
    saves: 5,
    clicks: 12,
    qrScans: 7,
    emailShares: 3,
    walletAdds: 2,
    countries: [
      { name: "United States", count: 18 },
      { name: "Canada", count: 5 },
      { name: "United Kingdom", count: 4 },
      { name: "Germany", count: 3 },
      { name: "France", count: 2 },
    ],
    linkClicks: [
      { name: "Website", count: 6 },
      { name: "LinkedIn", count: 3 },
      { name: "Twitter", count: 2 },
      { name: "Email", count: 1 },
    ],
  };
  
  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-gray-600 mt-1">Track your digital business card performance</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Total Views</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Activity className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{analytics.views}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">QR Scans</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <QrCode className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{analytics.qrScans}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Shares</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Share2 className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{analytics.shares}</div>
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-gray-500">Saves</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Download className="h-5 w-5 text-connectly-500 mr-2" />
              <div className="text-2xl font-bold">{analytics.saves}</div>
            </div>
          </CardContent>
        </Card>
      </div>
      
      <Tabs defaultValue="overview">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="traffic">Traffic Sources</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>View your card's overall performance</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] flex items-center justify-center bg-gray-100 rounded-md">
                <BarChart3 className="h-16 w-16 text-gray-400" />
                <p className="text-gray-500 ml-4">Detailed charts coming soon!</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="traffic" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Sharing Methods</CardTitle>
                <CardDescription>How your card is being shared</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  <li className="flex justify-between items-center">
                    <div className="flex items-center">
                      <QrCode className="h-5 w-5 text-connectly-500 mr-3" />
                      <span>QR Code Scans</span>
                    </div>
                    <span className="font-medium">{analytics.qrScans}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center">
                      <LinkIcon className="h-5 w-5 text-connectly-500 mr-3" />
                      <span>Direct Link Shares</span>
                    </div>
                    <span className="font-medium">{analytics.shares - analytics.emailShares - analytics.qrScans}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Mail className="h-5 w-5 text-connectly-500 mr-3" />
                      <span>Email Shares</span>
                    </div>
                    <span className="font-medium">{analytics.emailShares}</span>
                  </li>
                  <li className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Smartphone className="h-5 w-5 text-connectly-500 mr-3" />
                      <span>Wallet Adds</span>
                    </div>
                    <span className="font-medium">{analytics.walletAdds}</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Link Clicks</CardTitle>
                <CardDescription>Which links are getting clicked</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {analytics.linkClicks.map((link) => (
                    <li key={link.name} className="flex justify-between items-center">
                      <div className="flex items-center">
                        <Globe className="h-5 w-5 text-connectly-500 mr-3" />
                        <span>{link.name}</span>
                      </div>
                      <span className="font-medium">{link.count}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="geography" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Visitor Geography</CardTitle>
              <CardDescription>Where your card is being viewed from</CardDescription>
            </CardHeader>
            <CardContent>
              <ul className="space-y-4">
                {analytics.countries.map((country) => (
                  <li key={country.name} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <Globe className="h-5 w-5 text-connectly-500 mr-3" />
                      <span>{country.name}</span>
                    </div>
                    <span className="font-medium">{country.count} views</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
