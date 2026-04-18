import os

import requests


def send_telegram_message():
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")

    if not token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN secret is missing.")
    if not chat_id:
        raise RuntimeError("TELEGRAM_CHAT_ID secret is missing.")

    message = "GitHub Actions에서 보내는 예약 메시지입니다! 🚀"
    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": message,
    }

    response = requests.post(url, data=payload, timeout=15)
    if response.status_code == 200:
        print("메시지 발송 성공!")
    else:
        print(f"발송 실패: {response.status_code}")
        print(response.text)
        response.raise_for_status()


if __name__ == "__main__":
    send_telegram_message()
