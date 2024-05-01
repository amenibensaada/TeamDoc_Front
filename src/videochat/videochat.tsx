import { useRef, useState } from "react";

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

//import { ReactComponent as HangupIcon } from "../icons/hangup.svg";
//import { ReactComponent as MoreIcon } from "../icons/more-vertical.svg";
//import { ReactComponent as CopyIcon } from "../icons/copy.svg";


import { PhoneDisabled, MoreVert, FileCopy } from "@mui/icons-material";
import './videochat.css'




// Initialize Firebase
const firebaseConfig = {
    apiKey: "AIzaSyDPrVNrWNUgPIh1MuxMyoDsPzpSUl46ZQQ",
    authDomain: "piweb-50ddf.firebaseapp.com",
    projectId: "piweb-50ddf",
    storageBucket: "piweb-50ddf.appspot.com",
    messagingSenderId: "412357807581",
    appId: "1:412357807581:web:08ad19a6c0db76ad403a34",
    measurementId: "G-QTW56R1XY6"
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
}

const firestore = firebase.firestore();

// Initialize WebRTC
const servers = {
    iceServers: [
        {
            urls: [
                "stun:stun1.l.google.com:19302",
                "stun:stun2.l.google.com:19302",
            ],
        },
    ],
    iceCandidatePoolSize: 10,
};

const pc = new RTCPeerConnection(servers);

function Meet() {
    const [currentPage, setCurrentPage] = useState<"home" | "create" | "join">("home");
    const [joinCode, setJoinCode] = useState<string>("");

    return (
        <div className="app">
            {currentPage === "home" ? (
                <Menu
                    joinCode={joinCode}
                    setJoinCode={setJoinCode}
                    setPage={setCurrentPage}
                />
            ) : (
                <Videos
                    mode={currentPage}
                    callId={joinCode}
                    setPage={setCurrentPage}
                />
            )}
        </div>
    );
}

interface MenuProps {
    joinCode: string;
    setJoinCode: React.Dispatch<React.SetStateAction<string>>;
    setPage: React.Dispatch<React.SetStateAction<"home" | "create" | "join">>;
}

function Menu({ joinCode, setJoinCode, setPage }: MenuProps) {
    return (
        <div className="home">
            <div className="create box">
                <button onClick={() => setPage("create")}>Create Call</button>
            </div>

            <div className="answer box">
                <input
                    value={joinCode}
                    onChange={(e) => setJoinCode(e.target.value)}
                    placeholder="Join with code"
                />
                <button onClick={() => setPage("join")}>Answer</button>
            </div>
        </div>
    );
}

interface VideosProps {
    mode: "create" | "join";
    callId: string;
    setPage: React.Dispatch<React.SetStateAction<"home" | "create" | "join">>;
}

function Videos({ mode, callId, setPage }: VideosProps) {
    const [webcamActive, setWebcamActive] = useState(false);
    const [roomId, setRoomId] = useState<string | undefined>(callId);

    const localRef = useRef<HTMLVideoElement>(null);
    const remoteRef = useRef<HTMLVideoElement>(null);

    const setupSources = async () => {
        const localStream = await navigator.mediaDevices.getUserMedia({
            video: true,
            audio: true,
        });
        const remoteStream = new MediaStream();

        localStream.getTracks().forEach((track) => {
            pc.addTrack(track, localStream);
        });

        pc.ontrack = (event) => {
            event.streams[0].getTracks().forEach((track) => {
                remoteStream.addTrack(track);
            });
        };

        if (localRef.current) localRef.current.srcObject = localStream;
        if (remoteRef.current) remoteRef.current.srcObject = remoteStream;

        setWebcamActive(true);

        if (mode === "create") {
            const callDoc = firestore.collection("calls").doc();
            const offerCandidates = callDoc.collection("offerCandidates");
            const answerCandidates = callDoc.collection("answerCandidates");

            setRoomId(callDoc.id);

            pc.onicecandidate = (event) => {
                event.candidate &&
                    offerCandidates.add(event.candidate.toJSON());
            };

            const offerDescription = await pc.createOffer();
            await pc.setLocalDescription(offerDescription);

            const offer = {
                sdp: offerDescription.sdp,
                type: offerDescription.type,
            };

            await callDoc.set({ offer });

            callDoc.onSnapshot((snapshot) => {
                const data = snapshot.data();
                if (!pc.currentRemoteDescription && data?.answer) {
                    const answerDescription = new RTCSessionDescription(
                        data.answer
                    );
                    pc.setRemoteDescription(answerDescription);
                }
            });

            answerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        const candidate = new RTCIceCandidate(
                            change.doc.data()
                        );
                        pc.addIceCandidate(candidate);
                    }
                });
            });
        } else if (mode === "join") {
            const callDoc = firestore.collection("calls").doc(callId);
            const answerCandidates = callDoc.collection("answerCandidates");
            const offerCandidates = callDoc.collection("offerCandidates");

            pc.onicecandidate = (event) => {
                event.candidate &&
                    answerCandidates.add(event.candidate.toJSON());
            };

            const callData = (await callDoc.get()).data();

            const offerDescription = callData?.offer;
            if (offerDescription) {
                await pc.setRemoteDescription(
                    new RTCSessionDescription(offerDescription)
                );

                const answerDescription = await pc.createAnswer();
                await pc.setLocalDescription(answerDescription);

                const answer = {
                    type: answerDescription.type,
                    sdp: answerDescription.sdp,
                };

                await callDoc.update({ answer });
            }

            offerCandidates.onSnapshot((snapshot) => {
                snapshot.docChanges().forEach((change) => {
                    if (change.type === "added") {
                        let data = change.doc.data();
                        pc.addIceCandidate(new RTCIceCandidate(data));
                    }
                });
            });
        }

        pc.onconnectionstatechange = (event) => {
            if (pc.connectionState === "disconnected") {
                hangUp();
            }
        };
    };

    const hangUp = async () => {
        pc.close();

        if (roomId) {
            let roomRef = firestore.collection("calls").doc(roomId);
            await roomRef
                .collection("answerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });
            await roomRef
                .collection("offerCandidates")
                .get()
                .then((querySnapshot) => {
                    querySnapshot.forEach((doc) => {
                        doc.ref.delete();
                    });
                });

            await roomRef.delete();
        }

        window.location.reload();
    };

    return (
        <div className="videos">
        <video ref={localRef} autoPlay playsInline className="local" muted />
        <video ref={remoteRef} autoPlay playsInline className="remote" />
  
        <div className="buttonsContainer">
          <button onClick={hangUp} disabled={!webcamActive} className="hangup button">
            <PhoneDisabled /> {/* Utilisez l'icône PhoneDisabled de Material-UI */}
          </button>
          <div tabIndex={0} role="button" className="more button">
            <MoreVert /> {/* Utilisez l'icône MoreVert de Material-UI */}
            <div className="popover">
              <button onClick={() => { navigator.clipboard.writeText(roomId || ''); }}>
                <FileCopy /> {/* Utilisez l'icône FileCopy de Material-UI */}
                Copy joining code
              </button>
            </div>
          </div>
        </div>
  
        {!webcamActive && (
          <div className="modalContainer">
            <div className="modal">
              <h3>Turn on your camera and microphone and start the call</h3>
              <div className="container">
                <button onClick={() => setPage("home")} className="secondary">
                  Cancel
                </button>
                <button onClick={setupSources}>Start</button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
  
export default Meet;
