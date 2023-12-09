## CamTudy
> 내 컴퓨터 안의 작은 독서실, **캠투디**

<p align="center">

![캠투디친구들](https://user-images.githubusercontent.com/48249505/136792280-8ac138d4-cc2b-4bc1-9ba4-b99bcb07fc6e.png)

</p>

### 🏆 2021학년도 SKKU 인공지능 SW-교육 해커톤 은상 수상작



### 🔮 Feature & User Flow
* **학생들은 자신의 이름을 입력하고 스터디룸에 입장합니다.**
	* 들어갈 스터디룸이 없다면 스터디룸을 생성할 수 있으며, 공개/비공개 여부를 직접 설정할 수 있습니다.
* **스터디룸에 입장하면 집중한 시간이 카운트되기 시작합니다.**
	* 화면에서 시야가 크게 틀어졌거나, 눈을 감거나, 화면에 얼굴이 비치지 않을 경우 공부 집중 시간에 카운트되지 않습니다.
	* 위의 경우 지속 미집중 시간이 카운트되며, 지속 미집중 시간이 30분 이상일 경우 스터디룸에서 **강제 퇴장**당합니다.
	* 집중 시간이 60분씩 추가될 때마다 **캠투디 친구들이 레벨업**합니다. 이 친구들은 수료증에서 만날 수 있습니다. 
* **집중력을 유지하며 공부를 모두 수행하고 방을 나가면 수료증을 얻을 수 있으며, 자신의 점수를 전체 랭킹에 등록할 수 있습니다.**

### Preview
<p align="center"><b>친구들과 함께 공부</b></p>
<p align="center"><img width="510" alt="그림1" src="https://user-images.githubusercontent.com/48249505/136796732-652e8282-519a-4be4-91f1-60d28ab84973.png"></p>
<p align="center"><b>점수를 채워 레벨업</b></p>
<p align="center"><img width="510" src="https://user-images.githubusercontent.com/48249505/136799309-ca1ea9e9-f174-44d8-853f-de58482faacb.gif"></p>
<p align="center"><b>졸다가 강제 퇴장</b></p>
<p align="center"><img width="510" src="https://user-images.githubusercontent.com/48249505/136796450-9a906ca7-27d8-437c-b42f-5b647a1d2299.gif"></p>

### 🗂 Foldering
```
.
├── 📁 api  🏷 백엔드 API 작업
│   ├── ✡️ controller.js  🏷 요청 처리 로직
│   ├── ✡️ dao.js 🏷 DB CRUD 쿼리
│   └── ✡️ router.js  🏷 라우팅 작업
├── 📁 config  🏷 백엔드 기본 세팅
├── ✡️ index.js  🏷 서버 소켓 작업 및 서버 실행
├── 📁 utils  🏷 백엔드 소켓 작업에 쓰이는 모듈들이 있는 디렉터리
│   ├── ✡️ messages.js
│   └── ✡️ users.js
├── 📋 package.json  🏷 npm 패키지 관리
├── 📁 public  🏷 프론트 작업
│   ├── 📁 css
│   ├── 📁 js
│   │   ├── 📁 dist 🏷 빌드된 eye-detactor.js 파일이 포함된 곳
│   │   ├── ✡️ eye-detactor.js  🏷 눈 깜빡임 검사하는 js파일
│   │   └── ✡️ socket.js  🏷 클라이언트 소켓 통신을 위한 js파일
│   ├── 📄 index.html 
│   ├── 📄 result.html 
│   ├── 📄 room.html 
│   └── 📄 select-room.html 
└── 📋 webpack.config.js  🏷 웹팩 설정 파일
```

### 📡 API Document
<p align="center">
<a href="https://documenter.getpostman.com/view/14084929/UUy7aj3J#3e04e761-a6db-48b9-80a3-6830946b4fa8">
<img src="https://user-images.githubusercontent.com/48249505/136793049-ef1e7d8d-0d39-446a-9c09-8173da860db6.png" height="400">
</a>
</p>

### 🗃 Database ERD


### 👩‍👩‍👧‍👧  Contributors


### 🧷 References
reference|purpose
:--|:--
**[socket.io](https://socket.io/)** | for real-time interaction
**[tensorflow.js](https://www.tensorflow.org/js?hl=ko)** | for in-browser machine learning
**[@mirrory-dev/eyeblink](https://github.com/mirrory-dev/eyeblink)** |  for detecting students' attention metric
**[slidesgo](https://slidesgo.com/)**| for design and presentation
