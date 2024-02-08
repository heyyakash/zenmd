package db

func (s *PostgresStore) CreateNewInvitation(sender_email string, recepient_email string, file string) (string, error) {
	query := `insert into invitations (recipient_email, sender_email, file) values ($1,$2,$3) returning id`
	var id string
	err := s.db.QueryRow(query, recepient_email, sender_email, file).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, err
}
