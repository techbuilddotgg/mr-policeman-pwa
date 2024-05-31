import { useEffect, useState, useRef } from "react";
import { Button } from "@radix-ui/themes";

interface MicrophoneProps {
  speakText?: string;
}

const Microphone: React.FC<MicrophoneProps> = ({ speakText }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingComplete, setRecordingComplete] = useState(false);

  const recognitionRef = useRef<any>(null);

  const commands: { [key: string]: () => void } = {
    'promet v živo': () => { window.open('https://www.promet.si/sl', '_blank'); },
    'stanje na slovenskih cestah': () => { window.open('https://www.amzs.si/na-poti/stanje-na-slovenskih-cestah', '_blank'); },
    'preberi današnje prispevke': () => { speak(speakText || ''); },
  };

  const startRecording = () => {
    setIsRecording(true);
    const recognition = new window.webkitSpeechRecognition();
    recognitionRef.current = recognition;
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event: any) => {
      const { transcript } = event.results[event.results.length - 1][0];

      const recognizedCommand = Object.keys(commands).find(command => transcript.toLowerCase().includes(command));
      if (recognizedCommand) {
        commands[recognizedCommand]();
      }
    };

    recognition.onerror = (event: Event) => {
      console.error("Speech recognition error", event);
      stopRecording();
    };

    recognition.start();
  };

  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  const stopRecording = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setRecordingComplete(true);
    }
  };

  const handleToggleRecording = () => {
    if (isRecording) {
      stopRecording();
    } else {
      startRecording();
    }
    setIsRecording(!isRecording);
  };


  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
  };

  return (
      <div className="mb-4">
        <Button
            variant="soft"
            color="gray"
            className="hover:cursor-pointer py-8 rounded-xl"
            onClick={handleToggleRecording}
        >
          {isRecording ? (
              <svg
                  className="h-8 w-8"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
              >
                <path fill="#595E67" d="M6 19h4V5H6v14zm8-14v14h4V5h-4z" />
              </svg>
          ) : (
              <svg
                  viewBox="0 0 256 256"
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-8 h-8 text-white"
              >
                <path
                    fill="#595E67"
                    d="M128 176a48.05 48.05 0 0 0 48-48V64a48 48 0 0 0-96 0v64a48.05 48.05 0 0 0 48 48ZM96 64a32 32 0 0 1 64 0v64a32 32 0 0 1-64 0Zm40 143.6V232a8 8 0 0 1-16 0v-24.4A80.11 80.11 0 0 1 48 128a8 8 0 0 1 16 0a64 64 0 0 0 128 0a8 8 0 0 1 16 0a80.11 80.11 0 0 1-72 79.6Z"
                />
              </svg>
          )}
        </Button>
      </div>
  );
};

export default Microphone;
