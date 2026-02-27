import { useState, useEffect } from "react";
import * as React from "react";
import { useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { toast } from "sonner";
import { Loader2, KeyRound, ArrowLeft } from "lucide-react";
import type { AnimalImage } from "@shared/animals";

export default function RecoverPassword() {
  const [, setLocation] = useLocation();
  const [step, setStep] = useState<"username" | "questions" | "reset" | "success">("username");
  const [username, setUsername] = useState("");
  const [storedQuestion1, setStoredQuestion1] = useState("");
  const [storedQuestion2, setStoredQuestion2] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [error, setError] = useState("");
  const [selectedImages, setSelectedImages] = useState<string[]>([]);
  const [currentRound, setCurrentRound] = useState(0);
  const [gridAnimals, setGridAnimals] = useState<AnimalImage[]>([]);

  const checkUserQuestions = trpc.graphicalAuth.getUserSecurityQuestions.useQuery(
    { username },
    { enabled: false } // Only query when we trigger it
  );
  const verifyAnswers = trpc.graphicalAuth.verifySecurityAnswers.useMutation();
  const resetPassword = trpc.graphicalAuth.resetPassword.useMutation();
  const getGridAnimals = trpc.graphicalAuth.getGridAnimals.useQuery(
    { count: 25, excludeIds: selectedImages },
    { enabled: step === "reset" && currentRound < 4 }
  );

  // Load grid animals when data is available
  useEffect(() => {
    if (getGridAnimals.data && step === "reset") {
      setGridAnimals(getGridAnimals.data);
    }
  }, [getGridAnimals.data, step, currentRound]);

  const handleUsernameSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) {
      setError("Please enter your username");
      return;
    }

    setError("");
    // Fetch the user's security questions
    try {
      const result = await checkUserQuestions.refetch();
      const data = result.data;

      if (!data?.found) {
        setError("Username not found. Please check and try again.");
        return;
      }

      if (!data.hasSecurityQuestions) {
        setError("No security questions were set for this account. Password recovery is not available.");
        return;
      }

      setStoredQuestion1(data.question1 || "");
      setStoredQuestion2(data.question2 || "");
      setStep("questions");
    } catch (err) {
      setError("An error occurred. Please try again.");
    }
  };

  const handleAnswersSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!answer1.trim() || !answer2.trim()) {
      setError("Please answer both security questions");
      return;
    }

    setError("");
    try {
      const result = await verifyAnswers.mutateAsync({
        username,
        answer1: answer1.trim(),
        answer2: answer2.trim(),
      });

      if (result.success) {
        toast.success("✅ Security questions verified!");
        setStep("reset");
        setSelectedImages([]);
        setCurrentRound(0);
      } else {
        setError(result.error || "Incorrect answers. Please try again.");
      }
    } catch (err) {
      setError("Failed to verify answers. Please try again.");
    }
  };

  const handleAnimalSelect = (animalId: string) => {
    const newSelected = [...selectedImages, animalId];
    setSelectedImages(newSelected);

    if (newSelected.length === 4) {
      // All rounds complete, reset password
      handlePasswordReset(newSelected);
    } else {
      // Move to next round
      setCurrentRound(currentRound + 1);
      setGridAnimals([]);
    }
  };

  const handlePasswordReset = async (images: string[]) => {
    try {
      const result = await resetPassword.mutateAsync({
        username,
        newSelectedImages: images,
      });

      if (result.success) {
        toast.success("🎉 Password reset successfully!");
        setStep("success");
      } else {
        setError(result.error || "Failed to reset password");
        setSelectedImages([]);
        setCurrentRound(0);
        setGridAnimals([]);
      }
    } catch (err) {
      setError("Failed to reset password. Please try again.");
      setSelectedImages([]);
      setCurrentRound(0);
      setGridAnimals([]);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/10 via-background to-secondary/10 py-8">
      <div className="container max-w-4xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <Button
            variant="ghost"
            size="lg"
            onClick={() => {
              if (step === "username") setLocation("/login");
              else if (step === "questions") setStep("username");
              else if (step === "reset" && currentRound === 0) setStep("questions");
            }}
            className="gap-2"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Button>
          <div className="flex items-center gap-3">
            <KeyRound className="w-8 h-8 text-primary" />
            <h1 className="text-2xl font-bold">Recover Password</h1>
          </div>
          <div className="w-24" />
        </div>

        {/* Step Indicator */}
        <div className="text-center mb-6">
          <p className="text-lg text-muted-foreground">
            {step === "username" && "Enter your username to start recovery"}
            {step === "questions" && "Answer your security questions"}
            {step === "reset" && `Choose your new password animals (Round ${currentRound + 1}/4)`}
            {step === "success" && "Password reset successful!"}
          </p>
        </div>

        {/* Username Step */}
        {step === "username" && (
          <Card className="border-4 border-primary/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Enter Username 👤</CardTitle>
              <CardDescription className="text-lg">
                We'll verify your identity with your security questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleUsernameSubmit} className="max-w-md mx-auto space-y-4">
                <div>
                  <Label htmlFor="username" className="text-lg">Username</Label>
                  <Input
                    id="username"
                    type="text"
                    value={username}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value.toLowerCase())}
                    placeholder="Enter your username"
                    className="text-xl h-14 text-center border-4"
                    maxLength={20}
                  />
                </div>
                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-xl h-14"
                  disabled={checkUserQuestions.isFetching}
                >
                  {checkUserQuestions.isFetching ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Checking...
                    </>
                  ) : (
                    "Continue"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Security Questions Step */}
        {step === "questions" && (
          <Card className="border-4 border-secondary/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Answer Your Questions 🔐</CardTitle>
              <CardDescription className="text-lg">
                Answer the questions you set up when you created your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleAnswersSubmit} className="max-w-lg mx-auto space-y-6">
                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Question 1</Label>
                  <div className="p-3 bg-muted rounded-lg text-base font-medium">
                    {storedQuestion1}
                  </div>
                  <Input
                    type="text"
                    value={answer1}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer1(e.target.value)}
                    placeholder="Your answer..."
                    className="text-base h-12 border-2"
                  />
                </div>

                <div className="space-y-2">
                  <Label className="text-lg font-semibold">Question 2</Label>
                  <div className="p-3 bg-muted rounded-lg text-base font-medium">
                    {storedQuestion2}
                  </div>
                  <Input
                    type="text"
                    value={answer2}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAnswer2(e.target.value)}
                    placeholder="Your answer..."
                    className="text-base h-12 border-2"
                  />
                </div>

                {error && (
                  <Alert variant="destructive">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}

                <Button
                  type="submit"
                  size="lg"
                  className="w-full text-xl h-14"
                  disabled={verifyAnswers.isPending || !answer1.trim() || !answer2.trim()}
                >
                  {verifyAnswers.isPending ? (
                    <>
                      <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                      Verifying...
                    </>
                  ) : (
                    "Verify Answers"
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        )}

        {/* Password Reset Step - Animal Selection */}
        {step === "reset" && (
          <Card className="border-4 border-accent/50">
            <CardHeader className="text-center">
              <CardTitle className="text-3xl mb-2">Choose New Password 🎨</CardTitle>
              <CardDescription className="text-lg">
                Select one animal in each round (Round {currentRound + 1} of 4)
              </CardDescription>
            </CardHeader>
            <CardContent>
              {getGridAnimals.isLoading ? (
                <div className="flex items-center justify-center py-12">
                  <Loader2 className="w-12 h-12 animate-spin text-primary" />
                </div>
              ) : (
                <div className="animal-grid">
                  {gridAnimals.map((animal: AnimalImage) => (
                    <button
                      key={animal.id}
                      onClick={() => handleAnimalSelect(animal.id)}
                      className="animal-card"
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

              {error && (
                <Alert variant="destructive" className="mt-4">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              {/* Progress Indicator */}
              <div className="mt-6 flex justify-center gap-2">
                {[0, 1, 2, 3].map((round) => (
                  <div
                    key={round}
                    className={`progress-dot ${round < currentRound
                      ? "completed"
                      : round === currentRound
                        ? "active"
                        : ""
                      }`}
                  />
                ))}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Success Step */}
        {step === "success" && (
          <Card className="border-4 border-accent">
            <CardHeader className="text-center">
              <div className="text-6xl mb-4">✅</div>
              <CardTitle className="text-3xl mb-2">Password Reset!</CardTitle>
              <CardDescription className="text-lg">
                Your new graphical password has been saved successfully
              </CardDescription>
            </CardHeader>
            <CardContent className="text-center">
              <Button
                size="lg"
                onClick={() => setLocation("/login")}
                className="text-xl h-14 gap-2"
              >
                Go to Login
              </Button>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}
