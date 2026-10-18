import fs from "fs";
import path from "path";

export interface PreRegistrationData {
  id?: string;
  registeringFor: string;
  fullName: string;
  surname: string;
  caste: string;
  gender: string;
  mobile: string;
  whatsapp: string;
  email?: string;
  district: string;
  dob?: string;
  birthTime?: string;
  rashi?: string;
  nakshatra?: string;
  age?: string;
  height?: string;
  maritalStatus?: string;
  education?: string;
  profession?: string;
  annualIncome?: string;
  prefAgeMin?: string;
  prefAgeMax?: string;
  prefSubCaste?: string;
  prefEducation?: string;
  photoUrl?: string;
  priorityPass: string;
  createdAt: string;
  ip?: string;
}

// In-memory cache to ensure serverless instances maintain state
let memoryCache: PreRegistrationData[] | null = null;

// Determine best writable location (supports local dev + Vercel /tmp)
function getDataFilePath(): string {
  // 1. Try local data folder
  const localDir = path.join(process.cwd(), "data");
  const localFile = path.join(localDir, "preregistrations.json");

  try {
    if (!fs.existsSync(localDir)) {
      fs.mkdirSync(localDir, { recursive: true });
    }
    fs.accessSync(localDir, fs.constants.W_OK);
    return localFile;
  } catch {
    // 2. Fallback to /tmp which is always writable in serverless/AWS Lambda/Vercel
    const tmpDir = path.join("/tmp", "maratha_data");
    try {
      if (!fs.existsSync(tmpDir)) {
        fs.mkdirSync(tmpDir, { recursive: true });
      }
      return path.join(tmpDir, "preregistrations.json");
    } catch {
      return path.join("/tmp", "preregistrations.json");
    }
  }
}

export function normalizePhoneNumber(phone?: string | null): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10) {
    return digits.slice(-10); // Standard 10-digit Indian mobile number
  }
  return digits;
}

function readDataFile(): PreRegistrationData[] {
  if (memoryCache !== null && Array.isArray(memoryCache)) {
    return memoryCache;
  }

  const writablePath = getDataFilePath();
  const bundledSeedPath = path.join(process.cwd(), "data", "preregistrations.json");

  try {
    if (fs.existsSync(writablePath)) {
      const content = fs.readFileSync(writablePath, "utf8");
      if (content.trim()) {
        try {
          const parsed = JSON.parse(content) as PreRegistrationData[];
          if (Array.isArray(parsed)) {
            memoryCache = parsed;
            return parsed;
          }
        } catch {
          // invalid json, fallback
        }
      }
    }

    if (fs.existsSync(bundledSeedPath)) {
      const seedContent = fs.readFileSync(bundledSeedPath, "utf8");
      if (seedContent.trim()) {
        try {
          const parsedSeed = JSON.parse(seedContent) as PreRegistrationData[];
          if (Array.isArray(parsedSeed)) {
            memoryCache = parsedSeed;
            return parsedSeed;
          }
        } catch {}
      }
    }

    memoryCache = [];
    return [];
  } catch (err) {
    console.error("Error reading preregistrations file:", err);
    memoryCache = [];
    return [];
  }
}

function writeDataFile(records: PreRegistrationData[]): boolean {
  memoryCache = records;
  const filePath = getDataFilePath();
  try {
    fs.writeFileSync(filePath, JSON.stringify(records, null, 2), "utf8");
    return true;
  } catch (err) {
    console.error("Error writing preregistrations file:", err);
    return false;
  }
}

