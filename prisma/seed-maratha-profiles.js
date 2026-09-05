const { PrismaClient } = require("@prisma/client");
const { Pool } = require("pg");
const { PrismaPg } = require("@prisma/adapter-pg");
const bcrypt = require("bcryptjs");
require("dotenv").config();

const connectionString = process.env.DATABASE_URL;
const pool = new Pool({
  connectionString,
  ssl: { rejectUnauthorized: false },
});
const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

const femalePortraits = [
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1502685104226-ee32379fefbe?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1567532939604-b6b5b0db2604?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1548142813-c348350df52b?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1521566652839-697aa473761a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1509967419530-da38b4704bc6?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1534751516642-a1714f5a596a?auto=format&fit=crop&q=80&w=600",
];

const malePortraits = [
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1492562080023-ab3db95bfbce?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1513956589380-bad6acb9b9d4?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1463453091185-61582044d556?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1531891437562-4301cf092a93?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=600",
  "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=600",
];

const seedCandidates = [
  // BRIDES (Female)
  {
    firstName: "Pooja",
    lastName: "Deshmukh",
    gender: "Female",
    age: 26,
    height: "5'4\"",
    maritalStatus: "Never Married",
    city: "Belagavi",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "कळंब (Kalamb)",
    gotra: "भारद्वाज (Bharadwaj)",
    kuldaivat: "तुळजापूर भवानी (Bhavani Tuljapur)",
    nativePlace: "Belagavi, Karnataka",
    rashi: "कर्क (Kark)",
    nakshatra: "पुष्य (Pushya)",
    manglik: "Non-Manglik",
    education: "B.E. Computer Science",
    college: "KLE Technological University, Belagavi",
    profession: "Senior Software Engineer",
    company: "Infosys Bangalore",
    annualIncome: "15L - 25L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Retired Executive Engineer, PWD Belagavi",
    motherOccupation: "Principal, Govt High School",
    brothersCount: 1,
    brothersMarried: 0,
    sistersCount: 0,
    about: "Warm, family-oriented, and ambitious software engineer. Born and raised in Belagavi, now working in Bengaluru. Looking for a progressive, well-educated Maratha gentleman with strong family values.",
    isVerified: true
  },
  {
    firstName: "Anjali",
    lastName: "Patil",
    gender: "Female",
    age: 27,
    height: "5'5\"",
    maritalStatus: "Never Married",
    city: "Bengaluru",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "पंचपल्लव (Panchpallav)",
    gotra: "कश्यप (Kashyap)",
    kuldaivat: "खंडोबा (Jejuri)",
    nativePlace: "Nipani, Belagavi",
    rashi: "सिंह (Simha)",
    nakshatra: "मघा (Magha)",
    manglik: "Non-Manglik",
    education: "MBA (Finance) & CFA",
    college: "IIM Bangalore (Exec) / Christ University",
    profession: "Investment Analyst",
    company: "Goldman Sachs Bengaluru",
    annualIncome: "25L - 40L",
    diet: "Eggetarian",
    familyType: "Nuclear",
    fatherOccupation: "Senior Advocate, High Court of Karnataka",
    motherOccupation: "Homemaker",
    brothersCount: 0,
    sistersCount: 1,
    sistersMarried: 1,
    about: "Believes in a healthy balance between modern career aspirations and cultural roots. Enjoys classical music, traveling, and weekend badminton. Seeking a supportive life partner.",
    isVerified: true
  },
  {
    firstName: "Sneha",
    lastName: "Jadhav",
    gender: "Female",
    age: 25,
    height: "5'3\"",
    maritalStatus: "Never Married",
    city: "Hubballi",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "सूर्यकांत (Suryakant)",
    gotra: "कौंडिन्य (Kaundinya)",
    kuldaivat: "महालक्ष्मी (Kolhapur)",
    nativePlace: "Dharwad, Karnataka",
    rashi: "वृषभ (Vrishabh)",
    nakshatra: "रोहिणी (Rohini)",
    manglik: "Non-Manglik",
    education: "MBBS, MD Paediatrics",
    college: "KIMS Hubballi",
    profession: "Paediatrician / Doctor",
    company: "KIMS Hospital Hubballi",
    annualIncome: "18L - 30L",
    diet: "Vegetarian",
    familyType: "Joint",
    fatherOccupation: "Businessman & Agricultural Landowner",
    motherOccupation: "Homemaker",
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 0,
    about: "Passionate doctor with deep compassion for children. Comes from a well-respected joint Maratha family in Hubballi. Looking for an educated, caring life partner.",
    isVerified: true
  },
  {
    firstName: "Rutuja",
    lastName: "Shinde",
    gender: "Female",
    age: 28,
    height: "5'6\"",
    maritalStatus: "Never Married",
    city: "Pune",
    state: "Maharashtra",
    community: "96 Kuli Maratha",
    devak: "गरुड (Garud)",
    gotra: "वसिष्ठ (Vashistha)",
    kuldaivat: "जोतिबा (Jyotiba Kolhapur)",
    nativePlace: "Satara, Maharashtra",
    rashi: "कन्या (Kanya)",
    nakshatra: "हस्त (Hasta)",
    manglik: "Anshik Manglik",
    education: "Chartered Accountant (CA)",
    college: "ICAI Pune",
    profession: "Senior Audit Manager",
    company: "Deloitte India",
    annualIncome: "20L - 35L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Civil Contractor & Builder",
    motherOccupation: "Lecturer in Economics",
    brothersCount: 1,
    brothersMarried: 0,
    sistersCount: 0,
    about: "Independent, cheerful, and driven CA. Open to relocation to Bengaluru, Pune, or Mumbai. Looking for a progressive life partner who respects mutual career growth.",
    isVerified: true
  },
  {
    firstName: "Shraddha",
    lastName: "Bhosale",
    gender: "Female",
    age: 24,
    height: "5'4\"",
    maritalStatus: "Never Married",
    city: "Kolhapur",
    state: "Maharashtra",
    community: "96 Kuli Maratha",
    devak: "सूर्यकांत (Suryakant)",
    gotra: "विश्वामित्र (Vishwamitra)",
    kuldaivat: "अंबाबाई महालक्ष्मी (Kolhapur)",
    nativePlace: "Kolhapur, Maharashtra",
    rashi: "धनु (Dhanu)",
    nakshatra: "पूर्वाषाढा (Purvashada)",
    manglik: "Non-Manglik",
    education: "B.Arch (Architecture)",
    college: "DY Patil College of Architecture",
    profession: "Architect & Interior Designer",
    company: "Studio Shrishti Designs",
    annualIncome: "10L - 18L",
    diet: "Non-Veg",
    familyType: "Joint",
    fatherOccupation: "Sugar Factory Director & Landowner",
    motherOccupation: "Homemaker",
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 1,
    sistersMarried: 0,
    about: "Creative architect passionate about sustainable heritage design. Values family gatherings, Maharashtrian culture, and honest companionship.",
    isVerified: true
  },
  {
    firstName: "Aishwarya",
    lastName: "More",
    gender: "Female",
    age: 27,
    height: "5'5\"",
    maritalStatus: "Never Married",
    city: "Dharwad",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "कळंब (Kalamb)",
    gotra: "भारद्वाज (Bharadwaj)",
    kuldaivat: "भवानी (Tuljapur)",
    nativePlace: "Dharwad, Karnataka",
    rashi: "मीन (Meen)",
    nakshatra: "रेवती (Revati)",
    manglik: "Non-Manglik",
    education: "M.Tech in VLSI Design",
    college: "BVB College of Engineering, Hubli",
    profession: "Chip Design Engineer",
    company: "Intel Technology Bengaluru",
    annualIncome: "22L - 35L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Assistant Commissioner (Revenue Dept)",
    motherOccupation: "High School Headmistress",
    brothersCount: 0,
    sistersCount: 1,
    sistersMarried: 0,
    about: "Enthusiastic semiconductor engineer residing in Bangalore. Deeply attached to traditional Maratha values with an open mindset. Seeking a like-minded professional.",
    isVerified: true
  },
  {
    firstName: "Priyanka",
    lastName: "Kadam",
    gender: "Female",
    age: 29,
    height: "5'4\"",
    maritalStatus: "Never Married",
    city: "Bengaluru",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "पंचपल्लव (Panchpallav)",
    gotra: "अत्री (Atri)",
    kuldaivat: "खंडोबा (Jejuri)",
    nativePlace: "Nipani, Karnataka",
    rashi: "मकर (Makar)",
    nakshatra: "उत्तराषाढा (Uttarashada)",
    manglik: "Non-Manglik",
    education: "MS in Data Science",
    college: "BITS Pilani",
    profession: "Lead Data Scientist",
    company: "Amazon Development Centre",
    annualIncome: "35L - 50L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Retired General Manager, Canara Bank",
    motherOccupation: "Homemaker",
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 0,
    about: "Enjoys reading, trekking in the Western Ghats, and mentoring young techies. Looking for an intelligent, grounded companion who values mutual respect.",
    isVerified: true
  },
  {
    firstName: "Sakshi",
    lastName: "Pawar",
    gender: "Female",
    age: 26,
    height: "5'2\"",
    maritalStatus: "Never Married",
    city: "Belagavi",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "सूर्यकांत (Suryakant)",
    gotra: "कश्यप (Kashyap)",
    kuldaivat: "रेणुका देवी (Mahur)",
    nativePlace: "Khanapur, Belagavi",
    rashi: "मेष (Mesh)",
    nakshatra: "अश्विनी (Ashwini)",
    manglik: "Non-Manglik",
    education: "B.Com, MBA (HR)",
    college: "Gogte College of Commerce, Belagavi",
    profession: "HR Business Partner",
    company: "Wipro Technologies",
    annualIncome: "10L - 16L",
    diet: "Non-Veg",
    familyType: "Joint",
    fatherOccupation: "Automobile Dealership Owner",
    motherOccupation: "Homemaker",
    brothersCount: 2,
    brothersMarried: 1,
    sistersCount: 0,
    about: "Cheerful and loving individual who cherishes festival celebrations and family time. Seeking an affectionate Maratha partner who values family unity.",
    isVerified: true
  },

  // GROOMS (Male)
  {
    firstName: "Aditya",
    lastName: "Patil",
    gender: "Male",
    age: 29,
    height: "5'11\"",
    maritalStatus: "Never Married",
    city: "Bengaluru",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "कळंब (Kalamb)",
    gotra: "भारद्वाज (Bharadwaj)",
    kuldaivat: "भवानी माता (Tuljapur)",
    nativePlace: "Belagavi, Karnataka",
    rashi: "सिंह (Simha)",
    nakshatra: "उत्तरा फाल्गुनी (Uttara Phalguni)",
    manglik: "Non-Manglik",
    education: "B.E. (Mech), MS in Automotive Engineering",
    college: "RWTH Aachen Germany / RVCE Bangalore",
    profession: "Engineering Manager",
    company: "Mercedes-Benz R&D India",
    annualIncome: "30L - 45L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Class-I Civil Contractor, Karnataka Govt",
    motherOccupation: "Homemaker",
    brothersCount: 1,
    brothersMarried: 0,
    sistersCount: 0,
    about: "Passionate about automotive innovation, fitness, and weekend cycling. Raised with rich Maratha cultural traditions. Looking for a well-educated, cultured life partner.",
    isVerified: true
  },
  {
    firstName: "Rahul",
    lastName: "Deshmukh",
    gender: "Male",
    age: 30,
    height: "6'0\"",
    maritalStatus: "Never Married",
    city: "Belagavi",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "सूर्यकांत (Suryakant)",
    gotra: "कश्यप (Kashyap)",
    kuldaivat: "खंडोबा (Jejuri)",
    nativePlace: "Belagavi, Karnataka",
    rashi: "तुला (Tula)",
    nakshatra: "स्वाती (Swati)",
    manglik: "Non-Manglik",
    education: "B.E. Civil, M.Tech (Structures)",
    college: "KLE Tech Hubli",
    profession: "Managing Director & Civil Contractor",
    company: "Deshmukh Infra & Projects",
    annualIncome: "40L - 60L",
    diet: "Non-Veg",
    familyType: "Joint",
    fatherOccupation: "Former Zilla Panchayat President & Landowner",
    motherOccupation: "Social Worker & Homemaker",
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 1,
    sistersMarried: 1,
    about: "Managing the family construction enterprise across Belagavi and Goa. Grounded, humble, and deeply respect elders. Looking for a cultured bride to share life with.",
    isVerified: true
  },
  {
    firstName: "Vikram",
    lastName: "Shinde",
    gender: "Male",
    age: 28,
    height: "5'10\"",
    maritalStatus: "Never Married",
    city: "Pune",
    state: "Maharashtra",
    community: "96 Kuli Maratha",
    devak: "गरुड (Garud)",
    gotra: "वसिष्ठ (Vashistha)",
    kuldaivat: "जोतिबा (Jyotiba)",
    nativePlace: "Satara, Maharashtra",
    rashi: "मेष (Mesh)",
    nakshatra: "भरणी (Bharani)",
    manglik: "Non-Manglik",
    education: "B.Tech Computer Science",
    college: "COEP Pune",
    profession: "Senior Staff Software Engineer",
    company: "Google India",
    annualIncome: "50L - 75L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Retired Deputy Collector, Govt of Maharashtra",
    motherOccupation: "Professor of Botany",
    brothersCount: 0,
    sistersCount: 1,
    sistersMarried: 1,
    about: "Curious technologist who enjoys mountain hiking, reading history books, and photography. Looking for an ambitious, broad-minded partner with strong family bonds.",
    isVerified: true
  },
  {
    firstName: "Prashant",
    lastName: "Chavan",
    gender: "Male",
    age: 31,
    height: "5'9\"",
    maritalStatus: "Never Married",
    city: "Hubballi",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "पंचपल्लव (Panchpallav)",
    gotra: "कौंडिन्य (Kaundinya)",
    kuldaivat: "महालक्ष्मी (Kolhapur)",
    nativePlace: "Dharwad, Karnataka",
    rashi: "वृश्चिक (Vrishchik)",
    nakshatra: "अनुराधा (Anuradha)",
    manglik: "Non-Manglik",
    education: "MBBS, MS Orthopaedics",
    college: "SDM Medical College Dharwad",
    profession: "Consultant Orthopaedic Surgeon",
    company: "Suchirayu Super Speciality Hospital",
    annualIncome: "35L - 55L",
    diet: "Non-Veg",
    familyType: "Joint",
    fatherOccupation: "Distinguished Pediatrician (MD)",
    motherOccupation: "Gynecologist (MS)",
    brothersCount: 1,
    brothersMarried: 0,
    sistersCount: 0,
    about: "Dedicated surgeon from a family of medical professionals in Hubballi-Dharwad. Enjoys tennis, road trips, and philanthropy. Seeking an educated, kind-hearted life partner.",
    isVerified: true
  },
  {
    firstName: "Siddharth",
    lastName: "Bhosale",
    gender: "Male",
    age: 29,
    height: "6'1\"",
    maritalStatus: "Never Married",
    city: "Kolhapur",
    state: "Maharashtra",
    community: "96 Kuli Maratha",
    devak: "सूर्यकांत (Suryakant)",
    gotra: "विश्वामित्र (Vishwamitra)",
    kuldaivat: "भवानी माता (Tuljapur)",
    nativePlace: "Kolhapur, Maharashtra",
    rashi: "कुंभ (Kumbh)",
    nakshatra: "शतभिषा (Shatabhisha)",
    manglik: "Anshik Manglik",
    education: "MBA (Marketing) & B.E.",
    college: "Symbiosis Institute of Business Management (SIBM)",
    profession: "Director, Agro-Processing & Exports",
    company: "Bhosale Agro Tech Private Ltd",
    annualIncome: "45L - 70L",
    diet: "Non-Veg",
    familyType: "Joint",
    fatherOccupation: "Sugar Mill Chairman & Senior Politician",
    motherOccupation: "Homemaker",
    brothersCount: 1,
    brothersMarried: 1,
    sistersCount: 1,
    sistersMarried: 1,
    about: "Handling family agricultural export venture. Values fitness, horse riding, and community service. Looking for a traditional yet forward-looking Maratha bride.",
    isVerified: true
  },
  {
    firstName: "Kunal",
    lastName: "Sawant",
    gender: "Male",
    age: 27,
    height: "5'10\"",
    maritalStatus: "Never Married",
    city: "Bengaluru",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "कळंब (Kalamb)",
    gotra: "भारद्वाज (Bharadwaj)",
    kuldaivat: "खंडोबा (Jejuri)",
    nativePlace: "Karwar / Belagavi",
    rashi: "मिथुन (Mithun)",
    nakshatra: "आर्द्रा (Ardra)",
    manglik: "Non-Manglik",
    education: "B.Tech & M.S. AI/ML",
    college: "PES University Bangalore",
    profession: "Product Manager (AI)",
    company: "Microsoft Bengaluru",
    annualIncome: "38L - 55L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Executive Engineer (MES / Defence)",
    motherOccupation: "Homemaker",
    brothersCount: 0,
    sistersCount: 1,
    sistersMarried: 1,
    about: "Tech enthusiast, passionate cook, and avid traveler. Looking for a modern, independent Maratha partner to explore the world and build a loving home together.",
    isVerified: true
  },
  {
    firstName: "Nikhil",
    lastName: "Pawar",
    gender: "Male",
    age: 30,
    height: "5'11\"",
    maritalStatus: "Never Married",
    city: "Dharwad",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "सूर्यकांत (Suryakant)",
    gotra: "कश्यप (Kashyap)",
    kuldaivat: "रेणुका देवी (Mahur)",
    nativePlace: "Dharwad, Karnataka",
    rashi: "धनु (Dhanu)",
    nakshatra: "मूल (Mula)",
    manglik: "Non-Manglik",
    education: "Chartered Accountant (CA) & CS",
    college: "ICAI Bangalore",
    profession: "Partner, Tax & Regulatory Advisory",
    company: "Pawar & Associates CA Firm",
    annualIncome: "30L - 50L",
    diet: "Vegetarian",
    familyType: "Nuclear",
    fatherOccupation: "Senior Chief Manager, State Bank of India",
    motherOccupation: "Senior College Professor",
    brothersCount: 1,
    brothersMarried: 0,
    sistersCount: 0,
    about: "Financial consultant based in Hubballi-Dharwad. Passionate about investments, cricket, and family life. Seeking an affectionate, well-educated Maratha girl.",
    isVerified: true
  },
  {
    firstName: "Gaurav",
    lastName: "Mohite",
    gender: "Male",
    age: 28,
    height: "6'0\"",
    maritalStatus: "Never Married",
    city: "Belagavi",
    state: "Karnataka",
    community: "96 Kuli Maratha",
    devak: "वासुकी (Vasuki)",
    gotra: "गर्ग (Garg)",
    kuldaivat: "भवानी माता (Tuljapur)",
    nativePlace: "Bailhongal, Belagavi",
    rashi: "कर्क (Kark)",
    nakshatra: "आश्लेषा (Ashlesha)",
    manglik: "Non-Manglik",
    education: "M.S. in Mechanical Design",
    college: "University of Michigan / NITK Surathkal",
    profession: "Lead EV Systems Engineer",
    company: "Tata Motors Passenger Vehicles",
    annualIncome: "28L - 42L",
    diet: "Non-Veg",
    familyType: "Nuclear",
    fatherOccupation: "Class-I Irrigation Engineer",
    motherOccupation: "Homemaker",
    brothersCount: 0,
    sistersCount: 1,
    sistersMarried: 0,
    about: "Automotive engineer working on next-gen electric vehicles. Grounded, health-conscious, and loves spending time in nature. Looking for an enthusiastic, understanding companion.",
    isVerified: true
  }
];

