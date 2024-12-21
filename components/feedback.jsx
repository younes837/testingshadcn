import React from "react";

export const FeedbackSection = ({ feedback }) => {
  console.log("Incoming feedback:", feedback);

  const parseFeedback = (text) => {
    try {
      const sections = {
        accuracy: "",
        improvements: "",
        tips: "",
        encouragement: "",
      };

      // Remove excessive asterisks and clean up the text
      const cleanText = text
        .replace(/\*\*/g, "") // Remove double asterisks
        .replace(/\*/g, "•") // Convert single asterisks to bullet points
        .replace(/\s+/g, " "); // Normalize spaces

      const patterns = {
        accuracy:
          /(?:Accuracy:|1\.\s*Accuracy:)([^]*?)(?=(?:Areas for Improvement|2\.)|$)/i,
        improvements:
          /(?:Areas for Improvement:|2\.\s*Areas for Improvement:)([^]*?)(?=(?:Practice Tips|3\.)|$)/i,
        tips: /(?:Practice Tips:|3\.\s*Practice Tips:)([^]*?)(?=(?:Encouragement|4\.)|$)/i,
        encouragement: /(?:Encouragement:|4\.\s*Encouragement:)([^]*?)$/i,
      };

      Object.entries(patterns).forEach(([key, pattern]) => {
        const match = cleanText.match(pattern);
        if (match && match[1]) {
          let content = match[1].trim();

          // Split by bullet points only if they exist
          if (content.includes("•")) {
            content = content
              .split("•")
              .map((item) => item.trim())
              .filter(Boolean)
              .join("\n• ");
            if (!content.startsWith("•")) content = "• " + content;
          }

          sections[key] = content;
        }
      });

      console.log("Parsed sections:", sections); // Debug log

      return sections;
    } catch (error) {
      console.error("Error parsing feedback:", error);
      return {
        accuracy: "",
        improvements: "",
        tips: "",
        encouragement: "",
      };
    }
  };

  const FeedbackCard = ({ title, content, icon, colorScheme }) => {
    if (!content) return null;

    return (
      <div
        className={`bg-gradient-to-br ${colorScheme} rounded-xl p-5 shadow-sm border transition-all duration-300 hover:shadow-md`}
      >
        <div className="flex items-center gap-2 mb-3">
          <div
            className={`w-8 h-8 rounded-full ${
              colorScheme.includes("green")
                ? "bg-green-100"
                : colorScheme.includes("blue")
                ? "bg-blue-100"
                : colorScheme.includes("amber")
                ? "bg-amber-100"
                : "bg-purple-100"
            } flex items-center justify-center`}
          >
            {icon}
          </div>
          <h4
            className={`text-lg font-semibold ${
              colorScheme.includes("green")
                ? "text-green-700"
                : colorScheme.includes("blue")
                ? "text-blue-700"
                : colorScheme.includes("amber")
                ? "text-amber-700"
                : "text-purple-700"
            }`}
          >
            {title}
          </h4>
        </div>
        <p className="text-gray-700 leading-relaxed prose prose-sm">
          {content}
        </p>
      </div>
    );
  };

  const sections = parseFeedback(feedback);
  const hasContent = Object.values(sections).some(
    (section) => section.length > 0
  );

  if (!hasContent) {
    console.log("No content to display");
    return null;
  }

  return (
    <div className="mt-6 space-y-6 animate-fadeIn">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Pronunciation Analysis
      </h3>

      <div className="grid gap-4 md:grid-cols-2">
        <FeedbackCard
          title="Accuracy"
          content={sections.accuracy}
          colorScheme="from-green-50 to-emerald-50 border-green-100"
          icon={
            <svg
              className="w-5 h-5 text-green-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          }
        />

        <FeedbackCard
          title="Areas for Improvement"
          content={sections.improvements}
          colorScheme="from-blue-50 to-indigo-50 border-blue-100"
          icon={
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 10V3L4 14h7v7l9-11h-7z"
              />
            </svg>
          }
        />

        <FeedbackCard
          title="Practice Tips"
          content={sections.tips}
          colorScheme="from-amber-50 to-orange-50 border-amber-100"
          icon={
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
          }
        />

        <FeedbackCard
          title="Keep Going!"
          content={sections.encouragement}
          colorScheme="from-purple-50 to-pink-50 border-purple-100"
          icon={
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
              />
            </svg>
          }
        />
      </div>
    </div>
  );
};

export default FeedbackSection;
