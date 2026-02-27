import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, LogOut, BarChart3 } from "lucide-react";

export default function Dashboard() {
  const [, setLocation] = useLocation();

  const handleLogout = () => {
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      <div className="container py-12">
        <div className="max-w-4xl mx-auto space-y-8">
          {/* Header */}
          <div className="text-center space-y-4">
            <div className="inline-block w-20 h-20 rounded-full bg-accent flex items-center justify-center mb-4">
              <Shield className="w-12 h-12 text-accent-foreground" />
            </div>
            <h1 className="text-5xl font-bold">Welcome! 🎉</h1>
            <p className="text-2xl text-muted-foreground">
              You're logged in successfully!
            </p>
          </div>

          {/* Success Card */}
          <Card className="border-4 border-accent">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <CardTitle className="text-3xl">Login Successful!</CardTitle>
              <CardDescription className="text-lg">
                Your graphical password worked perfectly!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-4">
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setLocation("/testing")}
                  className="h-14 text-lg gap-2"
                >
                  <BarChart3 className="w-6 h-6" />
                  View Statistics
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  onClick={handleLogout}
                  className="h-14 text-lg gap-2"
                >
                  <LogOut className="w-6 h-6" />
                  Logout
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Info Cards */}
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-center text-4xl">🔒</CardTitle>
                <CardDescription className="text-center">
                  Your password is encrypted and secure!
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-center text-4xl">🎨</CardTitle>
                <CardDescription className="text-center">
                  Easy to remember with fun pictures!
                </CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-2">
              <CardHeader>
                <CardTitle className="text-center text-4xl">🛡️</CardTitle>
                <CardDescription className="text-center">
                  Protected against guessing attacks!
                </CardDescription>
              </CardHeader>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
