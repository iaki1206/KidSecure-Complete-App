import { useState, useEffect } from "react";
import * as React from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";
import type { AnimalImage } from "@shared/animals";

const TOTAL_ROUNDS = 4;
const GRID_SIZE = 25;

// Registration steps:
// 0 = username, 1-4 = animal selection, 5 = review, 6 = security questions
type RegistrationStep = number;

export default function Register() {
  const [, setLocation] = useLocation();
  const [username, setUsername] = useState("");
  const [currentRound, setCurrentRound] = useState<RegistrationStep>(0);
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [selectedAnimalData, setSelectedAnimalData] = useState<(AnimalImage | null)[]>([null, null, null, null]);
  const [gridAnimals, setGridAnimals] = useState<AnimalImage[]>([]);
  const [error, setError] = useState("");
  const [startTime] = useState(Date.now());
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security questions state
  const [securityQuestion1, setSecurityQuestion1] = useState("");
  const [securityQuestion2, setSecurityQuestion2] = useState("");
  const [securityAnswer1, setSecurityAnswer1] = useState("");
  const [securityAnswer2, setSecurityAnswer2] = useState("");

  const checkUsernameMutation = trpc.graphicalAuth.checkUsername.useMutation();
  const registerMutation = trpc.graphicalAuth.register.useMutation();
  const { data: animals } = trpc.graphicalAuth.getGridAnimals.useQuery({
    count: GRID_SIZE,
    excludeIds: selectedImages,
  });
  const { data: securityQuestions } = trpc.graphicalAuth.getSecurityQuestions.useQuery();

  useEffect(() => {
    if (animals) {
      setGridAnimals(animals);
    }
  }, [animals]);

  const handleUsernameSubmit = async () => {
    if (username.length < 3) {
      setError("Username must be at least 3 characters long");
      return;
    }

    const result = await checkUsernameMutation.mutateAsync({ username });
    if (!result.available) {
      setError(result.error || "Username not available");
      return;
    }

    setError("");
    setCurrentRound(1);
    toast.success("Great username! Now pick your first animal! 🎉");
  };

  const handleAnimalSelect = (animalId: string) => {
    const newSelected = [...selectedImages];
    newSelected[currentRound - 1] = animalId;
    setSelectedImages(newSelected);

    // Store the full animal data for the review screen
    const animal = gridAnimals.find((a: AnimalImage) => a.id === animalId);
    if (animal) {
      const newAnimalData = [...selectedAnimalData];
      newAnimalData[currentRound - 1] = animal;
      setSelectedAnimalData(newAnimalData);
    }

    // Auto-advance to next round after selection
    setTimeout(() => {
      setCurrentRound((prev: number) => {
        if (prev < TOTAL_ROUNDS) {
          toast.success(`Round ${prev} complete! Pick animal ${prev + 1}! 🎯`);
          return prev + 1;
        } else if (prev === TOTAL_ROUNDS) {
          toast.success(`All animals picked! Review your password! 🎉`);
          return TOTAL_ROUNDS + 1; // Go to review screen (step 5)
        }
        return prev;
      });
    }, 500);
  };

  const handleReviewConfirm = () => {
    setError("");
    setCurrentRound(TOTAL_ROUNDS + 2); // Go to security questions (step 6)
  };

  const handleSubmit = async () => {
    // Validate security questions
    if (!securityQuestion1 || !securityQuestion2) {
      setError("Please select both security questions");
      return;
    }
    if (securityQuestion1 === securityQuestion2) {
      setError("Please select two different security questions");
      return;
    }
    if (!securityAnswer1.trim() || !securityAnswer2.trim()) {
      setError("Please answer both security questions");
      return;
    }
    if (selectedImages.length !== TOTAL_ROUNDS) {
      setError("Please select an animal for each round");
      return;
    }

    setIsSubmitting(true);
    try {
      const result = await registerMutation.mutateAsync({
        username,
        selectedImages,
        startTime,
        securityQuestion1,
        securityAnswer1: securityAnswer1.trim(),
        securityQuestion2,
        securityAnswer2: securityAnswer2.trim(),
      });

      if (result.success) {
        toast.success("🎉 Password created successfully!");
        setTimeout(() => {
          setLocation("/login");
        }, 1500);
      } else {
        setError(result.error || "Registration failed");
      }
    } catch (err) {
      setError("An error occurred during registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  const currentSelection = selectedImages[currentRound - 1];

  // Step 5 = review (TOTAL_ROUNDS + 1)
  const isReviewStep = currentRound === TOTAL_ROUNDS + 1;
  // Step 6 = security questions (TOTAL_ROUNDS + 2)
  const isSecurityStep = currentRound === TOTAL_ROUNDS + 2;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8">
      <div className="container max-w-6xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              if (currentRound === 0) setLocation("/");
              else if (isSecurityStep) setCurrentRound(TOTAL_ROUNDS + 1);
              else setCurrentRound(Math.max(0, currentRound - 1));
            }}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <Shield className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Create Password</h1>
          </div>
          <div className="w-24" /> {/* Spacer for alignment */}
        </div>

        {/* Username Step */}
        {currentRound === 0 && (
          <Card className="border-4 border-primary/50">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl mb-2">Choose Your Username! 🎯</CardTitle>
              <CardDescription className="text-lg">
                Pick a cool username that you'll remember!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-md mx-auto space-y-4">
                <Input
                  type="text"
                  placeholder="Enter your username..."
                  value={username}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value.toLowerCase())}
                  className="text-xl h-14 text-center border-4"
                  maxLength={20}
                  onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => e.key === "Enter" && handleUsernameSubmit()}
                />
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button
                  size="lg"
                  onClick={handleUsernameSubmit}
                  disabled={username.length < 3 || checkUsernameMutation.isPending}
                  className="w-full h-14 text-xl gap-2"
                >
                  {checkUsernameMutation.isPending ? "Checking..." : "Next Step"}
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Animal Selection Rounds */}
        {currentRound > 0 && currentRound <= TOTAL_ROUNDS && (
          <div className="space-y-6">
            {/* Progress Indicator */}
            <Card className="border-4 border-accent/50">
              <CardContent className="py-6">
                <div className="text-center mb-4">
                  <h2 className="text-3xl font-bold mb-2">
                    Round {currentRound} of {TOTAL_ROUNDS}
                  </h2>
                  <p className="text-xl text-muted-foreground">
                    Pick your favorite animal! 🐾
                  </p>
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
                <div className="animal-grid">
                  {gridAnimals.map((animal: AnimalImage) => (
                    <button
                      key={animal.id}
                      onClick={() => handleAnimalSelect(animal.id)}
                      className={`animal-card ${currentSelection === animal.id ? "selected" : ""
                        }`}
                    >
                      <img
                        src={`/${animal.filename}`}
                        alt={animal.name}
                      />
                      <span>{animal.name}</span>
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>

            {error && (
              <Alert variant="destructive">
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
          </div>
        )}

        {/* Review Step */}
        {isReviewStep && (
          <Card className="border-4 border-accent">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl mb-2">Review Your Password! 🎉</CardTitle>
              <CardDescription className="text-lg">
                Remember these {TOTAL_ROUNDS} animals in order!
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-3xl mx-auto">
                {selectedImages.map((imageId: string, index: number) => {
                  const animal = selectedAnimalData[index];
                  return (
                    <div key={index} className="text-center space-y-2">
                      <div className="text-2xl font-bold text-primary">
                        {index + 1}
                      </div>
                      {animal && (
                        <>
                          <div className="animal-card selected">
                            <img
                              src={`/${animal.filename}`}
                              alt={animal.name}
                            />
                          </div>
                          <p className="font-semibold">{animal.name}</p>
                        </>
                      )}
                    </div>
                  );
                })}
              </div>

              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <div className="flex gap-4 max-w-md mx-auto">
                <Button
                  variant="outline"
                  size="lg"
                  onClick={() => setCurrentRound(1)}
                  className="flex-1 h-14 text-lg"
                >
                  Start Over
                </Button>
                <Button
                  size="lg"
                  onClick={handleReviewConfirm}
                  className="flex-1 h-14 text-lg gap-2"
                >
                  Continue
                  <ArrowRight className="w-6 h-6" />
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Security Questions Step */}
        {isSecurityStep && (
          <Card className="border-4 border-secondary/50">
            <CardHeader className="text-center">
              <CardTitle className="text-4xl mb-2">Security Questions 🔐</CardTitle>
              <CardDescription className="text-lg">
                Choose 2 security questions in case you forget your password
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="max-w-lg mx-auto space-y-6">
                {/* Question 1 */}
                <div className="space-y-2">
                  <Label htmlFor="sq1" className="text-lg font-semibold">Question 1</Label>
                  <Select value={securityQuestion1} onValueChange={setSecurityQuestion1}>
                    <SelectTrigger className="text-base h-12 border-2">
                      <SelectValue placeholder="Select a question..." />
                    </SelectTrigger>
                    <SelectContent>
                      {securityQuestions?.map((q: string) => (
                        <SelectItem key={q} value={q} className="text-base">
                          {q}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="sq1"
                    type="text"
                    placeholder="Your answer..."
                    value={securityAnswer1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecurityAnswer1(e.target.value)}
                    className="text-base h-12 border-2"
                  />
                </div>

                {/* Question 2 */}
                <div className="space-y-2">
                  <Label htmlFor="sq2" className="text-lg font-semibold">Question 2</Label>
                  <Select value={securityQuestion2} onValueChange={setSecurityQuestion2}>
                    <SelectTrigger className="text-base h-12 border-2">
                      <SelectValue placeholder="Select a question..." />
                    </SelectTrigger>
                    <SelectContent>
                      {securityQuestions?.filter((q: string) => q !== securityQuestion1).map((q: string) => (
                        <SelectItem key={q} value={q} className="text-base">
                          {q}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <Input
                    id="sq2"
                    type="text"
                    placeholder="Your answer..."
                    value={securityAnswer2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSecurityAnswer2(e.target.value)}
                    className="text-base h-12 border-2"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <div className="flex gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => setCurrentRound(TOTAL_ROUNDS + 1)}
                    className="flex-1 h-14 text-lg"
                  >
                    Back
                  </Button>
                  <Button
                    size="lg"
                    onClick={handleSubmit}
                    disabled={isSubmitting || !securityQuestion1 || !securityQuestion2 || !securityAnswer1.trim() || !securityAnswer2.trim()}
                    className="flex-1 h-14 text-lg gap-2"
                  >
                    {isSubmitting ? "Creating..." : "Create Password"}
                    <Check className="w-6 h-6" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
