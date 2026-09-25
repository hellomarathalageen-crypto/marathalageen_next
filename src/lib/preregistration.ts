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

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "preregistrations.json");

export function normalizePhoneNumber(phone?: string | null): string {
  if (!phone) return "";
  const digits = phone.replace(/\D/g, "");
  if (digits.length >= 10) {
    return digits.slice(-10); // Standard 10-digit Indian mobile number
  }
  return digits;
}

function ensureDataFile(): PreRegistrationData[] {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(DATA_FILE)) {
      fs.writeFileSync(DATA_FILE, JSON.stringify([], null, 2), "utf8");
      return [];
    }
    const content = fs.readFileSync(DATA_FILE, "utf8");
    if (!content.trim()) return [];
    return JSON.parse(content) as PreRegistrationData[];
  } catch (err) {
    console.error("Error reading preregistrations file:", err);
    return [];
  }
}

export function getAllPreRegistrations(): PreRegistrationData[] {
  return ensureDataFile();
}

export function findPreRegistrationByPhone(phone?: string | null): PreRegistrationData | null {
  const norm = normalizePhoneNumber(phone);
  if (!norm || norm.length < 10) return null;

  const records = ensureDataFile();
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

  const records = ensureDataFile();
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

  records.push(newRecord);

  try {
    fs.writeFileSync(DATA_FILE, JSON.stringify(records, null, 2), "utf8");
    console.log(`✅ Saved new pre-registration for ${newRecord.fullName} (${newRecord.mobile}) with pass ${passNumber}`);
  } catch (writeErr) {
    console.error("Error saving preregistration to file:", writeErr);
  }

  return {
    success: true,
    alreadyRegistered: false,
    record: newRecord,
  };
}
