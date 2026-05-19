from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import random
import json
import base64

router = APIRouter()

CHALLENGES = ["blink", "turn_left", "turn_right", "smile"]

@router.websocket("/ws/liveness/{session_id}")
async def liveness_websocket(websocket: WebSocket, session_id: str):
    await websocket.accept()
    print(f"Client connected: session={session_id}")

    challenges = random.sample(CHALLENGES, 3)
    current_index = 0

    await websocket.send_json({
        "type": "challenge_start",
        "sequence": challenges,
        "current": challenges[0]
    })

    try:
        while current_index < len(challenges):
            data = await websocket.receive()

            if "text" in data:
                message = json.loads(data["text"])

                # ── React Native sends frames as base64 ───────────────────────
                if message.get("type") == "frame":
                    frame_bytes = base64.b64decode(message["data"])
                    print(f"Received frame: {len(frame_bytes)} bytes")

                    # Frame received — acknowledge back to React Native
                    # Gesture verification will be added here in next step
                    await websocket.send_json({
                        "type": "frame_received",
                        "current_challenge": challenges[current_index]
                    })

                # ── Hoppscotch testing still works ────────────────────────────
                elif message.get("type") == "gesture_done":
                    gesture = message.get("gesture")
                    if gesture == challenges[current_index]:
                        current_index += 1
                        if current_index < len(challenges):
                            await websocket.send_json({
                                "type": "progress",
                                "completed": challenges[:current_index],
                                "next": challenges[current_index]
                            })

            # Raw bytes fallback
            elif "bytes" in data:
                await websocket.send_json({
                    "type": "frame_received",
                    "current_challenge": challenges[current_index]
                })

        # All challenges done
        fake_token = f"liveness_token_{session_id}_passed"
        await websocket.send_json({
            "type": "passed",
            "token": fake_token
        })
        print(f"Session {session_id} passed liveness")

    except WebSocketDisconnect:
        print(f"Client disconnected: session={session_id}")