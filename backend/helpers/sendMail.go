package helpers

import (
	"net/smtp"

	"github.com/heyyakash/zenmd/modals"
)

var (
	smtpHost  = LoadString("SMTP_HOST")
	smtpPort  = LoadString("SMTP_PORT")
	smtpEmail = LoadString("SMTP_EMAIL")
	smtpPass  = LoadString("SMTP_PASSWORD")
)

func SendEmail(mail *modals.Email) error {
	auth := smtp.PlainAuth("", smtpEmail, smtpPass, smtpHost)
	err := smtp.SendMail(smtpHost+":"+smtpPort, auth, smtpEmail, []string{mail.To}, []byte(mail.Content))
	return err
}
