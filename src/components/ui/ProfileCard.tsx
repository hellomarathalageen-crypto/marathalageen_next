import Link from "next/link";
import { MapPin, Briefcase, GraduationCap, Ruler, Heart } from "lucide-react";
import Image from "next/image";

interface ProfileCardProps {
  id: string;
  name: string;
  age: number;
  height: string;
  city: string;
  state: string;
  education: string;
  profession: string;
  imageUrl?: string;
}

export function ProfileCard({ id, name, age, height, city, state, education, profession, imageUrl }: ProfileCardProps) {
  return (
    <div className="bg-white rounded-2xl overflow-hidden shadow-md shadow-[#DB1866]/5 border border-gray-100 hover:shadow-xl hover:shadow-[#DB1866]/10 transition-all duration-300 group">
      <div className="relative h-64 w-full bg-gray-100 overflow-hidden">
        {imageUrl ? (
          <Image src={imageUrl} alt={name} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <span className="text-4xl font-sans text-gray-300">{name.charAt(0)}</span>
          </div>
        )}
        <div className="absolute top-3 right-3 bg-white/90 backdrop-blur p-2 rounded-full shadow-sm text-gray-400 hover:text-[#DB1866] cursor-pointer transition-colors z-10">
          <Heart className="w-5 h-5" />
        </div>
        <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
      </div>

      <div className="p-5">
        <h3 className="text-xl font-bold font-sans text-[#2A3773] mb-1 truncate">{name}</h3>
        <div className="flex items-center text-sm text-gray-500 mb-4 gap-2">
          <span>{age} Yrs</span>
          <span className="w-1 h-1 bg-gray-300 rounded-full"></span>
          <span className="flex items-center gap-1"><Ruler className="w-3.5 h-3.5" /> {height}</span>
        </div>

        <div className="space-y-2 mb-6">
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <MapPin className="w-4 h-4 text-[#DB1866]/70" />
            <span className="truncate">{city}, {state}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <GraduationCap className="w-4 h-4 text-[#DB1866]/70" />
            <span className="truncate">{education}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <Briefcase className="w-4 h-4 text-[#DB1866]/70" />
            <span className="truncate">{profession}</span>
          </div>
        </div>

        <Link 
          href={`/profile/${id}`}
          className="block w-full text-center py-2.5 rounded-xl text-[#DB1866] font-bold bg-[#FFF1F5] hover:bg-[#DB1866] hover:text-white transition-colors"
        >
          View Full Profile
        </Link>
      </div>
    </div>
  );
}
