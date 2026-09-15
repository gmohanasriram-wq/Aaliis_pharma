// scripts/verify-enquiry-api.mjs
// Automated verification for /api/enquiry route handler

const BASE_URL = process.env.TEST_BASE_URL || "http://localhost:3005";

async function runTests() {
  console.log(`\n==================================================`);
  console.log(`STARTING /api/enquiry ROUTE HANDLER VERIFICATION`);
  console.log(`Target: ${BASE_URL}/api/enquiry`);
  console.log(`==================================================\n`);

  let allPassed = true;

  function assert(condition, testName, details = "") {
    if (condition) {
      console.log(`[PASS] ${testName}`);
    } else {
      console.error(`[FAIL] ${testName}: ${details}`);
      allPassed = false;
    }
  }

  // TEST 1: GET method rejection
  try {
    const res = await fetch(`${BASE_URL}/api/enquiry`, { method: "GET" });
    assert(res.status === 405, "Test 1: GET request rejected with 405", `Got status ${res.status}`);
    const allowHeader = res.headers.get("allow");
    assert(allowHeader === "POST", "Test 1b: Allow header indicates POST", `Got ${allowHeader}`);
  } catch (err) {
    assert(false, "Test 1: GET request", err.message);
  }

  // TEST 2: Unsupported Media Type (non-JSON)
  try {
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "text/plain" },
      body: "plain text payload",
    });
    assert(res.status === 415, "Test 2: Non-JSON Content-Type rejected with 415", `Got status ${res.status}`);
  } catch (err) {
    assert(false, "Test 2: Non-JSON Content-Type", err.message);
  }

  // TEST 3: Malformed JSON body
  try {
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "invalid-json{",
    });
    assert(res.status === 400, "Test 3: Malformed JSON body rejected with 400", `Got status ${res.status}`);
  } catch (err) {
    assert(false, "Test 3: Malformed JSON body", err.message);
  }

  // TEST 4: Missing required fields (missing name)
  try {
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        company_or_pharmacy_name: "Apex Healthcare",
        phone: "+91 9876543210",
        email: "test@apexpharma.com",
      }),
    });
    assert(res.status === 400, "Test 4: Missing name rejected with 400", `Got status ${res.status}`);
    const data = await res.json();
    assert(data.success === false, "Test 4b: Response success is false", JSON.stringify(data));
  } catch (err) {
    assert(false, "Test 4: Missing name", err.message);
  }

  // TEST 5: Invalid phone number (< 10 digits)
  try {
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Pharmacist",
        company_or_pharmacy_name: "Apex Healthcare",
        phone: "12345",
        email: "test@apexpharma.com",
      }),
    });
    assert(res.status === 400, "Test 5: Invalid phone rejected with 400", `Got status ${res.status}`);
  } catch (err) {
    assert(false, "Test 5: Invalid phone", err.message);
  }

  // TEST 6: Invalid email syntax
  try {
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Test Pharmacist",
        company_or_pharmacy_name: "Apex Healthcare",
        phone: "+91 98765 43210",
        email: "invalid-email-address",
      }),
    });
    assert(res.status === 400, "Test 6: Invalid email rejected with 400", `Got status ${res.status}`);
  } catch (err) {
    assert(false, "Test 6: Invalid email", err.message);
  }

  // TEST 7: Honeypot spam defense (returns 200 quietly without calling Resend)
  try {
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Bot Spammer",
        company_or_pharmacy_name: "Spam LLC",
        phone: "+91 98765 43210",
        email: "spambot@example.com",
        hp_company_url: "http://spam-link.com",
      }),
    });
    assert(res.status === 200, "Test 7: Honeypot trap triggers benign 200 status", `Got status ${res.status}`);
    const data = await res.json();
    assert(data.success === true, "Test 7b: Honeypot returns success: true", JSON.stringify(data));
  } catch (err) {
    assert(false, "Test 7: Honeypot trap", err.message);
  }

  // TEST 8: Real Controlled Test Commercial Enquiry
  try {
    console.log(`\nDispatching controlled test enquiry to Resend service...`);
    const res = await fetch(`${BASE_URL}/api/enquiry`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: "Controlled Automated Test",
        company_or_pharmacy_name: "Aaliis Test Distributor",
        phone: "+91 80720 51898",
        email: "aaliispharma2025@gmail.com",
        city: "Chennai",
        district: "Chennai",
        business_type: "Distributor",
        products_interested_in: ["Maxycod", "Nervlis-Plus"],
        message: "Automated verification test of commercial enquiry routing via Resend to aaliispharma2025@gmail.com.",
      }),
    });

    const data = await res.json();
    console.log(`Resend dispatch response: status ${res.status}`, data);

    if (res.status === 200 && data.success) {
      assert(true, "Test 8: Real enquiry successfully accepted by Resend", `Message ID: ${data.enquiryId || "accepted"}`);
    } else {
      console.log(`[INFO] Test 8 response: ${res.status} - ${data.message}`);
      // Check if it's an account verification / domain restriction constraint
      assert(false, "Test 8: Real enquiry accepted by Resend", `Status ${res.status}: ${data.message}`);
    }
  } catch (err) {
    assert(false, "Test 8: Real enquiry dispatch", err.message);
  }

  console.log(`\n==================================================`);
  console.log(`VERIFICATION SUMMARY: ${allPassed ? "ALL TESTS PASSED" : "TESTS COMPLETED (SEE DETAILS ABOVE)"}`);
  console.log(`==================================================\n`);

  process.exit(allPassed ? 0 : 1);
}

runTests();

