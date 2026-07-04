import { FEEDBACK_CONFIG } from '../config/feedbackConfig';

export async function logFeedback({ rating, followUpReason = null, userInputs, recommendationName }) {
  const { formUrl, fields } = FEEDBACK_CONFIG;
  const body = new URLSearchParams({
    [fields.timestamp]:          Date.now().toString(),
    [fields.rating]:             rating,
    [fields.followUpReason]:     followUpReason ?? "",
    [fields.spaceType]:          userInputs.spaceType,
    [fields.ambience]:           userInputs.ambience,
    [fields.spaceSize]:          userInputs.spaceSize,
    [fields.naturalLight]:       userInputs.naturalLight,
    [fields.falseCeiling]:       userInputs.falseCeiling,
    [fields.recommendationName]: recommendationName
  });
  try {
    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: body.toString()
    });
  } catch (err) {
    console.error("Feedback logging failed:", err);
  }
}