async function seed() {
  try {
    console.log("🚀 Starting Maratha Matrimony Rich Dataset Seeding...");

    // 1. Ensure Super Admin user exists
    const adminEmail = "admin@marathalageen.com";
    const adminPasswordHash = await bcrypt.hash("Admin@123", 10);
    const adminUser = await prisma.user.upsert({
      where: { email: adminEmail },
      update: { role: "ADMIN" },
      create: {
        name: "Super Admin",
        email: adminEmail,
        password: adminPasswordHash,
        role: "ADMIN"
      }
    });
    console.log(`✅ Admin account confirmed: ${adminUser.email} (Role: ${adminUser.role})`);

    // 2. Ensure standard Demo User exists for testing
    const demoEmail = "demo@maratha.com";
    const demoPasswordHash = await bcrypt.hash("Demo@123", 10);
    const demoUser = await prisma.user.upsert({
      where: { email: demoEmail },
      update: { name: "Rohit Patil" },
      create: {
        name: "Rohit Patil",
        email: demoEmail,
        password: demoPasswordHash,
        role: "USER"
      }
    });

    // Create demo profile if not present
    await prisma.profile.upsert({
      where: { userId: demoUser.id },
      update: {
        firstName: "Rohit",
        lastName: "Patil",
        gender: "Male",
        dateOfBirth: new Date("1996-08-20"),
        height: "5'11\"",
        maritalStatus: "Never Married",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        community: "96 Kuli Maratha",
        devak: "कळंब (Kalamb)",
        gotra: "भारद्वाज (Bharadwaj)",
        kuldaivat: "भवानी माता (Tuljapur)",
        education: "B.Tech & MBA",
        profession: "Senior Product Manager",
        company: "Tech Mahindra Bengaluru",
        annualIncome: "25L - 35L",
        diet: "Non-Veg",
        about: "Hey, I am Rohit. A software professional based in Bengaluru, originally from Belagavi. Looking for an educated, understanding Maratha partner.",
        isVerified: true,
        profileCompleteness: 95
      },
      create: {
        userId: demoUser.id,
        firstName: "Rohit",
        lastName: "Patil",
        gender: "Male",
        dateOfBirth: new Date("1996-08-20"),
        height: "5'11\"",
        maritalStatus: "Never Married",
        city: "Bengaluru",
        state: "Karnataka",
        country: "India",
        community: "96 Kuli Maratha",
        devak: "कळंब (Kalamb)",
        gotra: "भारद्वाज (Bharadwaj)",
        kuldaivat: "भवानी माता (Tuljapur)",
        education: "B.Tech & MBA",
        profession: "Senior Product Manager",
        company: "Tech Mahindra Bengaluru",
        annualIncome: "25L - 35L",
        diet: "Non-Veg",
        about: "Hey, I am Rohit. A software professional based in Bengaluru, originally from Belagavi. Looking for an educated, understanding Maratha partner.",
        isVerified: true,
        profileCompleteness: 95
      }
    });
    console.log(`✅ Demo User ready: ${demoUser.email} / Demo@123`);

    // 3. Seed Candidates
    let createdCount = 0;
    const defaultPassword = await bcrypt.hash("Maratha@123", 10);

    for (let i = 0; i < seedCandidates.length; i++) {
      const c = seedCandidates[i];
      const email = `${c.firstName.toLowerCase()}.${c.lastName.toLowerCase()}${i + 1}@maratha.com`;

      const user = await prisma.user.upsert({
        where: { email },
        update: {
          name: `${c.firstName} ${c.lastName}`,
        },
        create: {
          name: `${c.firstName} ${c.lastName}`,
          email,
          password: defaultPassword,
          role: "USER"
        }
      });

      // Calculate birth date from age
      const birthYear = new Date().getFullYear() - c.age;
      const birthMonth = (i % 12);
      const birthDay = ((i * 3 + 7) % 28) + 1;
      const dateOfBirth = new Date(birthYear, birthMonth, birthDay);

      const profile = await prisma.profile.upsert({
        where: { userId: user.id },
        update: {
          firstName: c.firstName,
          lastName: c.lastName,
          gender: c.gender,
          dateOfBirth,
          height: c.height,
          maritalStatus: c.maritalStatus,
          city: c.city,
          state: c.state,
          country: "India",
          community: c.community,
          devak: c.devak,
          gotra: c.gotra,
          kuldaivat: c.kuldaivat,
          nativePlace: c.nativePlace,
          rashi: c.rashi,
          nakshatra: c.nakshatra,
          manglik: c.manglik,
          education: c.education,
          college: c.college,
          profession: c.profession,
          company: c.company,
          annualIncome: c.annualIncome,
          diet: c.diet,
          familyType: c.familyType,
          fatherOccupation: c.fatherOccupation,
          motherOccupation: c.motherOccupation,
          brothersCount: c.brothersCount,
          brothersMarried: c.brothersMarried || 0,
          sistersCount: c.sistersCount,
          sistersMarried: c.sistersMarried || 0,
          about: c.about,
          isVerified: c.isVerified,
          profileCompleteness: 90
        },
        create: {
          userId: user.id,
          firstName: c.firstName,
          lastName: c.lastName,
          gender: c.gender,
          dateOfBirth,
          height: c.height,
          maritalStatus: c.maritalStatus,
          city: c.city,
          state: c.state,
          country: "India",
          community: c.community,
          devak: c.devak,
          gotra: c.gotra,
          kuldaivat: c.kuldaivat,
          nativePlace: c.nativePlace,
          rashi: c.rashi,
          nakshatra: c.nakshatra,
          manglik: c.manglik,
          education: c.education,
          college: c.college,
          profession: c.profession,
          company: c.company,
          annualIncome: c.annualIncome,
          diet: c.diet,
          familyType: c.familyType,
          fatherOccupation: c.fatherOccupation,
          motherOccupation: c.motherOccupation,
          brothersCount: c.brothersCount,
          brothersMarried: c.brothersMarried || 0,
          sistersCount: c.sistersCount,
          sistersMarried: c.sistersMarried || 0,
          about: c.about,
          isVerified: c.isVerified,
          profileCompleteness: 90
        }
      });

      // Photo assignment
      const portraitArray = c.gender === "Female" ? femalePortraits : malePortraits;
      const photoUrl = portraitArray[i % portraitArray.length];

      // Delete old photos and re-attach primary photo
      await prisma.photo.deleteMany({ where: { profileId: profile.id } });
      await prisma.photo.create({
        data: {
          profileId: profile.id,
          url: photoUrl,
          isPrimary: true
        }
      });

      createdCount++;
    }

    console.log(`✅ Seeded ${createdCount} verified Maratha candidate profiles with photos!`);

    // 4. Create connections for Demo User (Rohit Patil) with female candidates
    // Pick 3 female candidates to have: 1 accepted (can chat), 1 received, 1 sent
    const femaleCandidates = await prisma.profile.findMany({
      where: { gender: "Female" },
      include: { user: true },
      take: 4
    });

    if (femaleCandidates.length >= 3) {
      // 1. Accepted interest (Pooja Deshmukh) -> can chat!
      const match1 = femaleCandidates[0];
      await prisma.interest.upsert({
        where: {
          senderId_receiverId: {
            senderId: match1.userId,
            receiverId: demoUser.id
          }
        },
        update: { status: "accepted" },
        create: {
          senderId: match1.userId,
          receiverId: demoUser.id,
          status: "accepted",
          message: "Namaskar! Would love to connect and know more about family values."
        }
      });

      // Add a couple of initial messages between Demo User and Pooja
      await prisma.message.createMany({
        data: [
          {
            senderId: match1.userId,
            receiverId: demoUser.id,
            content: "Namaskar Rohit! Saw your profile. My family is originally from Belagavi too.",
            createdAt: new Date(Date.now() - 3600000 * 4)
          },
          {
            senderId: demoUser.id,
            receiverId: match1.userId,
            content: "Namaskar Pooja! Pleasure to connect. Belagavi is wonderful! Which part of Belagavi are your folks from?",
            createdAt: new Date(Date.now() - 3600000 * 2)
          }
        ]
      });

      // 2. Received request (Anjali Patil)
      const match2 = femaleCandidates[1];
      await prisma.interest.upsert({
        where: {
          senderId_receiverId: {
            senderId: match2.userId,
            receiverId: demoUser.id
          }
        },
        update: { status: "pending" },
        create: {
          senderId: match2.userId,
          receiverId: demoUser.id,
          status: "pending",
          message: "Interested in connecting!"
        }
      });

      // 3. Sent request to (Sneha Jadhav)
      const match3 = femaleCandidates[2];
      await prisma.interest.upsert({
        where: {
          senderId_receiverId: {
            senderId: demoUser.id,
            receiverId: match3.userId
          }
        },
        update: { status: "pending" },
        create: {
          senderId: demoUser.id,
          receiverId: match3.userId,
          status: "pending",
          message: "Hello Sneha, admired your profile and would love to connect."
        }
      });

      // 4. Shortlist a profile
      const match4 = femaleCandidates[3];
      await prisma.shortlist.upsert({
        where: {
          userId_targetProfileId: {
            userId: demoUser.id,
            targetProfileId: match4.id
          }
        },
        update: {},
        create: {
          userId: demoUser.id,
          targetProfileId: match4.id
        }
      });

      console.log("✅ Interactive connections & demo chat seeded successfully!");
    }

    console.log("🎉 Seeding complete! Database is now richly populated.");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    await prisma.$disconnect();
    pool.end();
  }
}

seed();
