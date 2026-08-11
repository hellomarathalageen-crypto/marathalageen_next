import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ShieldCheck, MapPin, Briefcase, GraduationCap, Heart } from "lucide-react";

export default function BrowsePage() {
  const matches = [
    {
      id: 1,
      name: "Priya Sharma",
      age: 26,
      height: "5'5\"",
      location: "Mumbai, Maharashtra",
      education: "MBA, Marketing",
      profession: "Marketing Manager",
      community: "Hindu",
      verified: true,
      image: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80"
    },
    {
      id: 2,
      name: "Aarti Desai",
      age: 28,
      height: "5'4\"",
      location: "Pune, Maharashtra",
      education: "B.Tech, Computer Science",
      profession: "Software Engineer",
      community: "Hindu",
      verified: true,
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80"
    },
    {
      id: 3,
      name: "Meera Patel",
      age: 27,
      height: "5'6\"",
      location: "Ahmedabad, Gujarat",
      education: "CA",
      profession: "Financial Analyst",
      community: "Hindu - Patel",
      verified: true,
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur px-4 md:px-8 flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Heart className="h-6 w-6 text-primary" fill="currentColor" />
          <span className="text-xl font-bold font-serif text-secondary">Matrimony</span>
        </Link>
        <div className="flex items-center gap-4">
          <div className="h-8 w-8 rounded-full bg-muted overflow-hidden border border-border">
            {/* User Avatar Placeholder */}
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        {/* Left Sidebar - Filters */}
        <aside className="w-full md:w-64 space-y-6">
          <h2 className="font-semibold text-lg text-secondary border-b border-border pb-2">Filters</h2>
          
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="text-foreground/70">Age Range</Label>
              <div className="flex items-center gap-2">
                <Input type="number" placeholder="20" className="w-full bg-muted/50 border-0" />
                <span className="text-muted-foreground">to</span>
                <Input type="number" placeholder="35" className="w-full bg-muted/50 border-0" />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/70">Location</Label>
              <Input type="text" placeholder="e.g. Mumbai" className="bg-muted/50 border-0" />
            </div>

            <div className="space-y-2">
              <Label className="text-foreground/70">Community</Label>
              <select className="w-full h-10 px-3 rounded-md bg-muted/50 border-0 focus:ring-2 focus:ring-primary text-sm text-foreground">
                <option value="">Any</option>
                <option value="hindu">Hindu</option>
                <option value="muslim">Muslim</option>
              </select>
            </div>
            
            <Button className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90">
              Apply Filters
            </Button>
          </div>
        </aside>

        {/* Main Content - Results */}
        <main className="flex-1">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold font-serif text-secondary">Matches for you</h1>
            <span className="text-sm text-muted-foreground">Showing {matches.length} profiles</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {matches.map((profile) => (
              <Card key={profile.id} className="overflow-hidden border-muted border shadow-lg hover:shadow-xl transition-shadow bg-card">
                <div className="relative h-64 w-full">
                  <img src={profile.image} alt={profile.name} className="object-cover w-full h-full" />
                  <div className="absolute top-2 right-2 bg-background/80 backdrop-blur rounded-full px-2 py-1 flex items-center gap-1 text-xs font-semibold text-primary">
                    <ShieldCheck className="h-3 w-3" />
                    Verified
                  </div>
                </div>
                <CardContent className="p-4 space-y-3">
                  <div className="flex justify-between items-start">
                    <div>
                      <Link href={`/profile/${profile.id}`} className="font-bold text-lg text-secondary hover:text-primary transition-colors">
                        {profile.name}
                      </Link>
                      <p className="text-sm text-muted-foreground">{profile.age} yrs, {profile.height}, {profile.community}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-1 text-sm text-foreground/80">
                    <div className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-primary" />
                      <span>{profile.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <GraduationCap className="h-4 w-4 text-primary" />
                      <span>{profile.education}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Briefcase className="h-4 w-4 text-primary" />
                      <span>{profile.profession}</span>
                    </div>
                  </div>

                  <div className="pt-3 flex gap-2 border-t border-border mt-4">
                    <Button className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90">
                      Send Interest
                    </Button>
                    <Button variant="outline" className="px-3 border-secondary text-secondary hover:bg-secondary hover:text-white">
                      <Heart className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
