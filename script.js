const positiveWords = [
    "confident",
    "passionate",
    "motivated",
    "successful",
    "excellent",
    "creative",
    "responsible",
    "hardworking",
    "positive",
    "teamwork",
    "leadership",
    "achievement",
    "improve",
    "learn",
    "growth"
];

const skillWords = [
    "java",
    "python",
    "javascript",
    "html",
    "css",
    "sql",
    "communication",
    "leadership",
    "teamwork",
    "problem solving",
    "programming",
    "database",
    "machine learning",
    "cloud",
    "management",
    "development"
];

const confidenceWords = [
    "confident",
    "believe",
    "achieved",
    "experience",
    "successfully",
    "strong",
    "capable",
    "responsible"
];

function analyzeAnswer() {

    const text = document.getElementById("answer").value.trim();

    if (text === "") {
        alert("Please enter or speak your interview answer.");
        return;
    }

    const lowerText = text.toLowerCase();

    const words = lowerText
        .replace(/[^\w\s]/g, "")
        .split(/\s+/)
        .filter(word => word.length > 0);

    const wordCount = words.length;

    let positiveCount = 0;
    let skillCount = 0;
    let confidenceCount = 0;

    positiveWords.forEach(word => {
        if (lowerText.includes(word)) {
            positiveCount++;
        }
    });

    skillWords.forEach(word => {
        if (lowerText.includes(word)) {
            skillCount++;
        }
    });

    confidenceWords.forEach(word => {
        if (lowerText.includes(word)) {
            confidenceCount++;
        }
    });

    // Communication score
    let communication = 40;

    if (wordCount >= 30) {
        communication += 20;
    }

    if (wordCount >= 60) {
        communication += 20;
    }

    if (wordCount >= 100) {
        communication += 10;
    }

    communication = Math.min(communication, 100);

    // Relevance score
    let relevance = 40;

    if (skillCount >= 2) {
        relevance += 20;
    }

    if (skillCount >= 4) {
        relevance += 20;
    }

    if (lowerText.includes("experience")) {
        relevance += 10;
    }

    relevance = Math.min(relevance, 100);

    // Confidence score
    let confidence = 40;

    confidence += confidenceCount * 8;
    confidence += positiveCount * 4;

    confidence = Math.min(confidence, 100);

    // Professionalism score
    let professionalism = 50;

    if (lowerText.includes("team")) {
        professionalism += 10;
    }

    if (lowerText.includes("responsible")) {
        professionalism += 10;
    }

    if (lowerText.includes("experience")) {
        professionalism += 10;
    }

    if (lowerText.includes("learn")) {
        professionalism += 10;
    }

    professionalism = Math.min(professionalism, 100);

    const overall = Math.round(
        (communication +
            relevance +
            confidence +
            professionalism) / 4
    );

    // Display results

    document.getElementById("overallScore").textContent = overall;

    document.getElementById("communicationScore").textContent =
        communication + "%";

    document.getElementById("relevanceScore").textContent =
        relevance + "%";

    document.getElementById("confidenceScore").textContent =
        confidence + "%";

    document.getElementById("professionalScore").textContent =
        professionalism + "%";

    document.getElementById("communicationBar").style.width =
        communication + "%";

    document.getElementById("relevanceBar").style.width =
        relevance + "%";

    document.getElementById("confidenceBar").style.width =
        confidence + "%";

    document.getElementById("professionalBar").style.width =
        professionalism + "%";

    document.getElementById("wordCount").textContent =
        wordCount;

    document.getElementById("positiveWords").textContent =
        positiveCount;

    document.getElementById("skillWords").textContent =
        skillCount;

    generateFeedback(
        overall,
        wordCount,
        skillCount,
        confidence
    );
}

function generateFeedback(
    score,
    wordCount,
    skillCount,
    confidence
) {

    let feedback = "";

    if (score >= 80) {

        feedback =
            "Excellent answer! Your response shows good communication, confidence, relevant skills, and professional qualities.";

    } else if (score >= 60) {

        feedback =
            "Good answer. Try adding more details about your skills, experience, achievements, and specific examples.";

    } else {

        feedback =
            "Your answer can be improved. Try giving a structured response with your skills, experience, achievements, and career goals.";
    }

    if (wordCount < 30) {
        feedback +=
            " Your answer is quite short, so provide more details.";
    }

    if (skillCount < 2) {
        feedback +=
            " Mention some technical or professional skills.";
    }

    if (confidence < 50) {
        feedback +=
            " Use confident language when describing your abilities.";
    }

    document.getElementById("feedback").textContent =
        feedback;
}


// Speech Recognition

function startSpeech() {

    const SpeechRecognition =
        window.SpeechRecognition ||
        window.webkitSpeechRecognition;

    if (!SpeechRecognition) {

        alert(
            "Speech recognition is not supported in this browser. Please use Google Chrome or Microsoft Edge."
        );

        return;
    }

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    document.getElementById("speechStatus").textContent =
        "🎙️ Listening... Please speak your answer.";

    recognition.start();

    recognition.onresult = function(event) {

        const transcript =
            event.results[0][0].transcript;

        document.getElementById("answer").value =
            transcript;

        document.getElementById("speechStatus").textContent =
            "✅ Speech converted to text.";

        analyzeAnswer();
    };

    recognition.onerror = function() {

        document.getElementById("speechStatus").textContent =
            "❌ Could not recognize speech. Please try again.";
    };

    recognition.onend = function() {

        if (
            document.getElementById("speechStatus").textContent
            === "🎙️ Listening... Please speak your answer."
        ) {

            document.getElementById("speechStatus").textContent =
                "Speech recognition ended.";
        }
    };
}


// Example Answers

function loadExample(number) {

    const answerBox =
        document.getElementById("answer");

    if (number === 1) {

        answerBox.value =
            "Hello, my name is Sireesha. I am a motivated computer science student with strong communication and programming skills. I have experience in Java, Python, HTML, CSS and SQL. I enjoy teamwork and problem solving. I am passionate about learning new technologies and improving my skills.";
    }

    if (number === 2) {

        answerBox.value =
            "I am a hardworking and responsible student. I have experience developing web applications using HTML, CSS and JavaScript. I have also worked with Python and databases. I enjoy working in a team and solving technical problems. My goal is to continuously learn and contribute to successful projects.";
    }

    if (number === 3) {

        answerBox.value =
            "I am passionate about software development and technology. My strengths include communication, leadership and problem solving. I have learned Java, Python, SQL and web development. I successfully completed academic projects and learned how to work with a team. I believe my skills will help me grow in a professional environment.";
    }

    analyzeAnswer();
}


// Clear

function clearAnswer() {

    document.getElementById("answer").value = "";

    document.getElementById("overallScore").textContent = "0";

    document.getElementById("communicationScore").textContent = "0%";
    document.getElementById("relevanceScore").textContent = "0%";
    document.getElementById("confidenceScore").textContent = "0%";
    document.getElementById("professionalScore").textContent = "0%";

    document.getElementById("communicationBar").style.width = "0%";
    document.getElementById("relevanceBar").style.width = "0%";
    document.getElementById("confidenceBar").style.width = "0%";
    document.getElementById("professionalBar").style.width = "0%";

    document.getElementById("wordCount").textContent = "0";
    document.getElementById("positiveWords").textContent = "0";
    document.getElementById("skillWords").textContent = "0";

    document.getElementById("feedback").textContent =
        "Enter an answer and click Analyze Answer.";

    document.getElementById("speechStatus").textContent = "";
}