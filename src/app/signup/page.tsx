import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart } from "lucide-react";

export default function SignupPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-muted/30 px-4 py-12">
      <Link href="/" className="flex items-center gap-2 mb-8">
        <Heart className="h-8 w-8 text-primary" fill="currentColor" />
        <span className="text-2xl font-bold font-serif text-secondary">Matrimony</span>
      </Link>
      
      <Card className="w-full max-w-md shadow-xl shadow-black/5 border-muted border-2">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center text-secondary">Create your profile</CardTitle>
          <CardDescription className="text-center">
            Join thousands of trusted families finding their perfect match.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" placeholder="John" required className="border-muted bg-background focus-visible:ring-primary" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" placeholder="Doe" required className="border-muted bg-background focus-visible:ring-primary" />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="m@example.com" required className="border-muted bg-background focus-visible:ring-primary" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input id="password" type="password" required className="border-muted bg-background focus-visible:ring-primary" />
          </div>
        </CardContent>
        <CardFooter className="flex flex-col space-y-4">
          <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 h-11 text-base">
            Create Account
          </Button>
          <div className="text-center text-sm text-foreground/70">
            Already have an account?{" "}
            <Link href="/login" className="text-primary font-medium hover:underline">
              Log in
            </Link>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
