import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Shield, ArrowLeft, LogIn, AlertTriangle } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import type { AnimalImage } from "@shared/animals";

const TOTAL_ROUNDS = 4;

export default function Login() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [currentRound, setCurrentRound] = useState(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [gridAnimals, setGridAnimals] = useState<AnimalImage[]>([]);
  const [error, setError] = useState("");
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [remainingAttempts, setRemainingAttempts] = useState(3);

  const loginMutation = trpc.graphicalAuth.login.useMutation();

  // Fetch login grid for the current round (includes the correct animal)
  const loginGridQuery = trpc.graphicalAuth.getLoginGrid.useQuery(
    { username, round: currentRound - 1 }, // 0-indexed on server
    { enabled: currentRound >= 1 && currentRound <= TOTAL_ROUNDS && username.length >= 3 }
  );

  // Update grid animals when query returns data
  useEffect(() => {
    if (loginGridQuery.data && currentRound >= 1 && currentRound <= TOTAL_ROUNDS) {
      setGridAnimals(loginGridQuery.data);
    }
  }, [loginGridQuery.data, currentRound]);

  const handleUsernameSubmit = () => {
    if (username.length < 3) {
      setError("Please enter your username");
      return;
    }

    setError("");
    setCurrentRound(1);
    toast.success("Now select your animals! 🎯");
  };

  const handleAnimalSelect = (animalId: string) => {
    const newSelected = [...selectedImages];
    newSelected[currentRound - 1] = animalId;
    setSelectedImages(newSelected);

    // Auto-advance to next round
    setTimeout(() => {
      if (currentRound < TOTAL_ROUNDS) {
        setCurrentRound(prev => prev + 1);
      } else {
        // All rounds complete, submit
        handleSubmit(newSelected);
      }
    }, 300);
  };

  const handleSubmit = async (images: string[]) => {
    if (images.length !== TOTAL_ROUNDS) {
      setError("Please select an animal for each round");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await loginMutation.mutateAsync({
        username,
        selectedImages: images,
        startTime,
        sessionInfo: navigator.userAgent,
      });

      if (result.success) {
        toast.success("🎉 Login successful! Welcome back!");
        setTimeout(() => {
          setLocation("/dashboard");
        }, 1500);
      } else {
        if (result.locked) {
          setError("Account locked due to too many failed attempts. Please try again in 5 minutes.");
          toast.error("Account locked! ⏰");
        } else {
          const attempts = result.remainingAttempts ?? 3;
          setRemainingAttempts(attempts);
          setError(`Incorrect password. ${attempts} attempts remaining.`);
          toast.error(`Wrong password! ${attempts} tries left! 😕`);
        }
        // Reset for retry
        setSelectedImages([]);
        setCurrentRound(1);
      }
    } catch (err) {
      setError("An error occurred during login");
      toast.error("Something went wrong! 😢");
      setSelectedImages([]);
      setCurrentRound(1);
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSelection = selectedImages[currentRound - 1];

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => currentRound === 0 ? setLocation("/") : setCurrentRound(0)}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Login</h1>
          </div>
          <div className="w-24" /> {/* Spacer */}
        </div>

        {/* Username Step */}
        {currentRound === 0 && (
          <Card className="border-4 border-primary/50">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl mb-2">Welcome Back! 👋</CardTitle>
              <CardDescription className="text-lg">
                Enter your username to login
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-md mx-auto space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your username..."
                  value={username}
                  onChange={(e) => setUsername(e.target.value.toLowerCase())}
                  className="text-xl h-14 text-center border-4"
                  maxLength={20}
                  onKeyDown={(e) => e.key === "Enter" && handleUsernameSubmit()}
                />
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button
                  size="lg"
                  onClick={handleUsernameSubmit}
                  disabled={username.length < 3}
                  className="w-full h-14 text-xl gap-2"
                >
                  Continue
                  <LogIn className="w-6 h-6" />
                </Button>
                <div className="text-center pt-4 space-y-2">
                  <p className="text-muted-foreground">Don't have an account?</p>
                  <Button
                    variant="link"
                    onClick={() => setLocation("/register")}
                    className="text-primary text-lg"
                  >
                    Create a password →
                  </Button>
                  <div className="pt-2">
                    <Button
                      variant="link"
                      onClick={() => setLocation("/recover-password")}
                      className="text-muted-foreground hover:text-primary text-base"
                    >
                      Forgot your password?
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Animal Selection Rounds */}
        {currentRound > 0 && currentRound <= TOTAL_ROUNDS && (
          <div className="space-y-6">
            {/* Progress & Attempts Warning */}
            <Card className="border-4 border-accent/50">
              <CardContent className="py-6">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-2">
                    Round {currentRound} of {TOTAL_ROUNDS}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Select your animal! 🐾
                  </p>
                  {remainingAttempts < 3 && (
                    <div className="mt-4 flex items-center justify-center gap-2 text-destructive">
                      <AlertTriangle className="w-5 h-5" />
                      <span className="font-semibold">
                        {remainingAttempts} attempts remaining!
                      </span>
                    </div>
                  )}
                </div>
                <div className="progress-dots">
                  {Array.from({ length: TOTAL_ROUNDS }).map((_, i) => (
                    <div
                      key={i}
                      className={`progress-dot ${i + 1 === currentRound
                        ? "active"
                        : i < currentRound
                          ? "completed"
                          : ""
                        }`}
                    />
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Animal Grid */}
            <Card className="border-4">
              <CardContent className="p-4">
                {loginGridQuery.isLoading ? (
                  <div className="flex items-center justify-center py-20">
                    <div className="inline-block animate-spin text-4xl">🔄</div>
                  </div>
                ) : (
                  <div className="animal-grid">
                    {gridAnimals.map((animal: AnimalImage) => (
                      <button
                        key={animal.id}
                        onClick={() => handleAnimalSelect(animal.id)}
                        className={`animal-card ${currentSelection === animal.id ? "selected" : ""
                          }`}
                        disabled={isSubmitting}
                      >
                        <img
                          src={`/${animal.filename}`}
                          alt={animal.name}
                        />
                        <span>{animal.name}</span>
                      </button>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            {isSubmitting && (
              <div className="text-center">
                <div className="inline-block animate-spin text-6xl">🔄</div>
                <p className="text-xl mt-4">Checking your password...</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
