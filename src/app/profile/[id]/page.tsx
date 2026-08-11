import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ShieldCheck, MapPin, Briefcase, GraduationCap, Heart, MessageCircle, ArrowLeft, Image as ImageIcon } from "lucide-react";

export default function ProfilePage({ params }: { params: { id: string } }) {
  // Mock data for the profile
  const profile = {
    id: params.id,
    name: "Priya Sharma",
    age: 26,
    height: "5'5\" (165 cm)",
    location: "Mumbai, Maharashtra, India",
    education: "MBA in Marketing",
    profession: "Marketing Manager at Tech Corp",
    community: "Hindu - Brahmin",
    verified: true,
    about: "I am a career-oriented person who values family and traditions. Looking for someone who is understanding, supportive, and shares similar values. In my free time, I love traveling, reading, and trying out new cuisines.",
    primaryImage: "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80"
  };

  return (
    <div className="min-h-screen bg-muted/30 pb-24">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur px-4 h-16 flex items-center">
        <Link href="/browse" className="flex items-center gap-2 text-secondary hover:text-primary transition-colors">
          <ArrowLeft className="h-5 w-5" />
          <span className="font-medium">Back to Matches</span>
        </Link>
      </header>

      <main className="container max-w-5xl mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Left Column - Photo */}
          <div className="w-full md:w-1/3 space-y-4">
            <div className="relative rounded-2xl overflow-hidden aspect-[3/4] shadow-xl shadow-black/10 border-4 border-background">
              <img src={profile.primaryImage} alt={profile.name} className="object-cover w-full h-full" />
              <div className="absolute bottom-4 left-4 bg-background/80 backdrop-blur rounded-full px-3 py-1.5 flex items-center gap-1 text-sm font-semibold text-primary">
                <ShieldCheck className="h-4 w-4" />
                100% Verified
              </div>
            </div>
            {/* Photo Gallery Strip */}
            <div className="grid grid-cols-3 gap-2">
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/80">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/80">
                <ImageIcon className="h-6 w-6" />
              </div>
              <div className="aspect-square rounded-lg bg-muted flex items-center justify-center text-muted-foreground cursor-pointer hover:bg-muted/80">
                <span className="text-sm font-medium">+3 Photos</span>
              </div>
            </div>
          </div>

          {/* Right Column - Details */}
          <div className="w-full md:w-2/3 space-y-8">
            <div>
              <h1 className="text-4xl font-bold font-serif text-secondary mb-2">{profile.name}</h1>
              <p className="text-lg text-foreground/80">{profile.age} yrs • {profile.height} • {profile.community}</p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="bg-primary text-primary-foreground hover:bg-primary/90 h-12 px-8 rounded-full shadow-lg shadow-primary/20">
                <Heart className="mr-2 h-5 w-5" /> Send Interest
              </Button>
              <Button size="lg" variant="outline" className="border-secondary text-secondary hover:bg-secondary hover:text-white h-12 px-8 rounded-full">
                <MessageCircle className="mr-2 h-5 w-5" /> Chat Now
              </Button>
            </div>

            <Card className="border-muted shadow-sm">
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-secondary mb-4">About Me</h2>
                <p className="text-foreground/80 leading-relaxed">{profile.about}</p>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-muted shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-secondary border-b border-border pb-2 flex items-center gap-2">
                    <GraduationCap className="h-5 w-5 text-primary" /> Education & Career
                  </h3>
                  <div className="space-y-3 text-sm text-foreground/80">
                    <div>
                      <p className="font-medium text-foreground">Education</p>
                      <p>{profile.education}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Profession</p>
                      <p>{profile.profession}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-muted shadow-sm">
                <CardContent className="p-6 space-y-4">
                  <h3 className="font-semibold text-secondary border-b border-border pb-2 flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-primary" /> Location & Lifestyle
                  </h3>
                  <div className="space-y-3 text-sm text-foreground/80">
                    <div>
                      <p className="font-medium text-foreground">Current Location</p>
                      <p>{profile.location}</p>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">Diet</p>
                      <p>Vegetarian</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>
      
      {/* Mobile Sticky Actions */}
      <div className="fixed bottom-0 left-0 right-0 p-4 bg-background border-t border-border md:hidden z-50 flex gap-2">
        <Button className="flex-1 bg-primary text-primary-foreground">
          Send Interest
        </Button>
        <Button variant="outline" className="flex-1 border-secondary text-secondary hover:bg-secondary hover:text-white">
          <MessageCircle className="mr-2 h-4 w-4" /> Chat
        </Button>
      </div>
    </div>
  );
}
