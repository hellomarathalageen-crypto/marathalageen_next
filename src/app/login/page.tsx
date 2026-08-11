import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Heart className="h-8 w-8 text-primary" fill="currentColor" />
        <span className="text-2xl font-bold font-serif text-secondary">Matrimony</span>
      </Link>
      
      <Card className="w-full max-w-md shadow-xl shadow-black/5 border-muted border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-secondary">Welcome back</CardTitle>
          <CardDescription className="text-center">
            Enter your email and password to access your account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required className="border-muted bg-background focus-visible:ring-primary" />
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label htmlFor="password">Password</Label>
              <Link href="#" className="text-sm font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
            <Input id="password" type="password" required className="border-muted bg-background focus-visible:ring-primary" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base">
            Log in
          </Button>
          <div className="text-center text-sm text-foreground/70">
            Don&apos;t have an account?{" "}
            <Link href="/signup" className="text-primary font-medium hover:underline">
              Create Profile
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
