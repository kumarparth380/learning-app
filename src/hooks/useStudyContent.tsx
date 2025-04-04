import { useState } from "react";
import { useRouter } from "next/navigation";
import { extractTextFromFile } from "@/utils/documentProcessor";

export function useStudyContent() {
    const router = useRouter();
    const [fileToUpload, setFileToUpload] = useState<File | null>(null);
    const [studyText, setStudyText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
  
    const handleStartStudying = async () => {
      try {
        setIsLoading(true);
        let content = "";
  
        // If file is uploaded, extract content from file
        if (fileToUpload) {
          content = await extractTextFromFile(fileToUpload);
        }
  
        // If direct text input is provided
        else if (studyText.trim()) {
          content = studyText;
        } else {
          throw new Error("Please provide content to study");
        }
  
        sessionStorage.setItem("studyContent", content);
  
        router.push("/quiz");
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to start studying");
      } finally {
        setIsLoading(false);
      }
    };
  
    return {
      fileToUpload,
      setFileToUpload,
      studyText,
      setStudyText,
      isLoading,
      error,
      handleStartStudying,
    };
  };
  