import jwtDecode from 'jwt-decode';

import httpClient from './http-client';


class Auth {
  constructor(){
    this.flush();
  }

  flush(){
    this.isLoggedIn = false;
    this.jwtToken = null;
    this.saveToken = null;
    this.claim = null;
  }

  logout(){
    this.flush();
    localStorage.removeItem('JWT');
  }

  storeToken(){
    localStorage.setItem('JWT', this.jwtToken);
  }

  restoreAuth(){
    if(localStorage.getItem('JWT') === null) return false;
    const token = localStorage.getItem('JWT');

    this.isLoggedIn = true;
    this.jwtToken = token;
    this.saveToken = true;
    this.claim = jwtDecode(token).user;
    return true;
  }

  async attemptAuth(queryString){
    this.flush();

    const response = await httpClient.get('/auth/steam/return' + queryString);

    this.isLoggedIn = true;
    this.jwtToken = response.data.token;
    this.claim = jwtDecode(response.data.token).user;
  }
  async register(data){
    //发起http请求注册
    //console.log(data);
    const response=await httpClient.post('/register',data);
    return response;
  }


  async attempLogin(data) {
    this.flush();
    //从Steam 取到信息
    //这点换成我自己的api 进行登录
    //第一步先把前端调通了来
    const response = await httpClient.post('/user/login',data);

    if(response.data==-1){
  
      return response.data;
    }
    this.isLoggedIn = true;
   // this.jwtToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7InN0ZWFtSUQiOiI3NjU2MTE5OTA5ODAyNzA5NSIsImRpc3BsYXlOYW1lIjoiNzU3MTE0NzYwIiwiYXZhdGFyIjoiaHR0cHM6Ly9zdGVhbWNkbi1hLmFrYW1haWhkLm5ldC9zdGVhbWNvbW11bml0eS9wdWJsaWMvaW1hZ2VzL2F2YXRhcnMvZmUvZmVmNDllN2ZhN2UxOTk3MzEwZDcwNWIyYTYxNThmZjhkYzFjZGZlYi5qcGciLCJhdmF0YXJNZWRpdW0iOiJodHRwczovL3N0ZWFtY2RuLWEuYWthbWFpaGQubmV0L3N0ZWFtY29tbXVuaXR5L3B1YmxpYy9pbWFnZXMvYXZhdGFycy9mZS9mZWY0OWU3ZmE3ZTE5OTczMTBkNzA1YjJhNjE1OGZmOGRjMWNkZmViX21lZGl1bS5qcGciLCJhdmF0YXJGdWxsIjoiaHR0cHM6Ly9zdGVhbWNkbi1hLmFrYW1haWhkLm5ldC9zdGVhbWNvbW11bml0eS9wdWJsaWMvaW1hZ2VzL2F2YXRhcnMvZmUvZmVmNDllN2ZhN2UxOTk3MzEwZDcwNWIyYTYxNThmZjhkYzFjZGZlYl9mdWxsLmpwZyIsIiRzZXRPbkluc2VydCI6eyJwYW5lbEFkbWluIjpmYWxzZX19LCJpYXQiOjE2MDI1Njk3NjB9.NDBwHvJdVz6CqJ44yWIhcqa42W2DeVgaG3tk6KUuG8A";
    this.jwtToken = response.data.token;
    // const responseData = {
    //   user: {
    //     steamID: "76561199098027095",
    //     displayName: "757114760",
    //     avatar: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb.jpg",
    //     avatarMedium: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_medium.jpg",
    //     avatarFull: "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/fe/fef49e7fa7e1997310d705b2a6158ff8dc1cdfeb_full.jpg",
    //     $setOnInsert: {
    //       panelAdmin: false
    //     }
    //   },
    //   iat: 1602569760
    // };
    this.claim = jwtDecode(response.data.token).user;
    this.isLoggedIn=true;
  }

}

export default new Auth();