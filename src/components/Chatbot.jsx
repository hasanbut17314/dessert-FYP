import { useState } from 'react';
import {
    Webchat,
    WebchatProvider,
    Fab,
    getClient
} from '@botpress/webchat';

const clientId = "1f1595d0-ffc7-4f00-a304-3814122967ca";

const configuration = {
    color: '#BA4374',
    botName: 'Kaspas Assistant',
    enableReset: true,
    enableTranscriptDownload: false,
    showCloseButton: true,
    hideWidget: false,
    disableAnimations: false,
};

export default function Chatbot() {
    const client = getClient({
        clientId,
    });

    const [isWebchatOpen, setIsWebchatOpen] = useState(false);

    const toggleWebchat = () => {
        setIsWebchatOpen((prevState) => !prevState);
    };

    return (
        <WebchatProvider client={client} configuration={configuration}>
            {/* Fab button styling */}
            <Fab
                onClick={toggleWebchat}
                style={{
                    position: 'fixed',
                    bottom: '20px',
                    right: '20px',
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    boxShadow: '0 4px 8px rgba(0,0,0,0.5)',
                    zIndex: '1000',
                    cursor: 'pointer',
                }}
            />

            <div
                style={{
                    display: isWebchatOpen ? 'block' : 'none',
                    position: 'fixed',
                    bottom: '90px',
                    right: '20px',
                    width: '350px',
                    height: '78vh',
                    borderRadius: '8px',
                    overflow: 'hidden',
                    boxShadow: `0 0 20px rgba(186, 67, 116, 0.3)`,
                    zIndex: '999',
                }}
            >
                <Webchat
                    style={{
                        width: '100%',
                        height: '100%',
                        border: 'none',
                    }}
                />
            </div>
        </WebchatProvider>
    );
}