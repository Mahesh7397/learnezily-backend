const { geminiModel } = require("../config/Gemini_Ai_config")

const Ai_Gemini_model = async (req, res) => {
  try {
    const {topic,subject,amount,difficulty}= req.body
    let prompt = `You are an exam question generator.

IMPORTANT RULES (STRICT):
- Output MUST be raw JSON
- DO NOT use markdown
- DO NOT use \`\`\`
- DO NOT add explanations or text

Create quiz questions for the topic "${topic}" in subject ${subject}.

Generate exactly ${amount} questions
Difficulty: ${difficulty}
Each question must have 4 options
Only one correct answer per question

JSON Schema:
{
   "quiz_metadata": {
        "subject": string,
        "topic": string,
        "difficulty": string,
        "total_questions": number,
        "estimated_time_minutes": number
    },
  "questions": [
    {
      "id": number,
      "question": "string",
      "options": [
         "string",
        "string",
       "string",
       "string"
  ],
      "correctAnswer": "answer"
    }
  ]
}

Topic: "${topic}"


You are an expert Educational Content API. Your sole purpose is to generate high-quality quiz questions in a strict JSON format.

**Rules:**
1. You will receive the following parameters: {Subject}, {Topic}, {Number of Questions}, {Difficulty Level}.
2. Output valid JSON only. Do not wrap in markdown code blocks . Do not add conversational text.
3. Each question must have exactly 4 options.
4. The "difficulty" level must accurately reflect the request (Easy = basic recall; Medium = application; Hard = analysis/complex logic).
5. Ensure the "correct_option" exactly matches one of the strings in the "options" array.

**JSON Structure:**
{
  "quiz_metadata": {
    "subject": "String",
    "topic": "String",
    "difficulty": "String",
    "total_questions": Integer,
    "estimated_time_minutes": Integer
  },
  "questions": [
    {
      "id": Integer,
      "question": "String",
      "options": ["Option A", "Option B", "Option C", "Option D"],
      "correct_option": "String (Must match one option exactly)",
      "topic_tag": "String (Sub-topic for analysis)"
    }
  ]
}`;



    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await geminiModel.generateContent(prompt)
    const raw = result.response.text();
    // console.log(raw)
    const quiz = JSON.parse(raw);
    res.json(quiz);

  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Gemini AI failed" });
  }
}


const Ai_Gemini_model_evaluation = async (req, res) => {
  try {
    const { quizdata } = req.body
    const data = JSON.stringify(quizdata, null, 2)
    const prompt = `You are an academic evaluation assistant.

Task:
Evaluate a student's quiz performance based on the provided quiz result.

Responsibilities:
1. Analyze the student's answers against correct answers.
2. Calculate the total score and percentage if not already provided.
3. Identify weak areas by mapping incorrect answers to their sub-topics.
4. Provide clear, actionable advice for improvement.

Rules (STRICT):
- Base analysis ONLY on the provided data
- Do NOT invent questions, answers, or topics
- Be concise and constructive
- Output valid JSON only. Do not wrap in markdown code blocks . Do not add conversational text.
- Do NOT use markdown, code blocks, or extra text

Input Data:${data}

Output JSON Schema:
{
  "summary": {
    "totalQuestions": number,
    "correctAnswers": number,
    "wrongAnswers": number,
    "score": number,
    "percentage": number
  },
  "weakAreas": [
    {
      "subTopic": "string",
      "issue": "string"
    }
  ],
  "actionableAdvice": [
    "string"
  ]
}
`
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required" });
    }

    const result = await geminiModel.generateContent(prompt)
    const raw = result.response.text();
    // console.log(raw)
    const quiz = JSON.parse(raw);
    res.json(quiz);
  } catch (error) {
    console.log(error)
    res.status(500).json({ error: "Gemini AI failed" });
  }
}


