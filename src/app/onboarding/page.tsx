import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function OnboardingPage() {
  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4">
      <div className="container max-w-2xl mx-auto">
        <div className="mb-8">
          <div className="flex items-center justify-between text-sm font-medium text-foreground/70 mb-2">
            <span>Personal Info</span>
            <span>Step 1 of 4</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div className="bg-primary h-2 rounded-full w-1/4"></div>
          </div>
        </div>

        <Card className="shadow-xl shadow-black/5 border-muted border-2">
          <CardHeader>
            <CardTitle className="text-2xl font-serif text-secondary">Let's get to know you</CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="gender">Gender</Label>
              <select id="gender" className="w-full h-10 px-3 rounded-md bg-background border border-muted focus:ring-2 focus:ring-primary text-sm">
                <option value="">Select gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="dob">Date of Birth</Label>
              <Input id="dob" type="date" className="border-muted bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="height">Height (cm)</Label>
              <Input id="height" type="number" placeholder="170" className="border-muted bg-background" />
            </div>

            <div className="space-y-2">
              <Label htmlFor="community">Community / Religion</Label>
              <select id="community" className="w-full h-10 px-3 rounded-md bg-background border border-muted focus:ring-2 focus:ring-primary text-sm">
                <option value="">Select community</option>
                <option value="hindu">Hindu</option>
                <option value="muslim">Muslim</option>
                <option value="christian">Christian</option>
                <option value="sikh">Sikh</option>
              </select>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Button variant="ghost" disabled>Back</Button>
            <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">Next Step</Button>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}
