import { useState } from 'react';

export const useRecorder = () => {
    const [isRecording, setIsRecording] = useState(false);
    return { isRecording, setIsRecording };
}