const Ai_Gemini_model_Roadmap = async (req, res) => {
  try {
    const { Subject_Name, Topic_Name, Total_Timeframe, Daily_Availability } = req.body
    const prompt = `# ROLE Act as an expert Curriculum Designer and Time Management Strategist. Your goal is to create a realistic, data-driven learning roadmap based on strict time constraints. # INPUT PARAMETERS - **Subject Name:** ${Subject_Name} - **Topic Name:** ${Topic_Name} - **Total Timeframe:** ${Total_Timeframe} - **Daily Availability:** ${Daily_Availability} # INSTRUCTIONS 1. **Analyze the Goal:** Break down the ${Topic_Name} under ${Subject_Name} into its essential core concepts and sub-skills. 2. **Calculate Capacity:** - Calculate Total_Hours_Available = (Daily Availability × Total Days in Timeframe). - Estimate Required_Hours_For_Mastery based on average learning curves for this specific topic. 3. **Determine Feasibility:** Compare Total_Hours_Available vs Required_Hours_For_Mastery. - If Available < Required: Mark Feasibility as "Low" or "Impossible" and adjust the roadmap to cover *only* foundations or warn the user. - If Available >= Required: Mark Feasibility as "High" and cover depth. 4. **Generate Roadmap:** Create a step-by-step plan fitting the available hours. # OUTPUT FORMAT You must output ONLY valid JSON inside a code block. Do not include conversational text outside the JSON. 
    IMPORTANT RULES (STRICT):
- Output MUST be raw JSON
- DO NOT use markdown
- DO NOT use \`\`\`
- DO NOT add explanations or text
    ,Use this schema: { "meta": { "subject": "String", "topic": "String", "feasibility_analysis": { "score_0_to_100": Integer, "feasibility_level": "High/Medium/Low/Impossible", "total_hours_available": Number, "estimated_hours_needed": Number, "comment": "String (Explain why it is/isn't feasible. If impossible, suggest a realistic timeframe)" } }, "roadmap": [ { "phase_name": "String (e.g., Week 1 or Module 1)", "goal": "String", "topics": [ "String", "String" ], "daily_routine": "String (e.g., 'Focus on syntax for 40 mins, practice for 20 mins')", "resources_needed": ["String"] } ], "outcome": "String (What the user will actually be able to do by the end)" }`

    const result = await geminiModel.generateContent(prompt)
    const raw = result.response.text();
    const quiz = JSON.parse(raw);
    res.json(quiz);
  } catch (error) {
    console.log(error)
    res.json({ message: "fail to generate a roadmap" })
  }
}

const Ai_Gemini_model_Deep_Diver = async (req, res) => {
  try {
    const { subjectname, topicname } = req.body
    const prompt = `# ROLE
Act as an Expert Curriculum Designer. Your goal is to generate a complete, self-contained learning module for a specific topic in a single execution.

   IMPORTANT RULES (STRICT):
- Output MUST be raw JSON
- DO NOT use markdown
- DO NOT use \`\`\`
- DO NOT add explanations or text

# INPUT PARAMETERS
- **Subject:** ${subjectname}
- **Topic:** ${topicname}

# INSTRUCTIONS
You must generate three distinct components in a strict sequence to ensure content continuity.

### Component 1: The Deep Dive Notes
- Generate a comprehensive, 1-2 page deep dive into the {Topic}.
- Use valid Markdown formatting (headers, bolding, lists).
- Structure:
  1. **Concept Definition:** Simple, clear explanation.
  2. **Core Mechanics:** Technical breakdown of how it works.
  3. **Key Terminology:** Definitions of important terms.
  4. **Real-World Example:** A concrete usage scenario.

### Component 2: Flashcards
- Create 6 Flashcards based **strictly** on the "Deep Dive Notes" you just generated.
- Focus on key terms and "how" questions.

### Component 3: The Quiz
- Create a 5-question Multiple Choice Quiz based **strictly** on the "Deep Dive Notes".
- Questions must verify that the user actually read the notes.

# OUTPUT FORMAT
You must output ONLY a single valid JSON object. Do not output any conversational text. Ensure all Markdown in the notes_markdown field is properly escaped (e.g., use \n for newlines).


Use this exact Schema:
{
  "meta": {
    "topic": "String",
    "generated_at": "String (Date)"
  },
  "content": {
    "notes_markdown": "String (The full Markdown text of the notes with \n for line breaks)",
    "flashcards": [
      {
        "id": 1,
        "front": "String",
        "back": "String"
      }
    ],
    "quiz": [
      {
        "id": 1,
        "question": "String",
        "options": ["A", "B", "C", "D"],
        "correct_option_index": Integer,
        "explanation": "String (Briefly explain why based on the notes)"
      }
    ]
  }
}`
    const result = await geminiModel.generateContent(prompt)
    const raw = result.response.text();
    console.log(raw)
    const quiz = JSON.parse(raw);
    res.json(quiz);
  } catch (error) {
    console.log(error)
    res.json({ message: "fail to generate a content" })
  }
}

module.exports = { Ai_Gemini_model, Ai_Gemini_model_evaluation, Ai_Gemini_model_Roadmap, Ai_Gemini_model_Deep_Diver }
