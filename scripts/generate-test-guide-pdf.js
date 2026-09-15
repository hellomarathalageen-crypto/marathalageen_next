const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// Read and base64-encode logo
let logoDataUri = '';
try {
  const logoBuffer = fs.readFileSync(path.join(__dirname, '../public/logo.png'));
  logoDataUri = `data:image/png;base64,${logoBuffer.toString('base64')}`;
} catch (e) {
  console.log('Logo read error:', e.message);
}

const htmlContent = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Maratha Matrimony - Complete Platform Test & QA Guide</title>
  <style>
    @page {
      size: A4;
      margin: 18mm 16mm 18mm 16mm;
    }

    * {
      box-sizing: border-box;
      -webkit-print-color-adjust: exact !important;
      print-color-adjust: exact !important;
    }

    body {
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif;
      color: #1e293b;
      background-color: #ffffff;
      line-height: 1.55;
      font-size: 11pt;
      margin: 0;
      padding: 0;
    }

    .page-break {
      page-break-before: always;
      break-before: page;
    }

    .no-break {
      page-break-inside: avoid;
      break-inside: avoid;
    }

    /* Cover Page */
    .cover-page {
      min-height: 92vh;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      padding: 30px 10px 10px 10px;
      page-break-after: always;
    }

    .cover-header {
      display: flex;
      align-items: center;
      gap: 16px;
      border-bottom: 2px solid #f1f5f9;
      padding-bottom: 20px;
    }

    .cover-logo {
      height: 60px;
      object-fit: contain;
    }

    .cover-badge {
      display: inline-block;
      background: #fdf2f8;
      color: #db1866;
      border: 1px solid #fbcfe8;
      font-weight: 700;
      font-size: 11px;
      text-transform: uppercase;
      letter-spacing: 1.2px;
      padding: 4px 12px;
      border-radius: 9999px;
      margin-bottom: 12px;
    }

    .cover-title {
      font-size: 30pt;
      font-weight: 800;
      color: #0f172a;
      line-height: 1.18;
      margin: 18px 0 10px 0;
    }

    .cover-subtitle {
      font-size: 14pt;
      color: #64748b;
      font-weight: 400;
      line-height: 1.4;
      margin-bottom: 24px;
    }

    .cover-card-grid {
      display: grid;
      grid-template-columns: 1fr 1fr;
      gap: 14px;
      margin-top: 24px;
    }

    .cover-card {
      background: #f8fafc;
      border: 1px solid #e2e8f0;
      border-radius: 10px;
      padding: 14px 18px;
    }

    .cover-card h4 {
      margin: 0 0 4px 0;
      font-size: 10pt;
      color: #475569;
      text-transform: uppercase;
      letter-spacing: 0.8px;
    }

    .cover-card p {
      margin: 0;
      font-size: 12pt;
      font-weight: 700;
      color: #0f172a;
    }

    .cover-footer {
      border-top: 1px solid #e2e8f0;
      padding-top: 16px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      font-size: 9.5pt;
      color: #94a3b8;
    }

    /* Headings */
    h1 {
      font-size: 18pt;
      font-weight: 800;
      color: #0f172a;
      border-bottom: 2.5px solid #db1866;
      padding-bottom: 6px;
      margin-top: 24px;
      margin-bottom: 14px;
    }

    h2 {
      font-size: 13pt;
      font-weight: 700;
      color: #1e293b;
      margin-top: 20px;
      margin-bottom: 10px;
      border-left: 4px solid #db1866;
      padding-left: 10px;
    }

    h3 {
      font-size: 11.5pt;
      font-weight: 600;
      color: #334155;
      margin-top: 14px;
      margin-bottom: 6px;
    }

    p {
      margin: 0 0 10px 0;
      color: #334155;
    }

    /* Tables */
    table {
      width: 100%;
      border-collapse: collapse;
      margin: 12px 0 16px 0;
      font-size: 9.5pt;
    }

    th {
      background-color: #f8fafc;
      color: #0f172a;
      font-weight: 700;
      text-align: left;
      padding: 9px 10px;
      border: 1px solid #e2e8f0;
      border-bottom: 2px solid #cbd5e1;
    }

    td {
      padding: 8px 10px;
      border: 1px solid #e2e8f0;
      vertical-align: top;
    }

    tr:nth-child(even) td {
      background-color: #fafbfc;
    }

    /* Badges */
    .badge {
      display: inline-block;
      font-size: 8pt;
      font-weight: 700;
      padding: 2px 7px;
      border-radius: 4px;
      text-transform: uppercase;
      letter-spacing: 0.5px;
    }

    .badge-primary { background: #fdf2f8; color: #db1866; border: 1px solid #fbcfe8; }
    .badge-admin { background: #fef3c7; color: #b45309; border: 1px solid #fde68a; }
    .badge-success { background: #dcfce7; color: #15803d; border: 1px solid #bbf7d0; }

    /* Code blocks and Monospace */
    code, .mono {
      font-family: Menlo, Monaco, Consolas, monospace;
      font-size: 8.8pt;
      background: #f1f5f9;
      padding: 2px 5px;
      border-radius: 4px;
      color: #0f172a;
    }

    /* Callout Boxes */
    .callout {
      border-radius: 8px;
      padding: 12px 16px;
      margin: 14px 0;
      font-size: 9.5pt;
    }

    .callout-info {
      background-color: #f0f9ff;
      border-left: 4px solid #0284c7;
      color: #0c4a6e;
    }

    .callout-highlight {
      background-color: #fff1f2;
      border-left: 4px solid #db1866;
      color: #881337;
    }

    .callout-success {
      background-color: #f0fdf4;
      border-left: 4px solid #16a34a;
      color: #14532d;
    }

    .callout-title {
      font-weight: 700;
      margin-bottom: 4px;
    }

    /* Checklists */
    .step-list {
      margin: 8px 0 12px 0;
      padding-left: 0;
      list-style-type: none;
    }

    .step-item {
      position: relative;
      padding-left: 30px;
      margin-bottom: 10px;
      font-size: 10pt;
    }

    .step-num {
      position: absolute;
      left: 0;
      top: 0;
      width: 20px;
      height: 20px;
      background: #db1866;
      color: #ffffff;
      border-radius: 50%;
      font-size: 8pt;
      font-weight: 700;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    /* Test Case Box */
    .test-case {
      border: 1px solid #e2e8f0;
      border-radius: 8px;
      margin-bottom: 16px;
      overflow: hidden;
    }

    .test-case-header {
      background: #f8fafc;
      padding: 9px 14px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #e2e8f0;
    }

    .test-case-title {
      font-weight: 700;
      font-size: 10.5pt;
      color: #0f172a;
      margin: 0;
    }

    .test-case-body {
      padding: 12px 14px;
      font-size: 9.5pt;
    }

    .flow-diagram {
      background: #fdf2f8;
      border: 1px dashed #f472b6;
      border-radius: 8px;
      padding: 10px 14px;
      font-family: Menlo, Monaco, Consolas, monospace;
      font-size: 8.5pt;
      color: #831843;
      margin: 10px 0;
      text-align: center;
      font-weight: 600;
    }
  </style>
</head>
<body>

  <!-- ==================== COVER PAGE ==================== -->
  <div class="cover-page">
    <div class="cover-header">
      ${logoDataUri ? `<img src="${logoDataUri}" alt="Maratha Matrimony Logo" class="cover-logo" />` : ''}
      <div>
        <h3 style="margin: 0; color: #db1866; font-size: 14pt; font-weight: 800;">मराठा लागीन</h3>
        <p style="margin: 0; font-size: 10pt; color: #64748b; font-weight: 500;">Maratha Matrimony Platform</p>
      </div>
    </div>

    <div>
      <span class="cover-badge">Executive QA & Manager Testing Manual</span>
      <h1 class="cover-title">End-to-End Platform<br/>Testing & User Flows Guide</h1>
      <p class="cover-subtitle">
        A complete, step-by-step verification guide covering candidate onboarding, cultural matching, real-time chat sync, printable biodata generation, and the super admin control center.
      </p>

      <div class="cover-card-grid">
        <div class="cover-card">
          <h4>Target Audience</h4>
          <p>Project Managers, QA Leads & Stakeholders</p>
        </div>
        <div class="cover-card">
          <h4>Release Version</h4>
          <p>v1.0 Production Ready</p>
        </div>
        <div class="cover-card">
          <h4>Core Modules</h4>
          <p>10 Distinct Systems (Chat, Admin, KYC, Biodata)</p>
        </div>
        <div class="cover-card">
          <h4>Test Readiness</h4>
          <p style="color: #16a34a;">Pre-Configured & Verified</p>
        </div>
      </div>
    </div>

    <div class="cover-footer">
      <span>Maratha Matrimony Application Suite</span>
      <span>Confidential - For Manager Verification</span>
      <span>September 2026</span>
    </div>
  </div>

  <!-- ==================== SECTION 1: CREDENTIALS & ACCESS MATRIX ==================== -->
  <div>
    <h1>1. Test Environment & Credentials Matrix</h1>
    <p>
      This testing guide enables management and QA to verify all critical customer journeys, edge cases, and administrative functions. The database comes pre-seeded with active matched candidate accounts and an elevated Super Admin account.
    </p>

    <div class="callout callout-info">
      <div class="callout-title">🌐 Platform Access URLs</div>
      <div><strong>Local Testing URL:</strong> <span class="mono">http://localhost:3000</span></div>
      <div><strong>Login Portal:</strong> <span class="mono">http://localhost:3000/login</span></div>
      <div><strong>Admin Direct:</strong> <span class="mono">http://localhost:3000/admin/dashboard</span></div>
    </div>

    <h2>Pre-Configured Test Accounts</h2>
    <table>
      <thead>
        <tr>
          <th>Role / Persona</th>
          <th>Login Email</th>
          <th>Password</th>
          <th>Profile & Attributes</th>
          <th>Direct Route</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="badge badge-admin">Super Admin</span></td>
          <td><span class="mono">admin@marathalageen.com</span></td>
          <td><span class="mono">Admin@123</span></td>
          <td>Platform Owner, Moderation, Approvals & Financial Control</td>
          <td><span class="mono">/admin/dashboard</span></td>
        </tr>
        <tr>
          <td><span class="badge badge-primary">Groom Candidate</span></td>
          <td><span class="mono">demo@maratha.com</span></td>
          <td><span class="mono">Demo@123</span></td>
          <td>Rohit Patil • 28 Yrs • Pune • 96 Kuli Maratha • Software Engineer</td>
          <td><span class="mono">/dashboard</span></td>
        </tr>
        <tr>
          <td><span class="badge badge-primary">Bride Candidate</span></td>
          <td><span class="mono">priya.test@maratha.com</span></td>
          <td><span class="mono">Demo@123</span></td>
          <td>Priya Patil • 26 Yrs • Mumbai • 96 Kuli Maratha • HR Professional</td>
          <td><span class="mono">/dashboard</span></td>
        </tr>
      </tbody>
    </table>

    <div class="callout callout-highlight">
      <div class="callout-title">⚡ 1-Click Login Shortcuts on the Login Screen</div>
      The <span class="mono">/login</span> page includes built-in quick test buttons right under the password field:
      <br/>
      • Click <strong>"👑 Super Admin"</strong> to automatically populate Super Admin credentials.
      <br/>
      • Click <strong>"👨 Groom Demo"</strong> to automatically populate Rohit Patil's credentials.
      <br/>
      • Click <strong>"👩 Bride Demo"</strong> to automatically populate Priya Patil's credentials.
    </div>

    <div class="callout callout-success">
      <div class="callout-title">💡 Side-by-Side Real-Time Testing Recommendation</div>
      To observe live bidirectional messaging, typing indicators, and mutual notifications:
      <br/>
      1. Open <strong>Window 1 (Normal Chrome)</strong>: Log in as <strong>Rohit Patil</strong> (<span class="mono">demo@maratha.com</span>).
      <br/>
      2. Open <strong>Window 2 (Incognito Chrome)</strong>: Log in as <strong>Priya Patil</strong> (<span class="mono">priya.test@maratha.com</span>).
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 2: END-TO-END FLOW ARCHITECTURE ==================== -->
  <div>
    <h1>2. Master Route Map & User Journey Architecture</h1>
    <p>
      The platform consists of two distinct ecosystems: the <strong>Candidate Portal</strong> (focused on cultural matchmaking, biodata, and verified communication) and the <strong>Super Admin Console</strong> (focused on moderation, approvals, and metrics).
    </p>

    <div class="flow-diagram">
      [Candidate] ➔ /signup ➔ 5-Step /onboarding ➔ /dashboard (Matches) ➔ /interests ➔ /dashboard/chat
      <br/>
      [Admin] ➔ /login ➔ (Auto-redirect) ➔ /admin/dashboard ➔ [Users | Approvals | Moderation | Payments]
    </div>

    <h2>Master Route Directory</h2>
    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>URL Route</th>
          <th>Access Level</th>
          <th>Core Functionality</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><strong>Auth</strong></td>
          <td><span class="mono">/signup</span></td>
          <td>Public</td>
          <td>Account registration (Name, Email, Password, Gender, Profile Creator)</td>
        </tr>
        <tr>
          <td><strong>Auth</strong></td>
          <td><span class="mono">/login</span></td>
          <td>Public</td>
          <td>Secure NextAuth sign-in with 1-click test chips</td>
        </tr>
        <tr>
          <td><strong>Onboarding</strong></td>
          <td><span class="mono">/onboarding</span></td>
          <td>Candidate Only</td>
          <td>5-step cultural profile setup (Devak, Gotra, Kundali, Career)</td>
        </tr>
        <tr>
          <td><strong>Discovery</strong></td>
          <td><span class="mono">/dashboard</span></td>
          <td>Candidate</td>
          <td>Member dashboard, daily recommendations & activity counters</td>
        </tr>
        <tr>
          <td><strong>Discovery</strong></td>
          <td><span class="mono">/matches</span></td>
          <td>Candidate</td>
          <td>Algorithmic partner matching & compatibility scoring</td>
        </tr>
        <tr>
          <td><strong>Discovery</strong></td>
          <td><span class="mono">/search</span></td>
          <td>Candidate</td>
          <td>Advanced multi-attribute search (Sub-caste, Gotra, City, Manglik)</td>
        </tr>
        <tr>
          <td><strong>Astrology</strong></td>
          <td><span class="mono">/kundali</span></td>
          <td>Candidate</td>
          <td>Ashtakoot 36 Guna Milan horoscope calculator</td>
        </tr>
        <tr>
          <td><strong>Biodata</strong></td>
          <td><span class="mono">/biodata</span></td>
          <td>Candidate</td>
          <td>Traditional Maharashtrian printable biodata with PDF/Print layout</td>
        </tr>
        <tr>
          <td><strong>Connections</strong></td>
          <td><span class="mono">/interests</span></td>
          <td>Candidate</td>
          <td>Manage sent, received, accepted, and declined connection requests</td>
        </tr>
        <tr>
          <td><strong>Chat</strong></td>
          <td><span class="mono">/dashboard/chat</span></td>
          <td>Candidate</td>
          <td>Real-time chat with live typing indicator & PostgreSQL persistence</td>
        </tr>
        <tr>
          <td><strong>Subscription</strong></td>
          <td><span class="mono">/membership</span></td>
          <td>Candidate</td>
          <td>Pricing tiers (Free, Premium, Premium Plus) & contact unlocking</td>
        </tr>
        <tr>
          <td><strong>Admin Core</strong></td>
          <td><span class="mono">/admin/dashboard</span></td>
          <td>Super Admin</td>
          <td>Executive overview, KPI metrics, active subscribers & pending tasks</td>
        </tr>
        <tr>
          <td><strong>Admin Members</strong></td>
          <td><span class="mono">/admin/users</span></td>
          <td>Super Admin</td>
          <td>User directory, role elevation (<span class="mono">USER</span> ↔ <span class="mono">ADMIN</span>), ban/activate</td>
        </tr>
        <tr>
          <td><strong>Admin KYC</strong></td>
          <td><span class="mono">/admin/approvals</span></td>
          <td>Super Admin</td>
          <td>Government ID verification queue & trust badge management</td>
        </tr>
        <tr>
          <td><strong>Admin Safety</strong></td>
          <td><span class="mono">/admin/moderation</span></td>
          <td>Super Admin</td>
          <td>Reported abuse tickets, content moderation & image audit</td>
        </tr>
        <tr>
          <td><strong>Admin Revenue</strong></td>
          <td><span class="mono">/admin/payments</span></td>
          <td>Super Admin</td>
          <td>Transaction ledger, active subscriptions & financial tracking</td>
        </tr>
        <tr>
          <td><strong>Admin Tools</strong></td>
          <td><span class="mono">/admin/broadcast</span></td>
          <td>Super Admin</td>
          <td>Push platform-wide announcements to all logged-in members</td>
        </tr>
        <tr>
          <td><strong>Admin Export</strong></td>
          <td><span class="mono">/admin/export</span></td>
          <td>Super Admin</td>
          <td>One-click CSV/Excel export of member dossiers and financial records</td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 3: CANDIDATE FLOW TEST CASES ==================== -->
  <div>
    <h1>3. Step-by-Step Test Scenarios: Candidate Portal</h1>

    <!-- Test Scenario 1 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 1: Candidate Registration & 5-Step Cultural Onboarding</h3>
        <span class="badge badge-primary">Flow #1</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Verify that a new visitor can register and complete the mandatory 5-step cultural profile setup before gaining access to the dashboard.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            Navigate to <span class="mono">http://localhost:3000/signup</span>.
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Enter candidate name, unique email (e.g. <span class="mono">test.groom@maratha.com</span>), password (<span class="mono">Demo@123</span>), gender (Male/Female), and "Profile Created By" (Self/Parents).
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Submit the form. Observe that the middleware automatically enforces redirection to <span class="mono">/onboarding</span>.
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            <strong>Step 1 (Personal):</strong> Select Marital Status (Never Married), Height (5ft 10in), Weight (72kg), Current City (Pune), State (Maharashtra).
          </li>
          <li class="step-item">
            <span class="step-num">5</span>
            <strong>Step 2 (Cultural Lineage):</strong> Select Maratha Sub-caste (<strong>96 Kuli Maratha</strong>), Gotra (e.g. <strong>Kashyap</strong>), Devak (<strong>Panchpallav</strong>), Kuldaivat (<strong>Bhavani Tuljapur</strong>), Native Place (Satara).
          </li>
          <li class="step-item">
            <span class="step-num">6</span>
            <strong>Step 3 (Kundali / पत्रिका):</strong> Select Rashi (Mesh), Nakshatra (Ashwini), Charan (1), Gan (Deva), Manglik Status (Non-Manglik), and Birth Time/Place.
          </li>
          <li class="step-item">
            <span class="step-num">7</span>
            <strong>Step 4 (Education & Career):</strong> Select Degree (B.E. Computer Science), Profession (Software Engineer), Income Bracket (₹15-20 LPA), Diet (Non-Veg).
          </li>
          <li class="step-item">
            <span class="step-num">8</span>
            <strong>Step 5 (Family & Photo):</strong> Select Family Type (Nuclear), Father Occupation, Mother Occupation, and upload candidate photo.
          </li>
          <li class="step-item">
            <span class="step-num">9</span>
            Click "Complete Profile". Verify immediate redirect to <span class="mono">/dashboard</span> with welcome banner and profile completeness meter updated.
          </li>
        </ul>
        <div class="callout callout-success">
          <strong>Pass Criteria:</strong> All 5 steps validate successfully, user record is populated in PostgreSQL with all lineage/horoscope fields, and user can now browse matches.
        </div>
      </div>
    </div>

    <!-- Test Scenario 2 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 2: Search, Filters & Smart Match Discovery</h3>
        <span class="badge badge-primary">Flow #2</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Verify that candidates can find compatible matches using cultural and geographical filters.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            Log in as <strong>Rohit Patil</strong> (<span class="mono">demo@maratha.com</span> / <span class="mono">Demo@123</span>).
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Navigate to <span class="mono">/matches</span>. Verify daily curated matches display with compatibility score badges (e.g. 92% Match).
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Navigate to <span class="mono">/search</span>. Test the following filters:
            <br/>
            • <strong>Sub-caste:</strong> Select "96 Kuli Maratha".
            <br/>
            • <strong>City:</strong> Filter by "Mumbai" or "Pune".
            <br/>
            • <strong>Manglik Status:</strong> Select "Non-Manglik".
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            Verify results reload dynamically. Click on <strong>Priya Patil's</strong> profile card to open the complete candidate dossier at <span class="mono">/profile/[id]</span>.
          </li>
          <li class="step-item">
            <span class="step-num">5</span>
            Inspect the candidate dossier tabs: About Me, Kundali & Horoscope, Lineage (Devak, Gotra, Kuldaivat), Family Background, and Lifestyle.
          </li>
        </ul>
        <div class="callout callout-success">
          <strong>Pass Criteria:</strong> Profile displays all cultural fields accurately and respects photo privacy settings.
        </div>
      </div>
    </div>

    <!-- Test Scenario 3 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 3: Traditional Printable Biodata Generator</h3>
        <span class="badge badge-primary">Flow #3</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Validate the creation, preview, and printing of a traditional Maharashtrian Biodata.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            While logged in as Rohit or Priya, navigate to <span class="mono">http://localhost:3000/biodata</span>.
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Verify the traditional layout renders:
            <br/>
            • Header with <strong>श्री गणेशाय नमः</strong> and auspicious emblem.
            <br/>
            • Candidate photo with royal border frame.
            <br/>
            • <strong>वैयक्तिक माहिती (Personal Info):</strong> Full Name, DOB, Time, Place, Height, Blood Group.
            <br/>
            • <strong>कुल व देवक माहिती (Lineage):</strong> जात (Maratha), उपजात (96 Kuli), गोत्र (Kashyap), देवक (Panchpallav), कुलदैवत (Bhavani Tuljapur), मूळ गाव.
            <br/>
            • <strong>पत्रिका / कुंडली (Horoscope):</strong> रास, नक्षत्र, चरण, गण, नाडी, मंगळ.
            <br/>
            • <strong>कौटुंबिक माहिती (Family):</strong> Father/Mother details, Siblings, Mama Gotra, Relatives.
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Click the <strong>"Print / Save as PDF"</strong> button. Verify print preview opens cleanly without web navigation artifacts or sidebar interference.
          </li>
        </ul>
        <div class="callout callout-success">
          <strong>Pass Criteria:</strong> Formatted cleanly for single/two-page A4 printing with zero CSS overflow or clipping.
        </div>
      </div>
    </div>

  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 4: REAL-TIME CHAT TEST FLOW ==================== -->
  <div>
    <h1>4. Real-Time Chat & Bidirectional Sync Testing</h1>
    <p>
      The chat engine has been upgraded to a production-grade, 100% database-backed engine. All simulated client-side mock timers and auto-replies have been removed. Messages and typing indicators sync bidirectionally in real time.
    </p>

    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 4: Live Chat & Real-Time Bidirectional Typing Indicator</h3>
        <span class="badge badge-primary">Flow #4</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Validate simultaneous real-time communication between two active members across independent sessions.</p>

        <div class="callout callout-highlight">
          <strong>Required Setup:</strong>
          <br/>
          • <strong>Window 1 (Regular Browser):</strong> Log in as <strong>Rohit Patil</strong> (<span class="mono">demo@maratha.com</span> / <span class="mono">Demo@123</span>).
          <br/>
          • <strong>Window 2 (Incognito Window):</strong> Log in as <strong>Priya Patil</strong> (<span class="mono">priya.test@maratha.com</span> / <span class="mono">Demo@123</span>).
        </div>

        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            In both windows, navigate to <span class="mono">http://localhost:3000/dashboard/chat</span>.
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            In <strong>Window 1 (Rohit)</strong>, click on <strong>Priya Patil</strong> in the active conversations sidebar.
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            In <strong>Window 2 (Priya)</strong>, click on <strong>Rohit Patil</strong> in the active conversations sidebar.
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            <strong>Test Typing Indicator (Rohit ➔ Priya):</strong>
            <br/>
            In Window 1, begin typing a message in the input box (do not press send yet).
            <br/>
            Look at <strong>Window 2 (Priya's screen)</strong>:
            <br/>
            • The header immediately displays a pulsing status: <span style="color: #db1866; font-weight: 700;">"Rohit is typing..."</span>.
            <br/>
            • An animated 3-dot message bubble appears at the bottom of the message thread.
            <br/>
            Clear the input in Window 1 — verify that the indicator disappears in Window 2 within 2 seconds.
          </li>
          <li class="step-item">
            <span class="step-num">5</span>
            <strong>Test Live Message Delivery (Rohit ➔ Priya):</strong>
            <br/>
            In Window 1, send: <em>"Namaskar Priya, had a chance to look at your biodata. Would love to discuss further."</em>
            <br/>
            Observe Window 2: Within 1.5 seconds, the new message renders on Priya's screen on the left in clean white bubble style with timestamp.
          </li>
          <li class="step-item">
            <span class="step-num">6</span>
            <strong>Test Reverse Live Reply (Priya ➔ Rohit):</strong>
            <br/>
            In Window 2 (Priya), type and send: <em>"Namaskar Rohit! Yes, our families' Devak and Gotra align well. Let's arrange a call."</em>
            <br/>
            Observe Window 1 (Rohit): Message appears instantly.
          </li>
          <li class="step-item">
            <span class="step-num">7</span>
            <strong>Verify No Fake Auto-Replies:</strong>
            <br/>
            Notice that neither side triggers simulated bot replies or pre-canned dummy timers. Every message is authentic and directly committed to the PostgreSQL <span class="mono">Message</span> table.
          </li>
          <li class="step-item">
            <span class="step-num">8</span>
            <strong>Verify Responsive UI Layout:</strong>
            <br/>
            Resize the browser window to compact laptop sizes (e.g. 1024×665).
            <br/>
            Verify that the input box, send button, and chat messages stay 100% visible inside the viewport without page truncation or horizontal clipping.
          </li>
        </ul>

        <div class="callout callout-success">
          <strong>Pass Criteria:</strong>
          <br/>
          ✓ Messages persist across page refreshes (stored in PostgreSQL).
          <br/>
          ✓ Typing indicator works bidirectionally with automatic timeout.
          <br/>
          ✓ No horizontal or vertical clipping on compact viewports.
          <br/>
          ✓ Clean Maratha Matrimony crimson/pink brand styling (<span class="mono">#DB1866</span>).
        </div>
      </div>
    </div>

    <!-- Test Scenario 5 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 5: Membership Plans & Contact Unlocking</h3>
        <span class="badge badge-primary">Flow #5</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Verify monetization gates and premium phone number unlocking.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            Navigate to <span class="mono">/membership</span>.
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Compare features across <strong>Free</strong>, <strong>Premium (₹2,499)</strong>, and <strong>Premium Plus (₹4,999)</strong> tiers.
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Click "Upgrade" on the Premium tier to enter the checkout flow at <span class="mono">/payment</span>.
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            Verify that upon activation, candidate profiles show unblurred contact numbers and direct WhatsApp connect buttons.
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 5: SUPER ADMIN FLOW TEST CASES ==================== -->
  <div>
    <h1>5. Step-by-Step Test Scenarios: Super Admin Console</h1>
    <p>
      The Super Admin console provides complete operational control over member accounts, content moderation, KYC verification, revenue tracking, and global broadcasts.
    </p>

    <!-- Test Scenario 6 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 6: Super Admin Login & Executive Dashboard Overview</h3>
        <span class="badge badge-admin">Admin Flow #1</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Verify secure administrative access, role enforcement, and platform metrics.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            Navigate to <span class="mono">http://localhost:3000/login</span>.
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Click the quick test chip <strong>"👑 Super Admin"</strong> (fills <span class="mono">admin@marathalageen.com</span> / <span class="mono">Admin@123</span>).
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Click "Sign In". Verify the system validates the <span class="mono">ADMIN</span> role and automatically routes to <span class="mono">/admin/dashboard</span>.
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            <strong>Inspect KPI Cards:</strong>
            <br/>
            • <strong>Total Registered Profiles:</strong> Total bride and groom count.
            <br/>
            • <strong>Active Subscriptions:</strong> Members on paid tiers.
            <br/>
            • <strong>Pending Verifications:</strong> Accounts awaiting document approval.
            <br/>
            • <strong>Monthly Revenue:</strong> Total transaction volume.
          </li>
          <li class="step-item">
            <span class="step-num">5</span>
            <strong>Test Security Guard:</strong> Attempt to visit <span class="mono">/admin/dashboard</span> while logged in as Rohit Patil. Verify that the middleware redirects non-admin users to <span class="mono">/dashboard</span>.
          </li>
        </ul>
        <div class="callout callout-success">
          <strong>Pass Criteria:</strong> Only authenticated users with <span class="mono">role: "ADMIN"</span> can access any <span class="mono">/admin/*</span> routes.
        </div>
      </div>
    </div>

    <!-- Test Scenario 7 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 7: User Management & Role Elevation</h3>
        <span class="badge badge-admin">Admin Flow #2</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Verify search, inspection, role modification, and account status management.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            From the admin sidebar, click <strong>"Users"</strong> (<span class="mono">/admin/users</span>).
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Use the search bar to search by name ("Priya") or email ("priya.test@maratha.com").
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Test the filter tabs: <strong>All Members</strong>, <strong>Verified Only</strong>, <strong>Pending Verification</strong>, and <strong>Admin Accounts</strong>.
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            Click on a member row to inspect their full profile, subscription status, and join date.
          </li>
          <li class="step-item">
            <span class="step-num">5</span>
            Verify action buttons: Toggle Role (<span class="mono">USER</span> ↔ <span class="mono">ADMIN</span>), Deactivate Account, or Delete Profile.
          </li>
        </ul>
      </div>
    </div>

    <!-- Test Scenario 8 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 8: Approvals & Government ID Verification Queue</h3>
        <span class="badge badge-admin">Admin Flow #3</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Verify KYC document review and trust badge assignment.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            Click <strong>"Verification"</strong> (<span class="mono">/admin/approvals</span>).
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Review the list of candidates who submitted Aadhaar, PAN, or employment credentials.
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Click <strong>"Approve"</strong> on a pending profile.
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            Verify in the database and public profile view that <span class="mono">isVerified</span> updates to <span class="mono">true</span>, displaying the green shield trust badge.
          </li>
        </ul>
      </div>
    </div>

    <!-- Test Scenario 9 -->
    <div class="test-case no-break">
      <div class="test-case-header">
        <h3 class="test-case-title">Test Scenario 9: Global Broadcasts & Data Export</h3>
        <span class="badge badge-admin">Admin Flow #4</span>
      </div>
      <div class="test-case-body">
        <p><strong>Goal:</strong> Validate system announcements and analytical reports export.</p>
        <ul class="step-list">
          <li class="step-item">
            <span class="step-num">1</span>
            Navigate to <strong>"Broadcast"</strong> (<span class="mono">/admin/broadcast</span>).
          </li>
          <li class="step-item">
            <span class="step-num">2</span>
            Create a new announcement: Title <em>"Pune Vadhu-Var Melawa Announced!"</em>, Message, Banner Type (Info/Warning/Urgent).
          </li>
          <li class="step-item">
            <span class="step-num">3</span>
            Publish the broadcast. Verify that logged-in candidates see the alert notification on their dashboard banner.
          </li>
          <li class="step-item">
            <span class="step-num">4</span>
            Navigate to <strong>"Export"</strong> (<span class="mono">/admin/export</span>).
          </li>
          <li class="step-item">
            <span class="step-num">5</span>
            Click <strong>"Export Member Directory (CSV)"</strong> and <strong>"Export Financial Ledger"</strong>. Verify CSV files download cleanly with full column headers.
          </li>
        </ul>
      </div>
    </div>
  </div>

  <div class="page-break"></div>

  <!-- ==================== SECTION 6: QA ACCEPTANCE CHECKLIST ==================== -->
  <div>
    <h1>6. QA Acceptance Testing Sign-Off Checklist</h1>
    <p>
      Your QA tester or manager can print or fill this checklist to record pass/fail verification for each platform feature:
    </p>

    <table>
      <thead>
        <tr>
          <th style="width: 8%;">ID</th>
          <th style="width: 25%;">Module / Feature</th>
          <th style="width: 42%;">Expected Behavior</th>
          <th style="width: 12%;">Status</th>
          <th style="width: 13%;">Sign-off</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td><span class="mono">QA-01</span></td>
          <td><strong>Candidate Registration</strong></td>
          <td>Account created, redirected to 5-step onboarding wizard.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-02</span></td>
          <td><strong>Cultural Onboarding</strong></td>
          <td>Saves Devak, Gotra, Kuldaivat, and Kundali attributes to PostgreSQL.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-03</span></td>
          <td><strong>Smart Matchmaking</strong></td>
          <td>Accurate compatibility scoring based on partner preferences.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-04</span></td>
          <td><strong>Printable Biodata</strong></td>
          <td>Traditional Maharashtrian layout with Ganesha header & print preview.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-05</span></td>
          <td><strong>Real-Time Chat Sync</strong></td>
          <td>Instant 1.5s bidirectional delivery without simulated mock bot replies.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-06</span></td>
          <td><strong>Typing Indicator</strong></td>
          <td>Displays "typing..." status and animated 3 dots in real time.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-07</span></td>
          <td><strong>Chat UI Layout</strong></td>
          <td>No clipping or horizontal truncation on 1024×665 viewports.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-08</span></td>
          <td><strong>Brand Color Styling</strong></td>
          <td>Clean crimson/pink brand palette (<span class="mono">#DB1866</span>) applied consistently.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-09</span></td>
          <td><strong>Super Admin Login</strong></td>
          <td>1-click chip fills credentials, routes automatically to <span class="mono">/admin/dashboard</span>.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-10</span></td>
          <td><strong>Route Protection</strong></td>
          <td>Non-admin candidates blocked from visiting <span class="mono">/admin/*</span> routes.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-11</span></td>
          <td><strong>User Administration</strong></td>
          <td>Admin can search, inspect, ban, and modify candidate roles.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-12</span></td>
          <td><strong>KYC Approvals</strong></td>
          <td>Admin can approve documents and toggle green verified badges.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
        <tr>
          <td><span class="mono">QA-13</span></td>
          <td><strong>Data Export</strong></td>
          <td>Member directory and transaction records export cleanly to CSV.</td>
          <td>[  ] Pass<br/>[  ] Fail</td>
          <td>__________</td>
        </tr>
      </tbody>
    </table>

    <div style="margin-top: 30px; border-top: 1px solid #cbd5e1; padding-top: 20px; display: flex; justify-content: space-between;">
      <div>
        <p style="margin: 0; font-weight: 700; color: #0f172a;">Tester / QA Lead Name:</p>
        <p style="margin: 20px 0 0 0; border-bottom: 1px solid #94a3b8; width: 220px;"></p>
      </div>
      <div>
        <p style="margin: 0; font-weight: 700; color: #0f172a;">Project Manager Signature:</p>
        <p style="margin: 20px 0 0 0; border-bottom: 1px solid #94a3b8; width: 220px;"></p>
      </div>
      <div>
        <p style="margin: 0; font-weight: 700; color: #0f172a;">Date of Sign-off:</p>
        <p style="margin: 20px 0 0 0; border-bottom: 1px solid #94a3b8; width: 140px;"></p>
      </div>
    </div>
  </div>

</body>
</html>`;

const outputPathHtml = path.join(__dirname, '../Maratha_Matrimony_Platform_Test_Guide.html');
const outputPathPdf = path.join(__dirname, '../Maratha_Matrimony_Platform_Test_Guide.pdf');

fs.writeFileSync(outputPathHtml, htmlContent);
console.log('HTML Guide written successfully to:', outputPathHtml);

// 2. Generate PDF via Chrome Headless
const chromePath = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const cmd = `"${chromePath}" --headless=new --disable-gpu --no-pdf-header-footer --print-to-pdf="${outputPathPdf}" "${outputPathHtml}"`;

console.log('Generating PDF via headless Chrome...');
try {
  execSync(cmd, { stdio: 'inherit' });
  const stats = fs.statSync(outputPathPdf);
  console.log(`PDF successfully generated! Size: ${stats.size} bytes (${(stats.size / 1024).toFixed(1)} KB)`);
  console.log('PDF Path:', outputPathPdf);
} catch (err) {
  console.error('Error generating PDF:', err.message);
}
