import React, { useState, useEffect, useCallback, useRef } from 'react';
import { RetellWebClient } from 'retell-client-js-sdk';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { toast } from 'sonner';
import { Mic, MicOff, Loader2, Volume2, PhoneOff } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const PushToSpeak = () => {
  const [isCallActive, setIsCallActive] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [agentSpeaking, setAgentSpeaking] = useState(false);
  const [error, setError] = useState(null);
  const retellClientRef = useRef(null);

  // Initialize Retell client
  useEffect(() => {
    retellClientRef.current = new RetellWebClient();
    
    return () => {
      if (retellClientRef.current && isCallActive) {
        retellClientRef.current.stopCall();
      }
    };
  }, []);

  // Setup event listeners
  useEffect(() => {
    if (!retellClientRef.current) return;

    const retellClient = retellClientRef.current;

    const handleCallStarted = () => {
      console.log('Call started');
      setIsCallActive(true);
      setIsConnecting(false);
      setError(null);
      toast.success('Connected to Gretta!', {
        description: 'Start speaking naturally...'
      });
    };

    const handleCallEnded = () => {
      console.log('Call ended');
      setIsCallActive(false);
      setIsConnecting(false);
      setTranscript('');
      setAgentSpeaking(false);
      toast.info('Call ended', {
        description: 'Feel free to start another conversation'
      });
    };

    const handleAgentStartTalking = () => {
      console.log('Agent started talking');
      setAgentSpeaking(true);
    };

    const handleAgentStopTalking = () => {
      console.log('Agent stopped talking');
      setAgentSpeaking(false);
    };

    const handleUpdate = (update) => {
      if (update.transcript) {
        setTranscript(update.transcript);
      }
    };

    const handleError = (error) => {
      console.error('Call error:', error);
      setError('Connection error occurred');
      setIsCallActive(false);
      setIsConnecting(false);
      toast.error('Call Error', {
        description: 'Unable to maintain connection. Please try again.'
      });
    };

    retellClient.on('call_started', handleCallStarted);
    retellClient.on('call_ended', handleCallEnded);
    retellClient.on('agent_start_talking', handleAgentStartTalking);
    retellClient.on('agent_stop_talking', handleAgentStopTalking);
    retellClient.on('update', handleUpdate);
    retellClient.on('error', handleError);

    return () => {
      retellClient.off('call_started', handleCallStarted);
      retellClient.off('call_ended', handleCallEnded);
      retellClient.off('agent_start_talking', handleAgentStartTalking);
      retellClient.off('agent_stop_talking', handleAgentStopTalking);
      retellClient.off('update', handleUpdate);
      retellClient.off('error', handleError);
    };
  }, []);

  const startCall = useCallback(async () => {
    if (!retellClientRef.current) {
      toast.error('Error', { description: 'Retell client not initialized' });
      return;
    }

    setIsConnecting(true);
    setError(null);

    try {
      // Request microphone permission first
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: true,
        video: false,
      });
      stream.getTracks().forEach((track) => track.stop());

      // Call backend to create web call
      const response = await axios.post(`${BACKEND_URL}/api/retell/web-call`);
      const { access_token } = response.data;

      if (!access_token) {
        throw new Error('No access token received');
      }

      // Start the call with Retell
      await retellClientRef.current.startCall({
        accessToken: access_token,
      });

      toast.success('Connected!', {
        description: 'You can now speak with Gretta AI'
      });

    } catch (err) {
      console.error('Error starting call:', err);
      
      if (err.name === 'NotAllowedError') {
        setError('Microphone access denied');
        toast.error('Microphone Access Required', {
          description: 'Please allow microphone access to speak with Gretta'
        });
      } else if (err.response?.status === 500) {
        setError('Backend error');
        toast.error('Service Error', {
          description: 'Unable to connect to voice service. Please try again later.'
        });
      } else {
        setError('Failed to start call');
        toast.error('Connection Failed', {
          description: err.message || 'Unable to start voice chat. Please try again.'
        });
      }
      
      setIsConnecting(false);
    }
  }, []);

  const endCall = useCallback(() => {
    if (retellClientRef.current && isCallActive) {
      retellClientRef.current.stopCall();
    }
    setIsCallActive(false);
    setIsConnecting(false);
    setTranscript('');
    setAgentSpeaking(false);
  }, [isCallActive]);

  return (
    <Card className="bg-white border-2 border-blue-300 rounded-2xl p-6 shadow-xl hover:shadow-2xl transition-all duration-300 max-w-md mx-auto">
      <div className="space-y-4">
        {/* Title */}
        <div className="text-center">
          <h3 className="text-xl font-bold text-slate-900 mb-2">
            Speak with Gretta Now
          </h3>
          <p className="text-sm text-slate-600">
            Click below to start a real-time voice conversation
          </p>
        </div>

        {/* Mic Animation */}
        {(isCallActive || isConnecting) && (
          <div className=\"flex justify-center\">
            <div className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
              agentSpeaking 
                ? 'bg-gradient-to-br from-purple-500 to-pink-500' 
                : 'bg-gradient-to-br from-blue-500 to-cyan-500'
            } ${isConnecting ? 'animate-pulse' : ''}`}>
              {agentSpeaking && (
                <div className=\"absolute inset-0 rounded-full animate-ping opacity-75 bg-purple-400\"></div>
              )}
              <Volume2 className=\"w-12 h-12 text-white relative z-10\" />
            </div>
          </div>
        )}

        {/* Status Text */}
        {isCallActive && (
          <div className=\"text-center text-sm\">
            {agentSpeaking ? (
              <p className=\"text-purple-600 font-semibold animate-pulse\">
                Gretta is speaking...
              </p>
            ) : (
              <p className=\"text-blue-600 font-semibold\">
                Your turn to speak
              </p>
            )}
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className=\"p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-700 text-center\">
            {error}
          </div>
        )}

        {/* Transcript */}
        {transcript && isCallActive && (
          <div className=\"p-4 bg-slate-50 rounded-lg max-h-32 overflow-y-auto\">
            <p className=\"text-xs text-slate-500 font-semibold mb-1\">Conversation:</p>
            <p className=\"text-sm text-slate-800\">{transcript}</p>
          </div>
        )}

        {/* Call Control Button */}
        <div className=\"flex justify-center\">
          {!isCallActive && !isConnecting ? (
            <Button
              onClick={startCall}
              size=\"lg\"
              className=\"bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:opacity-90 text-white font-semibold px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105\"
            >
              <Mic className=\"w-5 h-5 mr-2\" />
              Push to Speak with Gretta
            </Button>
          ) : isConnecting ? (
            <Button
              disabled
              size=\"lg\"
              className=\"bg-slate-400 text-white font-semibold px-8 py-6\"
            >
              <Loader2 className=\"w-5 h-5 mr-2 animate-spin\" />
              Connecting...
            </Button>
          ) : (
            <Button
              onClick={endCall}
              size=\"lg\"
              className=\"bg-red-600 hover:bg-red-700 text-white font-semibold px-8 py-6 shadow-xl transition-all duration-300\"
            >
              <PhoneOff className=\"w-5 h-5 mr-2\" />
              End Call
            </Button>
          )}
        </div>

        {/* Demo Mode Notice */}
        <div className=\"text-center text-xs text-slate-500 italic\">
          Demo mode • Requires backend integration for live calls
        </div>
      </div>
    </Card>
  );
};

export default PushToSpeak;
