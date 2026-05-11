from fastapi import APIRouter, WebSocket, WebSocketDisconnect
import random
import json

router = APIRouter()

CHALLENGES = ["blink", "turn_left", "turn_right", "smile"]

@router.websocket("/ws/liveness/{session_id}")
async def liveness_websocket(websocket: WebSocket, session_id: str):
    await websocket.accept()
    print(f"Client connected: session={session_id}")

    # Randomize challenge sequence every session
    challenges = random.sample(CHALLENGES, 3)
    current_index = 0

    # Send challenge sequence to client
    await websocket.send_json({
        "type": "challenge_start",
        "sequence": challenges,
        "current": challenges[0]
    })

    try:
        while current_index < len(challenges):
            data = await websocket.receive()

            # Text message — for testing via Hoppscotch
            if "text" in data:
                message = json.loads(data["text"])

                if message.get("type") == "gesture_done":
                    gesture = message.get("gesture")

                    if gesture == challenges[current_index]:
                        current_index += 1

                        # More challenges remaining
                        if current_index < len(challenges):
                            await websocket.send_json({
                                "type": "progress",
                                "completed": challenges[:current_index],
                                "next": challenges[current_index]
                            })

            # Bytes — real frames from React Native (just acknowledge for now)
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