# IoT 기술을 활용한 반려동물 돌봄 서비스
<p align="center">
  <img src="readmeimg/pjmain.PNG">
</p>

## 프로젝트 개요
#### 주제 : 스마트홈 기술을 활용한 반려동물 케어 서비스
1. 국내 반려동물 가구의 증가에 따른 관련 서비스 제작
2. 견주에게 반려동물의 건강 데이터를 제공 및 솔루션 제공
3. 기존 스마트홈 제품의 한계 극복
## 주요 기능
1. 웹페이지 내 반려동물 사료 제공 서비스
2. 반려동물의 체충 데이터 수집 및 시각화
3. 웹페이지 내 게시판 기능을 통한 커뮤니티 기능 
## 기술 스택
|구분|사용기술|
|------|---|
|Front-End|<img src="https://img.shields.io/badge/react-61DAFB?style=for-the-badge&logo=react&logoColor=black"> <img src="https://img.shields.io/badge/javascript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black"> <img src="https://img.shields.io/badge/bootstrap-7952B3?style=for-the-badge&logo=bootstrap&logoColor=white"> <img src="https://img.shields.io/badge/css-1572B6?style=for-the-badge&logo=css3&logoColor=white"> |
|Back-End|<img src="https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=Node.js&logoColor=white"> <img src="https://img.shields.io/badge/flask-000000?style=for-the-badge&logo=flask&logoColor=white"> |
|DB|<img src="https://img.shields.io/badge/oracle-F80000?style=for-the-badge&logo=oracle&logoColor=white">|
|IoT|<img src="https://img.shields.io/badge/Raspberry_Pi-A22846?style=for-the-badge&logo=RaspberryPi&logoColor=white"> <img src="https://img.shields.io/badge/Arduino-00878F?style=for-the-badge&logo=Arduino&logoColor=white">|

## 시스템 아키텍쳐
<p align="center">
  <img src="readmeimg/system.PNG">
</p>

## WEB 페이지
#### 메인페이지
<p align="center">
  <img src="readmeimg/web1.png">
</p>

#### 게시판
<p align="center">
  <img src="readmeimg/t1.png">
</p>

#### 체중데이터 시각화 페이지
<p align="center">
  <img src="readmeimg/web2.png">
</p>

#### 마이펫 관리 페이지 
<p align="center">
  <img src="readmeimg/web3.png">
</p>

## 트러블 슈팅 
#### 게시판 구현 중 Pagination이 적용되지 않았던 문제
<p align="center">
  <img src="readmeimg/t1.png">
</p>
Pagination에 할당된 state와 게시판 목록에 할당된 state가 달라서 서로 영향을 주지 못하는 것을 파악 후,
Pagination에 초기 state 값으로 할당하여 Pagination을 map 함수 안 index를 활용하여 해결

#### 아두이노 자체적인 무한루프
<p align="center">
  <img src="readmeimg/t2.PNG">
</p>
라즈베리파이에서 실행 시간을 조절하여 아두이노가 실행되는 시간을 같이 조절하여 해결


## 팀원
<p align="center">
  <img src="readmeimg/team.PNG">
</p>
