
import { Link } from "react-router-dom";
import { ArrowRight, Activity, BarChart3, FileText, MapPin, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";

const features = [
  {
    icon: FileText,
    title: "Easy Data Collection",
    description: "Simple forms to record sickness information and track symptoms in real-time."
  },
  {
    icon: MapPin,
    title: "Geographic Mapping",
    description: "Visualize sickness data by region to identify patterns and outbreaks."
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive reporting tools to analyze trends and generate insights."
  },
  {
    icon: Shield,
    title: "Secure & Private",
    description: "Your health data is secured with the latest encryption and privacy controls."
  }
];

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation */}
      <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container mx-auto flex h-16 items-center px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-primary" />
            <span className="text-lg font-semibold">SRRS</span>
          </div>
          <nav className="ml-auto flex gap-4 sm:gap-6">
            <Link to="/login" className="text-sm font-medium text-muted-foreground hover:text-foreground">
              Log in
            </Link>
            <Button asChild size="sm">
              <Link to="/register">
                Sign up
              </Link>
            </Button>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="bg-muted/30 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <div className="flex items-center justify-center space-x-2 text-primary">
              <Activity className="h-8 w-8" />
              <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                Sickness Recording & Reporting System
              </h1>
            </div>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground md:text-xl">
              A comprehensive platform for recording, tracking, and analyzing sickness data across different regions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 mt-6">
              <Button asChild size="lg">
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/login">
                  Sign In
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Key Features
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
              Our platform provides everything you need to record and analyze sickness data.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <Card key={index} className="h-full">
                <CardHeader>
                  <feature.icon className="h-10 w-10 text-primary" />
                  <CardTitle className="mt-4">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>{feature.description}</CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* User Types Section */}
      <section className="bg-muted/30 py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Built for Everyone
            </h2>
            <p className="mx-auto mt-4 max-w-[700px] text-lg text-muted-foreground">
              Our platform serves different user types with tailored functionality.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2">
            <Card className="bg-primary text-primary-foreground shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Regular Users</CardTitle>
                <CardDescription className="text-primary-foreground/80">
                  For individuals who want to report illnesses and track health patterns
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary-foreground/20 p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Submit personal sickness reports with detailed symptoms</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary-foreground/20 p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>View your reporting history and track personal health trends</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-primary-foreground/20 p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Receive alerts about health issues in your region</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" variant="secondary" asChild className="w-full">
                  <Link to="/register?role=user">
                    Register as User
                  </Link>
                </Button>
              </CardFooter>
            </Card>
            
            <Card className="border-2 border-accent shadow-lg">
              <CardHeader>
                <CardTitle className="text-2xl">Administrators</CardTitle>
                <CardDescription>
                  For health professionals and researchers managing the system
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-accent/20 p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Access comprehensive data analytics and reporting tools</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-accent/20 p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Manage users, verify reports, and send notifications</span>
                </div>
                <div className="flex items-start gap-2">
                  <div className="rounded-full bg-accent/20 p-1 mt-0.5">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-check text-accent"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  </div>
                  <span>Configure system settings and customize the platform</span>
                </div>
              </CardContent>
              <CardFooter>
                <Button size="lg" asChild className="w-full">
                  <Link to="/register?role=admin">
                    Register as Admin
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-12 md:py-24 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center text-center space-y-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
              Ready to Get Started?
            </h2>
            <p className="mx-auto max-w-[700px] text-lg text-muted-foreground">
              Join thousands of healthcare professionals and researchers using our platform.
            </p>
            <Button asChild size="lg" className="mt-6">
              <Link to="/register">
                Create Your Account
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t py-6 md:py-0">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 md:h-24 md:flex-row">
            <div className="flex items-center space-x-2">
              <Activity className="h-5 w-5 text-primary" />
              <p className="text-sm text-muted-foreground">
                © 2025 SRRS. All rights reserved.
              </p>
            </div>
            <div className="flex items-center gap-4 text-sm text-muted-foreground">
              <Link to="#" className="hover:underline">
                Privacy Policy
              </Link>
              <Link to="#" className="hover:underline">
                Terms of Service
              </Link>
              <Link to="#" className="hover:underline">
                Contact
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
