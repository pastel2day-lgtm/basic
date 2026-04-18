import os
from datetime import datetime, timedelta, timezone

import requests


MESSAGES = {
    "weekday": """⭐️⭐️삼일예배 취합⭐️⭐️
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

사전 예배 취합 현황입니다. 취합하실 분 부탁드리고 변동 있으면 알려 주세요 🙏""",
    "sunday": """⭐️⭐️주일예배 취합⭐️⭐️
#1구역
✅ 1부 예배(12:00)
홍대의 김은지a 김규수 송주영(해외) 우상한 김지연 박슬기

✅ 2부 예배(16:00)
박이레 임승환

✅ 3부 예배(19:30)
박주섭

✅ 타교회(교회/시간)

✅ 협력교회
박여리 구본영

☑️ 대체예배(이름/날짜 및 시간/방법/사유)
* 방법: 대체 1,2부, 내부복음방, 기타
조영광/직장/기타
박수정/시험/기타

☑️ 온라인예배(이름/날짜 및 시간/방법/사유)
* 방법: 비매오, 줌
임수정/비매오

‼️미취합자

사전 예배 취합 현황입니다. 취합하실 분 부탁드리고 변동 있으면 알려 주세요 🙏""",
    "group": """⭐️⭐️구역예배 취합⭐️⭐️
#1구역
✅ 구역 예배[토22:30(줌)]
홍대의 박여리 박슬기 박이레 박주섭 김규수 우상한 송주영 김지연

✅ 구역 예배[일 21:30(줌)]

☑️ 개별 구역 예배 00/00
* 이름/사유/시간
조영광/주일
박수정
임승환
김은지a

‼️미취합자 00/00
임수정 구본영

사전 구역 예배 취합 현황입니다. 취합하실 분 부탁드리고 변동 있으면 알려 주세요 🙏""",
}


def get_message():
    message_type = os.environ.get("MESSAGE_TYPE")
    if message_type:
        try:
            return MESSAGES[message_type]
        except KeyError as exc:
            choices = ", ".join(sorted(MESSAGES))
            raise RuntimeError(f"Unknown MESSAGE_TYPE: {message_type}. Use one of: {choices}.") from exc

    kst_now = datetime.now(timezone.utc) + timedelta(hours=9)
    if kst_now.weekday() == 0:
        return MESSAGES["weekday"]
    if kst_now.weekday() == 2:
        return MESSAGES["group"]
    if kst_now.weekday() == 4:
        return MESSAGES["sunday"]

    raise RuntimeError("No message is configured for today.")


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
        "text": get_message(),
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
