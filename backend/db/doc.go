package db

import (
	"log"

	"github.com/heyyakash/zenmd/modals"
)

func (s *PostgresStore) CreateNewInvitation(sender_email string, recepient_email string, file string, permission string) (string, error) {
	query := `insert into invitations (recipient_email, sender_email, file,permission) values ($1,$2,$3,$4) returning id`
	var id string
	err := s.db.QueryRow(query, recepient_email, sender_email, file, permission).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, err
}

func (s *PostgresStore) GetInvitationById(id string) (*modals.Invitation, error) {
	query := `select id,recipient_email, sender_email, file,permission, created_at from invitations where id=$1`
	row, err := s.db.Query(query, id)
	if err != nil {
		return nil, err
	}
	defer row.Close()
	var invitation modals.Invitation
	for row.Next() {
		err := row.Scan(&invitation.Id, &invitation.Recipient_email, &invitation.Sender_email, &invitation.File, &invitation.Permission, &invitation.Created_at)
		if err != nil {
			return nil, err
		}
	}
	log.Print(invitation)
	return &invitation, err
}

func (s *PostgresStore) AddToShared(shared *modals.Shared) error {
	query := `insert into shared (recipient_email, sender_email, file,permission) values ($1,$2,$3,$4)`
	_, err := s.db.Exec(query, shared.Recipient_email, shared.Sender_email, shared.File, shared.Permission)
	return err
}

func (s *PostgresStore) DeleteInvitation(id string) error {
	query := `delete from invitations where id=$1`
	_, err := s.db.Exec(query, id)
	return err
}
