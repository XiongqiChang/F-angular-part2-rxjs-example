OTR Website
---

## Environment

### Platform

- Nodejs: 7.7

## Install 

`npm install`

## Configuration Explain

proxy.conf.json位于根目录下，是代理配置文件，用来解决跨域请求问题。
```
{
  "/api": {
    "target": "http://localhost:9000",
    "secure": false
  }
}
```



**target**:表示后端服务器端口号，如果是在local环境下开发，需要把它修改为本地nginx地址

**secure**:表示是否开启ssl验证，在这里设置为false


## Lint

- Check typescript lint: `npm run lint`
- Check css lint: `npm run stylelint`

## Run 

- Run: `npm start`
- View: open `http://localhost:8001/` in browser

## Build

- Production Environment: `npm run build:prod`
- Development Environment: `npm run build`

## Folder

- src: project code source