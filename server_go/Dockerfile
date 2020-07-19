FROM golang:latest
RUN mkdir /app
ADD . /app/
WORKDIR /app
RUN go get
RUN go build -o main .
EXPOSE 8080
CMD ["/app/main"]
