DIR := ${CURDIR}

docker.build:
	docker build -t fib-testnet .;

docker.run.init:
	docker run -p 8801:8801 -p 9801:9801 \
	-v ${DIR}/blockData:/app/blockData fib-testnet init;

docker.run.start:
	docker run -p 8801:8801 -p 9801:9801 \
	-v ${DIR}/blockData:/app/blockData fib-testnet start;