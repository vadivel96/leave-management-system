const indexRouter=require('../index');
const loginRouter=require('../login');
const signupRouter=require('../signup');
const leaveRouter=require('../leave');
const sampleRouter=require('../sampleToken')

const routes = [
    { path: '/', router: indexRouter },
    { path: '/login', router: loginRouter },
    { path: '/signup', router: signupRouter },
    { path: '/leave', router: leaveRouter },
    { path: '/sampleToken', router: sampleRouter }
  ];

  module.exports={routes};