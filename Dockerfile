FROM ubuntu:16.04
WORKDIR /app
COPY package.json /app
RUN apt-get update \
    && apt-get install -y curl sudo libusb-1.0
#    && mkdir -p /var/log/supervisor
RUN curl -s https://fibos.io/download/installer.sh | sh \
    && fibos --install
#COPY supervisord.conf /etc/supervisord.conf
COPY . /app
#CMD ["/usr/bin/supervisord"]
ENTRYPOINT ["./entrypoint.sh"]
CMD ["start"]