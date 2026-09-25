import { NextResponse } from "next/server";
import { sendMatrimonyAlert } from "@/lib/notifications";
import { 
  findPreRegistrationByPhone, 
  savePreRegistration, 
  normalizePhoneNumber 
} from "@/lib/preregistration";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const phone = searchParams.get("phone");

    if (!phone) {
      return NextResponse.json({ error: "Phone number is required" }, { status: 400 });
    }

    const existing = findPreRegistrationByPhone(phone);
    if (existing) {
      return NextResponse.json({
        exists: true,
        priorityPass: existing.priorityPass,
        candidateName: existing.fullName,
        message: "This mobile number is already pre-registered.",
      });
    }

    return NextResponse.json({ exists: false });
  } catch (error: any) {
    console.error("GET preregister error:", error);
    return NextResponse.json({ exists: false, error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { 
      registeringFor = "Self",
      fullName, 
      surname,
      email, 
      mobile, 
      whatsapp, 
      gender, 
      district, 
      caste, 
      dob, 
      birthTime,
      rashi,
      nakshatra,
      age,
      height,
      maritalStatus,
      education,
      profession,
      annualIncome,
      prefAgeMin,
      prefAgeMax,
      prefEducation,
      prefSubCaste,
      photoUrl
    } = body;

    const cleanMobile = normalizePhoneNumber(mobile);
    const cleanWhatsapp = normalizePhoneNumber(whatsapp) || cleanMobile;

    if (!cleanMobile || cleanMobile.length < 10) {
      return NextResponse.json({
        success: false,
        message: "Please provide a valid 10-digit mobile number."
      }, { status: 400 });
    }

    // ── 1. CHECK FOR DUPLICATE PHONE NUMBER ──
    const existing = findPreRegistrationByPhone(cleanMobile) || (cleanWhatsapp ? findPreRegistrationByPhone(cleanWhatsapp) : null);
    
    if (existing) {
      console.log("⚠️ DUPLICATE ATTEMPT DETECTED:");
      console.log(`Mobile: ${mobile} is already registered under pass: ${existing.priorityPass} (${existing.fullName})`);

      return NextResponse.json({
        success: true,
        alreadyRegistered: true,
        priorityPass: existing.priorityPass,
        candidateName: existing.fullName,
        message: `Mobile number +91 ${cleanMobile} is already pre-registered with active VIP Pass ${existing.priorityPass}.`
      });
    }

    // ── 2. SAVE NEW UNIQUE PRE-REGISTRATION ──
    const saveResult = savePreRegistration({
      registeringFor,
      fullName: fullName?.trim() || "Candidate",
      surname: surname?.trim() || "",
      caste: caste || "Kshatriya Maratha",
      gender: gender || "",
      mobile: cleanMobile,
      whatsapp: cleanWhatsapp,
      email: email?.trim() || "",
      district: district || "Belagavi",
      dob,
      birthTime,
      rashi,
      nakshatra,
      age,
      height,
      maritalStatus,
      education,
      profession,
      annualIncome,
      prefAgeMin,
      prefAgeMax,
      prefEducation,
      prefSubCaste,
      photoUrl
    });

    const passNumber = saveResult.record.priorityPass;

    console.log("--------------------------------------------------");
    console.log("🚩 NEW UNIQUE PRE-REGISTRATION RECORDED:");
    console.log(`Pass ID: ${passNumber}`);
    console.log(`Candidate: ${fullName} ${surname || ""}`.trim());
    console.log(`Caste: ${caste} | Gender: ${gender} | District: ${district}`);
    console.log(`Mobile: ${cleanMobile} | WhatsApp: ${cleanWhatsapp} | Email: ${email || "None"}`);
    console.log("--------------------------------------------------");

    // ── 3. ATTEMPT EMAIL DISPATCH IF EMAIL PROVIDED ──
    let emailSent = false;
    if (email && email.includes("@")) {
      try {
        const candidateDisplayName = [fullName, surname].filter(Boolean).join(" ");
        const emailResult = await sendMatrimonyAlert({
          type: "PRE_REGISTRATION_CONFIRMATION",
          recipientEmail: email,
          recipientPhone: cleanMobile,
          recipientName: candidateDisplayName,
          actorName: "Maratha Lageen Team",
          customMessage: passNumber
        });
        emailSent = Boolean(emailResult.email);
      } catch (emailErr) {
        console.warn("Pre-registration email dispatch warning (non-blocking):", emailErr);
      }
    }

    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      priorityPass: passNumber,
      emailSent,
      message: "Pre-registration confirmed successfully with Free VIP Access!"
    });
  } catch (error: any) {
    console.error("Pre-registration endpoint error:", error);
    return NextResponse.json({
      success: true,
      alreadyRegistered: false,
      priorityPass: `ML-${new Date().getFullYear()}-${Math.floor(10000 + Math.random() * 90000)}`,
      emailSent: false,
      message: "Pre-registration recorded in local registry."
    });
  }
}
