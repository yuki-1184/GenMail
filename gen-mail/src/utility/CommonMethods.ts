export async function FetchGpt3(
  setIsGenerating: (generating: boolean) => void,
  setResult: (result: [string, string, string] | [string]) => void,
  Gpt3Instruction: string,
  event: React.FormEvent,
  Gpt3Model: string
) {
  setIsGenerating(true);
  event.preventDefault();
  const data = { dataToSendToGPT3: Gpt3Instruction, modelToUse: Gpt3Model };
  console.log("data is: ", JSON.stringify(data));
  const response = await fetch(
    "https://i9jzvt02ng.execute-api.us-west-2.amazonaws.com/Test1/test123",
    // "http://localhost:8080",
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    }
  );

  const json = await response.json();
  console.log("result is: ", json);
  setIsGenerating(false);
  setResult(json.result);
}

export const getLanguageInEnglish = (language: string) => {
  switch (language) {
    case "ja":
      return "Japanese";
    case "en":
      return "English";
    case "es":
      return "Spanish";
    case "fr":
      return "French";
    case "de":
      return "German";
    case "it":
      return "Italian";
    default:
      return "English";
  }
};
