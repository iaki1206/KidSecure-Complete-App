import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";
import { ArrowLeft, Users, Clock, CheckCircle, XCircle, Shield, BarChart3, Download } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function Testing() {
  const [, setLocation] = useLocation();
  const { data: stats, isLoading, error } = trpc.testing.getStats.useQuery();

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 flex items-center justify-center">
        <div className="text-center space-y-4">
          <div className="text-6xl animate-spin">📊</div>
          <p className="text-2xl font-semibold">Loading statistics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 p-8">
        <div className="container max-w-4xl">
          <Alert variant="destructive">
            <AlertDescription>Failed to load statistics. Please try again later.</AlertDescription>
          </Alert>
        </div>
      </div>
    );
  }

  const registration = stats?.registration || { total: 0, successful: 0, avgTime: 0, avgAttempts: 0 };
  const login = stats?.login || { total: 0, successful: 0, avgTime: 0, avgAttempts: 0 };
  const memorability = stats?.memorability || { total: 0, successful: 0, avgTime: 0, avgAttempts: 0 };

  const totalUsers = registration.total;
  const totalAttempts = login.total;
  const successRate = login.total > 0 ? (login.successful / login.total) * 100 : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8">
      <div className="container max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => setLocation("/")}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </Button>
          <div className="flex items-center gap-3">
            <BarChart3 className="w-8 h-8 text-primary" />
            <h1 className="text-3xl font-bold">Testing Dashboard</h1>
          </div>
          <div className="w-32" />
        </div>

        {/* Overview Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <Card className="border-4 border-primary/30">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                Total Users
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-primary">{totalUsers}</div>
            </CardContent>
          </Card>

          <Card className="border-4 border-secondary/30">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                Login Attempts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-secondary">{totalAttempts}</div>
            </CardContent>
          </Card>

          <Card className="border-4 border-accent/30">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4" />
                Success Rate
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold text-accent">{successRate.toFixed(1)}%</div>
            </CardContent>
          </Card>

          <Card className="border-4 border-muted">
            <CardHeader className="pb-3">
              <CardDescription className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Avg Login Time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-4xl font-bold">{(login.avgTime / 1000).toFixed(1)}s</div>
            </CardContent>
          </Card>
        </div>

        {/* Usability Metrics */}
        <Card className="border-4 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Users className="w-6 h-6" />
              Usability Metrics
            </CardTitle>
            <CardDescription>
              Measuring user experience and system effectiveness
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              {/* Registration Metrics */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Registration</h3>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {(registration.avgTime / 1000).toFixed(1)}s
                    </div>
                    <span className="text-sm text-muted-foreground">Avg Time</span>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold mb-1">{registration.total}</div>
                    <span className="text-sm text-muted-foreground">Total</span>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-1">
                      {registration.total > 0 ? ((registration.successful / registration.total) * 100).toFixed(0) : 0}%
                    </div>
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Login Metrics */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Login</h3>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-secondary/10 rounded-lg">
                    <div className="text-3xl font-bold text-secondary mb-1">
                      {(login.avgTime / 1000).toFixed(1)}s
                    </div>
                    <span className="text-sm text-muted-foreground">Avg Time</span>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold mb-1">{login.total}</div>
                    <span className="text-sm text-muted-foreground">Total</span>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-1">
                      {login.total > 0 ? ((login.successful / login.total) * 100).toFixed(0) : 0}%
                    </div>
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                  </div>
                </div>
              </div>

              {/* Memorability Metrics */}
              <div className="space-y-4">
                <h3 className="text-xl font-semibold text-center">Memorability</h3>
                <div className="space-y-3">
                  <div className="text-center p-4 bg-primary/10 rounded-lg">
                    <div className="text-3xl font-bold text-primary mb-1">
                      {memorability.avgAttempts.toFixed(1)}
                    </div>
                    <span className="text-sm text-muted-foreground">Avg Attempts</span>
                  </div>
                  <div className="text-center p-4 bg-muted rounded-lg">
                    <div className="text-3xl font-bold mb-1">{memorability.total}</div>
                    <span className="text-sm text-muted-foreground">Total Tests</span>
                  </div>
                  <div className="text-center p-4 bg-accent/10 rounded-lg">
                    <div className="text-3xl font-bold text-accent mb-1">
                      {memorability.total > 0 ? ((memorability.successful / memorability.total) * 100).toFixed(0) : 0}%
                    </div>
                    <span className="text-sm text-muted-foreground">Success Rate</span>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Security Analysis */}
        <Card className="border-4 mb-8">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <Shield className="w-6 h-6" />
              Security Analysis
            </CardTitle>
            <CardDescription>
              System security metrics and attack resistance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-accent/10 rounded-xl">
                <div className="text-5xl mb-3">🔒</div>
                <h3 className="font-semibold text-lg mb-2">Password Space</h3>
                <p className="text-3xl font-bold text-accent">390,625</p>
                <p className="text-sm text-muted-foreground mt-2">
                  Possible combinations (25⁴)
                </p>
              </div>

              <div className="text-center p-6 bg-primary/10 rounded-xl">
                <div className="text-5xl mb-3">🛡️</div>
                <h3 className="font-semibold text-lg mb-2">Encryption</h3>
                <p className="text-3xl font-bold text-primary">PBKDF2</p>
                <p className="text-sm text-muted-foreground mt-2">
                  100,000 iterations + salt
                </p>
              </div>

              <div className="text-center p-6 bg-secondary/10 rounded-xl">
                <div className="text-5xl mb-3">⏱️</div>
                <h3 className="font-semibold text-lg mb-2">Rate Limiting</h3>
                <p className="text-3xl font-bold text-secondary">3 attempts</p>
                <p className="text-sm text-muted-foreground mt-2">
                  5-minute lockout period
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Research Insights */}
        <Card className="border-4">
          <CardHeader>
            <CardTitle className="text-2xl flex items-center gap-2">
              <BarChart3 className="w-6 h-6" />
              Research Insights
            </CardTitle>
            <CardDescription>
              Key findings for academic analysis
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h3 className="font-semibold text-lg">✅ Strengths</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>High memorability through visual recognition</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Child-friendly interface with large touch targets</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Strong cryptographic protection (PBKDF2)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                    <span>Resistant to shoulder-surfing attacks</span>
                  </li>
                </ul>
              </div>

              <div className="space-y-3">
                <h3 className="font-semibold text-lg">⚠️ Considerations</h3>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Requires parental consent for data collection</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>GDPR compliance needed for EU deployment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Accessibility features needed for diverse users</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <XCircle className="w-4 h-4 text-destructive mt-0.5 flex-shrink-0" />
                    <span>Password recovery mechanism required</span>
                  </li>
                </ul>
              </div>
            </div>

            <div className="pt-4 border-t">
              <Button size="lg" className="w-full md:w-auto gap-2" onClick={() => {
                // Build CSV content from stats
                const csvRows = [
                  ["Metric", "Category", "Value"],
                  ["Total Tests", "Registration", String(registration.total)],
                  ["Successful", "Registration", String(registration.successful)],
                  ["Success Rate (%)", "Registration", registration.total > 0 ? ((registration.successful / registration.total) * 100).toFixed(1) : "0"],
                  ["Avg Time (ms)", "Registration", String(registration.avgTime)],
                  ["Avg Time (s)", "Registration", (registration.avgTime / 1000).toFixed(2)],
                  ["Avg Attempts", "Registration", registration.avgAttempts.toFixed(2)],
                  ["Total Tests", "Login", String(login.total)],
                  ["Successful", "Login", String(login.successful)],
                  ["Success Rate (%)", "Login", login.total > 0 ? ((login.successful / login.total) * 100).toFixed(1) : "0"],
                  ["Avg Time (ms)", "Login", String(login.avgTime)],
                  ["Avg Time (s)", "Login", (login.avgTime / 1000).toFixed(2)],
                  ["Avg Attempts", "Login", login.avgAttempts.toFixed(2)],
                  ["Total Tests", "Memorability", String(memorability.total)],
                  ["Successful", "Memorability", String(memorability.successful)],
                  ["Success Rate (%)", "Memorability", memorability.total > 0 ? ((memorability.successful / memorability.total) * 100).toFixed(1) : "0"],
                  ["Avg Time (ms)", "Memorability", String(memorability.avgTime)],
                  ["Avg Time (s)", "Memorability", (memorability.avgTime / 1000).toFixed(2)],
                  ["Avg Attempts", "Memorability", memorability.avgAttempts.toFixed(2)],
                  [],
                  ["Security Metric", "", "Value"],
                  ["Password Space", "", "390625"],
                  ["Encryption", "", "PBKDF2 (100000 iterations)"],
                  ["Max Login Attempts", "", "3"],
                  ["Lockout Duration", "", "5 minutes"],
                ];
                const csvContent = csvRows.map(row => row.join(",")).join("\n");
                const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
                const url = URL.createObjectURL(blob);
                const link = document.createElement("a");
                link.href = url;
                link.download = "kidsecure_analysis_data.csv";
                link.click();
                URL.revokeObjectURL(url);
              }}>
                <Download className="w-5 h-5" />
                Export Data for Analysis
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
