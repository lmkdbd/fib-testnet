## fib-testnet

### docker 启动
### 启动步骤
1. 运行 `docker-compose build`
2. 运行  `docker run -p 8801:8801 -p 9801:9801 -v 你所在的目录/blockData:/app/blockData 容器名 init`
3. 待上一步结束后，运行 `docker run -p 8801:8801 -p 9801:9801 -v 你所在的目录/blockData:/app/blockData 容器名`
