# studynodejs

### **따라하며 배우는 노드, 리액트 시리즈 - 기본 강의**

https://inf.run/RydQ



### 기능

회원가입과 로그인기능



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
12. redux : 

###### **package.json**

```
{
  "name": "nodefstudy",
  "version": "1.3.7",
  "main": "index.js",
  "scripts": {
    "start": "node index.js",
    "backend": "nodemon index.js",
    "test": "echo \"Error: on test specified\" && exit 1"
  },
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.19.0",
    "cookie-parser": "^1.4.5",
    "dcrypt": "^0.0.2",
    "express": "^4.17.1",
    "jsonwebtoken": "^8.5.1",
    "mongoose": "^5.13.5"
  },
  "devDependencies": {
    "nodemon": "^2.0.12"
  }
}
```

