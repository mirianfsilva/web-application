[![npm version](https://img.shields.io/npm/v/ejs.svg?style=flat)](https://www.npmjs.com/package/ejs)
[![npm version](https://img.shields.io/npm/v/express.svg?colorB=red&style=flat)](https://www.npmjs.com/package/express)
[![npm version](https://img.shields.io/npm/v/mongoose.svg?style=flat)](https://www.npmjs.com/package/mongoose)
[![npm version](https://img.shields.io/npm/v/passport.svg?style=flat)](https://www.npmjs.com/package/passport)
[![npm version](https://img.shields.io/npm/v/passport-local-mongoose.svg?colorB=green&style=flat)](https://www.npmjs.com/package/passport-local-mongoose)
[![npm version](https://img.shields.io/npm/v/express-session.svg?style=flat)](https://www.npmjs.com/package/express-session)

### A Bank Account Management Simulation
Simple banking application using (MEN) MongoDB, Express.js and Node.js.

### Content:
- HTML/CSS
- Javascript
- MongoDB
- NodeJs
- Express Framework

#### Installing MongoDB on a Cloud9 workspace
```
sudo apt-get install -y mongodb-org
```
#### Running MongoDB on a Cloud9 workspace
```
$ mkdir data
$ echo 'mongod --bind_ip=$IP --dbpath=data --nojournal --rest "$@"' > mongod
$ chmod a+x mongod
```
Start mongodb by running the mongod script on your project root:
``` ./mongod ```

### Screenshots:
![alt text](https://github.com/mirianfsilva/web-application/blob/master/images/homepage.png)


![alt text](https://github.com/mirianfsilva/web-application/blob/master/images/yourbank.png)


![alt text](https://github.com/mirianfsilva/web-application/blob/master/images/newclientpage.png)
