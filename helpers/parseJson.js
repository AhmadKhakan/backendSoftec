function cleanAndParseLLMResponse(responseString) {
    try {
      // Remove code block markers (```json and ```)
      const cleanedString = responseString
        .replace(/^```json\s*/i, '') // remove ```json at start
        .replace(/```$/i, '')        // remove ``` at end
        .trim();                     // remove any extra whitespace
  
      const parsedResponse = JSON.parse(cleanedString);
      return parsedResponse;
    } catch (error) {
      console.error("Failed to clean and parse LLM response:", error);
      return null;
    }
  }
  module.exports = cleanAndParseLLMResponse;