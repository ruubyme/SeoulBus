# 🚎 서울버스 도착정보 
> 정류장명 검색, 카카오맵 지도를 활용한 좌표기반 정류장 검색, 해당 정류장의 모든 버스 도착정보, 즐겨찾는 정류장 

## 💡 아키텍처 

<img width="447" alt="image" src="https://github.com/ruubyme/SeoulBus/assets/66954232/50b28bef-ca11-4e7d-bda8-c618e731a3fe">



## 💡 기술 스택
**1. Frontend** :
   * React 
   * TypeScript
   * Tailwind CSS
   * Redux
   * React-Query
   * AWS S3 cloudfront
   
**2. Backend** :
   * express (API server)
   * mongoDB Atlas (Database)
   * AWS EC2


## 💡 주요 기능

1. 정류장 명 검색
2. 카카오 맵을 활용한 좌표 기반 정류장 검색, 현재 위치를 기반으로 주변 정류장 확인
3. 특정 정류장의 모든 버스 도착정보 (1분마다 데이터 갱신)
4. 카카오 지도를 활용한 길찾기
5. 즐겨찾는 정류장 


## 🖥️ 기술 세부사항

**Frontend** :
   * Redux 를 활용한 상태관리
   * ReactQuery의 캐싱을 활용하여 불필요한 network call 감소 
   * kakaoMap api를 활용하여 현재 위치를 기반으로 주변 정류장 위치 확인
   * Redux-persist를 활용하여 거의 변하지 않는 정류장명 검색 결과를 localstorage에 저장 후 해당 데이터에 빠르게 접근
   * ReactQuery의 refetchInterval 옵션을 활용하여 1분 간격으로 도착 정보 갱신 
     
   


## 📂 Database 구조

> `users` 
> 사용자 정보
> { uuid: uuid값 }

>`favoritestations`
> 사용자별 즐겨찾는 정류장
> { uuid: uuid값,
>   bookmakrs: [],
>}


## 🌐 API Endpoints
### 정류장명 검색
* **GET /search**: keyword 값이 포함된 모든 정류장 검색 
  * **Required Parameters**: `keyword`:

### 특정 정류소의 모든 노선(버스) 조회
* **GET /busRoutes**
  * **Required Parameters**: `arsId`: 정류장ID

### 정류소 순번 조회
* **GET /stationOrd**: 버스 노선 에서 해당 정류장의 순번 조회
  * **Required Parameters**: `busRouteId`: 버스 ID
 
### 버스 도착정보 조회 
* **GET /busArriveInfo**
  * **Required Parameters**: `busRouteId`: 버스 ID, `stId`: 정류장 ID, `seq`: 노선의 정류장 순번
 
### 좌표로 버스정류장 조회
* **GET /searchBusStationPos**
  * **Required Parameters**: `latitude`, `longitude`

### 즐겨찾는 정류장 
* **GET /bookmarks** : 즐겨찾는 정류장 조회 
    
* **POST /bookmakrs**: 즐겨찾는 정류장 추가
  * **Required JSON Body**: `station`: 정류장 정보
 
* **DELETE /bookmakrs**: 즐겨찾는 정류장 삭제 
  * **Required Parameters**: `stationId`



## overview
* 정류장명 검색

https://github.com/ruubyme/SeoulBus/assets/66954232/66299619-b648-4f44-b230-288be77845ea

* 버스도착정보 페이지
  
https://github.com/ruubyme/SeoulBus/assets/66954232/f1927b9e-f832-4404-9a94-2cd6067a2300

* kakao Map에서 현재 위치를 기반으로 주변 정류장 확인

https://github.com/ruubyme/SeoulBus/assets/66954232/7621c325-85b1-494c-9446-1c3c72e4be60

* 즐겨찾는 정류장

https://github.com/ruubyme/SeoulBus/assets/66954232/2f712cd4-4bcc-4ee5-9822-6ca195b9dd9d

