package utilities

import (
  "net/http"

  log "github.com/sirupsen/logrus"
)

type loggingResponseWriter struct {
    http.ResponseWriter
    statusCode int
}

func LoggingResponseWriter(w http.ResponseWriter) *loggingResponseWriter {
    return &loggingResponseWriter{w, http.StatusOK}
}

func (lrw *loggingResponseWriter) WriteHeader(code int) {
    lrw.statusCode = code
    lrw.ResponseWriter.WriteHeader(code)
}

func LogRequest(handler http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		lrw := LoggingResponseWriter(w)

		handler.ServeHTTP(lrw, r)

		log.WithFields(log.Fields{"remote_addr": r.RemoteAddr,
	       "method": r.Method,
				 "url": r.URL.String(),
				 "userAgent": r.Header.Get("User-Agent"),
				 "statusCode": lrw.statusCode}).Info("")
	})
}
