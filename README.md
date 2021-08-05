# studynodejs

### **따라하며 배우는 노드, 리액트 시리즈 - 영화 사이트 만들기**

https://inf.run/Tg4y



### 기능

회원가입과 로그인기능
auth를 통한 인증기능(관리자, 회원, 비회원 창 구분(hoc)).
redux를 상태관리
영화 api를 이용한 영화 검색기능, 댓글, 리뷰 기능 등의 기본적인 영화 리뷰 사이트


### 문제점
로그인할때의 입력과 한계값등의 제한을주기 위한 라이브러리 formik와 yup가 설치되지 않은 관계로
로그인할때 필수조건을들 나타낼 수 없었다..


### 개발 도구

1. node.js 
2. react
3. mongoDB
4. postman



### 설치 라이브러리

1. mongoose : 몽고DB사용
2. bcrypt : 비밀번호 암호화(salt)
3. jsonwebtoken : 웹의 쿠키에 저장할 토큰 만들기
4. express
5. cookieParser : 쿠키에 저장하기위함
6. BodyParser : 파싱을 위해
7. nodemon : 웹이 바로바로 바뀜
8. axios : ajax통신을 위해
9. http-proxy-middleware : CROS문제를 해결하기 위해 //client부분에
10. concurrently : 백서버와 프론트 서버를 한번에 킬 수 있게 해준다
11. antd : css 프레임워크
12. redux : 상태 관리 라이브러리

###### **package.json**

```
//server
  "version": "1.3.7",
  "lockfileVersion": 2,
  "requires": true,
  "packages": {
    "": {
      "name": "nodefstudy",
      "version": "1.3.7",
      "dependencies": {
        "bcrypt": "^5.0.1",
        "body-parser": "^1.19.0",
        "concurrently": "^6.2.0",
        "cookie-parser": "^1.4.5",
        "cors": "^2.8.5",
        "dcrypt": "^0.0.2",
        "express": "^4.17.1",
        "jsonwebtoken": "^8.5.1",
        "mongoose": "^5.13.5",
        "mongoose-timestamp": "^0.6.0",
        "path": "^0.12.7"
      },
      "devDependencies": {
        "@ant-design/icons": "^4.6.2",
        "nodemon": "^2.0.12"

        //이하생략
      }

//client
{
  "name": "client",
  "version": "0.1.0",
  "private": true,
  "dependencies": {
    "@testing-library/jest-dom": "^5.14.1",
    "@testing-library/react": "^11.2.7",
    "@testing-library/user-event": "^12.8.3",
    "axios": "^0.21.1",
    "http-proxy-middleware": "^2.0.0",
    "react": "^17.0.2",
    "react-dom": "^17.0.2",
    "react-redux": "^7.2.4",
    "react-router-dom": "^5.2.0",
    "react-scripts": "4.0.3",
    "redux": "^4.1.0",
    "redux-promise": "^0.6.0",
    "redux-thunk": "^2.3.0",
    "web-vitals": "^1.1.2"
  },
  "scripts": {
    "start": "react-scripts start",
    "build": "react-scripts build",
    "test": "react-scripts test",
    "eject": "react-scripts eject"
  },
  "eslintConfig": {
    "extends": [
      "react-app",
      "react-app/jest"
    ]
  },
  "browserslist": {
    "production": [
      ">0.2%",
      "not dead",
      "not op_mini all"
    ],
    "development": [
      "last 1 chrome version",
      "last 1 firefox version",
      "last 1 safari version"
    ]
  },
  "devDependencies": {
    "@ant-design/icons": "^4.6.2",
    "antd": "^4.16.10"
  }
}



```

