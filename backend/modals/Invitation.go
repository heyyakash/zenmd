package modals

import "time"

type Invitation struct {
	Id              string
	Recipient_email string
	Sender_email    string
	File            string
	Permission      string
	Created_at      time.Time
}
