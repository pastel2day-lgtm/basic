import os

import requests


MESSAGE = """⭐️⭐️삼일예배 취합⭐️⭐️
#1구역
✅1부 예배(12:00) 00/00
우상한 박여리 김지연

✅2부 예배(19:30) 00/00
홍대의 김규수(하남) 김은지a(서대문) 송주영(해외) 박이레 박슬기

✅3부 예배(21:00) 00/00
박주섭 임승환

☑️대체예배 1부 [목12시(3층)] 00/00
* 이름/사유

☑️대체예배 2부 [목19:30(3층)] 00/00
* 이름/사유

개별예배 00/00
* 이름/사유/시간
박수정
임수정

‼️미취합자 00/00
조영광 구본영

사전 예배 취합 현황입니다. 취합하실 분 부탁드리고 변동 있으면 알려 주세요 🙏"""


def send_telegram_message():
    token = os.environ.get("TELEGRAM_BOT_TOKEN")
    chat_id = os.environ.get("TELEGRAM_CHAT_ID")

    if not token:
        raise RuntimeError("TELEGRAM_BOT_TOKEN secret is missing.")
    if not chat_id:
        raise RuntimeError("TELEGRAM_CHAT_ID secret is missing.")

    url = f"https://api.telegram.org/bot{token}/sendMessage"
    payload = {
        "chat_id": chat_id,
        "text": MESSAGE,
    }

    response = requests.post(url, data=payload, timeout=15)
    if response.status_code == 200:
        print("Message sent successfully.")
    else:
        print(f"Failed to send message: {response.status_code}")
        print(response.text)
        response.raise_for_status()


if __name__ == "__main__":
    send_telegram_message()