export function getAllPreRegistrations(): PreRegistrationData[] {
  const records = readDataFile();
  // Return sorted by newest first
  return [...records].sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function getPreRegistrationStats() {
  const records = getAllPreRegistrations();
  const total = records.length;
  
  const now = new Date();
  const todayStr = now.toISOString().slice(0, 10);
  const todayCount = records.filter(r => r.createdAt && r.createdAt.slice(0, 10) === todayStr).length;

  const maleCount = records.filter(r => r.gender?.toLowerCase() === "male").length;
  const femaleCount = records.filter(r => r.gender?.toLowerCase() === "female").length;

  const districtCounts: Record<string, number> = {};
  records.forEach(r => {
    const dist = r.district || "Other";
    districtCounts[dist] = (districtCounts[dist] || 0) + 1;
  });

  const topDistricts = Object.entries(districtCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({ name, count }));

  return {
    total,
    todayCount,
    maleCount,
    femaleCount,
    topDistricts
  };
}

export function findPreRegistrationByPhone(phone?: string | null): PreRegistrationData | null {
  const norm = normalizePhoneNumber(phone);
  if (!norm || norm.length < 10) return null;

  const records = readDataFile();
  return (
    records.find((r) => {
      const rMob = normalizePhoneNumber(r.mobile);
      const rWa = normalizePhoneNumber(r.whatsapp);
      return rMob === norm || rWa === norm;
    }) || null
  );
}

export function savePreRegistration(
  data: Omit<PreRegistrationData, "createdAt" | "priorityPass"> & { priorityPass?: string }
): { success: boolean; alreadyRegistered: boolean; record: PreRegistrationData } {
  const normMobile = normalizePhoneNumber(data.mobile);
  const normWhatsapp = normalizePhoneNumber(data.whatsapp);

  const existing = findPreRegistrationByPhone(normMobile) || findPreRegistrationByPhone(normWhatsapp);
  if (existing) {
    console.log(`⚠️ Duplicate pre-registration blocked for phone ${data.mobile}. Existing pass: ${existing.priorityPass}`);
    return {
      success: true,
      alreadyRegistered: true,
      record: existing,
    };
  }

  const records = readDataFile();
  const passNumber =
    data.priorityPass ||
    `ML-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`;

  const newRecord: PreRegistrationData = {
    ...data,
    mobile: normMobile || data.mobile,
    whatsapp: normWhatsapp || data.whatsapp || normMobile || data.mobile,
    priorityPass: passNumber,
    createdAt: new Date().toISOString(),
  };

  records.unshift(newRecord);
  writeDataFile(records);

  console.log(`✅ Saved new pre-registration for ${newRecord.fullName} (${newRecord.mobile}) with pass ${passNumber}`);

  return {
    success: true,
    alreadyRegistered: false,
    record: newRecord,
  };
}

// Convert all registrations into CSV string with UTF-8 BOM
export function generatePreRegistrationsCsv(records?: PreRegistrationData[]): string {
  const data = records || getAllPreRegistrations();

  const headers = [
    "VIP Pass ID",
    "Registration Date",
    "Candidate Name",
    "Surname",
    "Gender",
    "Caste / Sub-Caste",
    "Mobile Number",
    "WhatsApp Number",
    "Email",
    "District",
    "Registered By",
    "Age",
    "Date of Birth",
    "Birth Time",
    "Rashi",
    "Nakshatra",
    "Height",
    "Marital Status",
    "Education",
    "Profession",
    "Annual Income",
    "Partner Sub-Caste Pref",
    "Partner Age Pref",
    "Partner Education Pref",
    "Photo Uploaded"
  ];

  const escapeCsv = (val?: any) => {
    if (val === null || val === undefined) return '""';
    const str = String(val).replace(/"/g, '""');
    return `"${str}"`;
  };

  const rows = data.map((r) => [
    escapeCsv(r.priorityPass),
    escapeCsv(r.createdAt ? new Date(r.createdAt).toLocaleString("en-IN") : ""),
    escapeCsv(r.fullName),
    escapeCsv(r.surname),
    escapeCsv(r.gender),
    escapeCsv(r.caste),
    escapeCsv(r.mobile),
    escapeCsv(r.whatsapp),
    escapeCsv(r.email),
    escapeCsv(r.district),
    escapeCsv(r.registeringFor),
    escapeCsv(r.age),
    escapeCsv(r.dob),
    escapeCsv(r.birthTime),
    escapeCsv(r.rashi),
    escapeCsv(r.nakshatra),
    escapeCsv(r.height),
    escapeCsv(r.maritalStatus),
    escapeCsv(r.education),
    escapeCsv(r.profession),
    escapeCsv(r.annualIncome),
    escapeCsv(r.prefSubCaste),
    escapeCsv(r.prefAgeMin && r.prefAgeMax ? `${r.prefAgeMin} - ${r.prefAgeMax} Yrs` : ""),
    escapeCsv(r.prefEducation),
    escapeCsv(r.photoUrl ? "YES" : "NO")
  ]);

  // UTF-8 BOM: \uFEFF ensures Excel and Numbers display Kannada & special characters perfectly
  return "\uFEFF" + [headers.join(","), ...rows.map((row) => row.join(","))].join("\r\n");
}
