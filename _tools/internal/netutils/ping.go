package netutils

import (
	"context"
	"net/http"
	"time"
)

func Ping(url string) bool {
	ctx, cancel := context.WithTimeout(context.Background(), (time.Second * 3))
	defer cancel()
	req, err := http.NewRequestWithContext(ctx, http.MethodHead, url, nil)
	if err != nil {
		return false
	}
	res, err := http.DefaultClient.Do(req)
	if err != nil {
		return false
	}
	defer res.Body.Close()
	return true
}
