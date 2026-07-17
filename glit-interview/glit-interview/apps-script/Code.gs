/**
 * 글릿 인터뷰 신청 폼 → 구글시트 저장
 *
 * 설정 방법 (한 번만 하면 됩니다):
 * 1. 구글시트 열기: https://docs.google.com/spreadsheets/d/1_TrSXd427sDwE7o3Z4xy7t9xg2aLgzdWZ8aA06X9FII/edit
 * 2. 메뉴에서 [확장 프로그램] → [Apps Script] 클릭
 * 3. 열린 편집기에 이 파일 내용을 전부 붙여넣기 (기존 코드는 지우기)
 * 4. 오른쪽 위 [배포] → [새 배포] 클릭
 * 5. 톱니바퀴(유형 선택) → [웹 앱] 선택
 *    - 실행 계정: 나
 *    - 액세스 권한: 모든 사용자
 * 6. [배포] 클릭 → 권한 승인 → 발급된 "웹 앱 URL"(…/exec로 끝남)을 복사
 * 7. 그 URL을 알려주시면 apply.html에 연결해서 재배포해드립니다.
 */

const SHEET_ID = '1_TrSXd427sDwE7o3Z4xy7t9xg2aLgzdWZ8aA06X9FII';

function doPost(e) {
  const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];

  // 첫 행이 비어 있으면 헤더 추가
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(['신청일시', '이름', '전화번호', '인스타 아이디']);
  }

  const p = e.parameter;
  sheet.appendRow([
    Utilities.formatDate(new Date(), 'Asia/Seoul', 'yyyy-MM-dd HH:mm:ss'),
    p.name || '',
    p.phone || '',
    p.instagram || '',
  ]);

  return ContentService
    .createTextOutput(JSON.stringify({ ok: true }))
    .setMimeType(ContentService.MimeType.JSON);
}
