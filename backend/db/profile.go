package db

import "database/sql"

func (s *PostgresStore) CheckEmailExistence(email string) (bool, error) {
	query := `select email from account where email=$1`
	var exists bool = false
	var existingEmail string
	err := s.db.QueryRow(query, email).Scan(&existingEmail)
	if err != nil {
		if err == sql.ErrNoRows {
			return false, nil
		}
		return exists, err
	}
	return true, nil
}
