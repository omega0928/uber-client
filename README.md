## App Description 

사용자가 목적지를 선택하여 드라이버에게 요청 하면 드라이버가 수락하여 거리에 따른 요금을
받고 사용자와 드라이버를 연결시켜주는 앱

## Tech/framework used

React(Hook), Typescript, graphql - Apollo Client (React)

## Migration

React class component -> hook component
Apollo Client 2.x -> 3.x

## File

### LoggedInPage
- AddPlace = 사용자가 즐겨찾기 할 장소추가
- EditAccount =  로그인된 사용자 정보변경
- FindAddress = 지도에서 장소 선택후 PickPlace 버튼 클릭시 선택된 장소의 정보가
- AddPlace Component로 전달됨
- Home = 사용자가 목적지 선택후 드라이버에게 요청
- Places = 저장된 장소 List 표시
- Settings = 장소 즐겨찾기, 로그아웃, 장소추가

### LoggedOutPage
- Login = 핸드폰 / sns 로그인 선택화면
- PhoneLogin = 핸드폰번호 validation 통과할 경우 Verifyphone component로 이동
- SocialLogin = 가입되어있는 Facebook appId로 로그인
- VerifyPhone = 문자 발송된 key로 핸드폰인증 로그인

