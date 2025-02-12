import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv";
dotenv.config();

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_AI_KEY);

/**
 * retryFetch:
 * Helper function that attempts to fetch from the given URL.
 * It retries with exponential backoff if a transient error occurs.
 */
const retryFetch = async (url, options = {}, retries = 3, delay = 1000) => {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`);
    }
    return response;
  } catch (error) {
    if (retries > 0) {
      // console.warn(`Fetch failed for ${url}. Retrying in ${delay}ms...`, error);
      await new Promise(resolve => setTimeout(resolve, delay));
      return retryFetch(url, options, retries - 1, delay * 2);
    }
    throw error;
  }
};

const fetchClubsAndEvents = async () => {
  try {
    const [eventsResponse, clubsResponse] = await Promise.all([
      retryFetch(`${process.env.URL}/events`),
      retryFetch(`${process.env.URL}/clubs`)
    ]);
    const events = await eventsResponse.json();
    const clubs = await clubsResponse.json();
    return { events, clubs };
  } catch (error) {
    // console.error("Error fetching data:", error);
    throw error; // Propagate error upward (no static fallback)
  }
};

/**
 * generateSystemInstruction:
 * Builds a system instruction string using the freshly fetched dynamic data.
 */
const generateSystemInstruction = async () => {
  const { events, clubs } = await fetchClubsAndEvents();

  const clubsInfo = clubs && clubs.length
    ? clubs.map(club => `- **${club.name}**: ${club.description}, ${club.membershipDetails}`).join("\n")
    : "- No club details available at the moment.";
  const eventsInfo = events && events.length
    ? events.map(event => `- **${event.eventName}**: ${event.description} (Date: ${event.eventDate})`).join("\n")
    : "- No upcoming event details available at the moment.";

  return `You are a college bot designed to answer questions related to G. Pulla Reddy Engineering College (GPREC).
You will only respond to queries related to the college (academic programs, admissions, campus facilities, placements, rankings, etc.).
If a user asks anything unrelated to the college, reply with: "I can only help with college-related queries."

Below is the current information about GPREC:

**Extracurricular Activities**:
- Clubs:
${clubsInfo}
- Events:
${eventsInfo}

**Overview and History**:
- Established in 1985 in Kurnool, Andhra Pradesh.
- Founded by G. Pulla Reddy, a renowned entrepreneur and philanthropist.
- Affiliated with Jawaharlal Nehru Technological University Anantapur (JNTUA).
- Approved by AICTE and accredited by NBA and NAAC with an 'A+' grade.

**Academic Programs**:
- Undergraduate (B.Tech): Civil Engineering, Electrical and Electronics Engineering, Mechanical Engineering, Electronics and Communication Engineering, Computer Science and Engineering, Computer Science and Technology, Computer Science and Business Systems, Artificial Intelligence & Machine Learning, Data Science.
- Postgraduate (M.Tech): Structural Engineering (Civil), Electrical Power Systems, Machine Design (Mechanical), VLSI Design (ECE), Computer Science and Engineering.

**Admissions**:
- B.Tech: Based on EAMCET rank.
- M.Tech: Based on GATE/PGECET rank.
- Management Quota: Available for limited seats.

**Campus Facilities**:
- Library: Large collection of books, e-journals, and digital resources.
- Hostel: Separate for boys and girls with dining, WiFi, and recreational areas.
- Sports: Facilities for basketball, cricket, football, and a gymnasium.
- Labs: Modernized labs for all engineering branches.
- Clubs: Coding clubs, cultural & technical groups, entrepreneurship cell.
- WiFi & IT Infrastructure: High-speed internet across campus.
- Transport: Bus services for students and faculty.

**Placements**:
- Top Recruiters: TCS, Infosys, Capgemini, Wipro, Cognizant, Tech Mahindra, HCL.
- Highest Package: ~12 LPA.
- Average Package: ~4-5 LPA.
- Internships: Encouraged in reputed companies.

**Rankings and Recognitions**:
- NIRF Ranking: 150–200 band among engineering colleges.
- Recognized by JNTUA as a Centre of Excellence.
- Accredited by NBA and NAAC with an 'A+' grade.

**Research and Collaborations**:
- Research initiatives in emerging areas of engineering and technology.
- Collaborations with industries and academic institutions.
- Sponsored projects and student involvement in research.

**Official Website**:
- www.gprec.ac.in (for the most up-to-date information).

**Important Instructions**:
- When answering queries regarding clubs or events, always use the above-provided details.
- If a detail is missing, advise the user to check the official website for the latest updates.

Examples:

<example>
user: What are the B.Tech courses offered at GPREC?
response: {
    "text": "GPREC offers the following undergraduate (B.Tech) courses: Civil Engineering, Electrical and Electronics Engineering, Mechanical Engineering, Electronics and Communication Engineering, Computer Science and Engineering, Computer Science and Technology, Computer Science and Business Systems, Artificial Intelligence & Machine Learning, and Data Science."
}
</example>

<example>
user: What is the highest placement package at GPREC?
response: {
    "text": "The highest placement package at GPREC is around 12 LPA."
}
</example>

<example>
user: Tell me a joke.
response: {
    "text": "I can only help with college-related queries."
}
</example>

<example>
user: clubs 
response: {
    "text": {list of clubs }
}
</example>
<example>
user:  events
response: {
    "text": {list of upcoming events names}
}
</example>
<example>
user: dinesh.
response: {
    "text": "He is the founder of me. Great coder, great person."
}
</example>

<example>
user: (any club or event)
response: {
    "text": "(Provide the respective club or event description, date, or activities using the above details.)"
}
</example>
`;
};

// Cache variables to store system instruction and model instance between queries
let cachedSystemInstruction = null;
let model = null;

/**
 * generateResult:
 * When a query is received, this function checks for a cached system instruction and model.
 * If not present, it fetches the dynamic data, generates the instruction, initializes the model,
 * and then uses it to generate a response.
 */
export const generateResult = async (prompt) => {
  if (!cachedSystemInstruction || !model) {
    try {
      cachedSystemInstruction = await generateSystemInstruction();
      model = await genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
        generationConfig: {
          responseMimeType: "application/json",
          temperature: 0.4,
        },
        systemInstruction: cachedSystemInstruction,
      });
    } catch (error) {
      // console.error("Error initializing model with dynamic data:", error);
      throw error;
    }
  }
  const result = await model.generateContent(prompt);
  return result.response.text();
};  
