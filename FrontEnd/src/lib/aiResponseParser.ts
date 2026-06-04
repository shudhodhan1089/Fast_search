export interface ParsedAIResponse {
  answer: string;
  followUps: string[];
}

export function parseAIResponse(raw: string): ParsedAIResponse {
  if (!raw) return { answer: "", followUps: [] };

  // Extract answer content between <Answer> tags (case-insensitive)
  let answer = raw;
  const answerMatch = raw.match(/<Answer>([\s\S]*?)<\/Answer>/i);
  if (answerMatch) {
    answer = answerMatch[1].trim();
  }

  // Extract follow-up questions from <Follow_ups> tags
  const followUps: string[] = [];
  const followUpsMatch = raw.match(/<Follow_ups>([\s\S]*?)<\/Follow_ups>/i);
  if (followUpsMatch) {
    // Match <question> tags inside
    const questionMatches = followUpsMatch[1].match(/<question>([\s\S]*?)<\/question>/gi) || [];
    questionMatches.forEach((q) => {
      const clean = q.replace(/<\/?question>/gi, "").trim();
      if (clean) followUps.push(clean);
    });
  }

  return { answer, followUps };
}
