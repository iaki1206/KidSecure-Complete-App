import { Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Lock, Sparkles, Users } from "lucide-react";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-primary/10 via-background to-secondary/10">
      {/* Header */}
      <header className="container py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-primary flex items-center justify-center">
              <Shield className="w-7 h-7 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-primary">KidSecure</h1>
              <p className="text-sm text-muted-foreground">Fun & Safe Passwords!</p>
            </div>
          </div>
          <Link href="/login">
            <Button variant="outline" size="lg" className="gap-2">
              <Lock className="w-5 h-5" />
              Login
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="container flex-1 flex items-center justify-center py-12">
        <div className="max-w-4xl w-full space-y-12">
          {/* Hero Section */}
          <div className="text-center space-y-6">
            <div className="inline-block">
              <div className="text-7xl mb-4 animate-bounce-gentle">🦁🐘🐬🦜</div>
            </div>
            <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
              Welcome to KidSecure!
            </h2>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Create your own special password using fun animal pictures!
              It's easy to remember and super secure! 🎉
            </p>
          </div>

          {/* Feature Cards */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="border-4 hover:border-primary transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                  <Sparkles className="w-8 h-8 text-primary" />
                </div>
                <CardTitle className="text-2xl">Easy & Fun!</CardTitle>
                <CardDescription className="text-lg">
                  Pick your favorite animals to create a password you'll never forget!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/register">
                  <Button size="lg" className="w-full text-lg h-14 gap-2" variant="default">
                    Create My Password! 🎨
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="border-4 hover:border-secondary transition-all duration-300 hover:scale-105">
              <CardHeader>
                <div className="w-16 h-16 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-secondary" />
                </div>
                <CardTitle className="text-2xl">Super Secure!</CardTitle>
                <CardDescription className="text-lg">
                  Your password is protected with special technology to keep it safe!
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/testing">
                  <Button size="lg" className="w-full text-lg h-14 gap-2" variant="outline">
                    Learn More 📚
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* How It Works */}
          <Card className="border-4 border-accent/50 bg-accent/5">
            <CardHeader>
              <CardTitle className="text-3xl text-center">How It Works 🎯</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6 text-center">
                <div className="space-y-3">
                  <div className="text-5xl">1️⃣</div>
                  <h3 className="font-semibold text-lg">Choose a Username</h3>
                  <p className="text-sm text-muted-foreground">Pick a cool name!</p>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl">2️⃣</div>
                  <h3 className="font-semibold text-lg">Pick 4 Animals</h3>
                  <p className="text-sm text-muted-foreground">Select your favorites!</p>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl">3️⃣</div>
                  <h3 className="font-semibold text-lg">Remember Them</h3>
                  <p className="text-sm text-muted-foreground">Easy to remember!</p>
                </div>
                <div className="space-y-3">
                  <div className="text-5xl">4️⃣</div>
                  <h3 className="font-semibold text-lg">Login Anytime</h3>
                  <p className="text-sm text-muted-foreground">You're all set!</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Testing Section (for academic purposes) */}
          <Card className="border-4 border-muted">
            <CardHeader>
              <div className="flex items-center gap-3">
                <Users className="w-8 h-8 text-primary" />
                <div>
                  <CardTitle className="text-2xl">For Researchers & Teachers</CardTitle>
                  <CardDescription className="text-base">
                    Access testing tools and analytics
                  </CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Link href="/testing">
                <Button variant="outline" size="lg" className="w-full gap-2">
                  View Testing Dashboard
                </Button>
              </Link>
            </CardContent>
          </Card>
        </div>
      </main>

      {/* Footer */}
      <footer className="container py-6 text-center text-sm text-muted-foreground">
        <p>KidSecure - A Child-Friendly Graphical Password Authentication System</p>
        <p className="mt-1">Created for academic research purposes</p>
      </footer>
    </div>
  );
}
