export default {
  secret: process.env.APP_SECRET, // texto que só eu sei o que gera esse token (vmnoggobarber no site md5online.org)
  expiresIn: '7d' // data de expiração do token
};
