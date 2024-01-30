package db

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/heyyakash/zenmd/helpers"
	"github.com/heyyakash/zenmd/modals"
	_ "github.com/lib/pq"
)

// type Storage interface {
// 	CreateAccount(*modals.User) error

// }

type PostgresStore struct {
	db *sql.DB
}

var Database *PostgresStore

var (
	database = helpers.LoadString("POSTGRES_DB")
	password = helpers.LoadString("POSTGRES_PASSWORD")
	user     = helpers.LoadString("POSTGRES_USER")
)

func NewPostgresStore() error {
	connStr := "user=" + user + " dbname=" + database + " password=" + password + " sslmode=disable"
	db, err := sql.Open("postgres", connStr)
	if err != nil {
		return err
	}
	if err := db.Ping(); err != nil {
		return err
	}
	Database = &PostgresStore{
		db: db,
	}
	Database.InitDB()
	log.Print("*** DB Initalized ***")
	return nil
}

func (s *PostgresStore) CreateAccounTable() error {
	query := `create table if not exists account (
		name varchar(100),
		email varchar(100) primary key,
		image varchar(200),
		password varchar(100)
	)`
	_, err := s.db.Exec(query)
	return err
}

func (s *PostgresStore) CreateMarkdownTable() error {
	_, err := s.db.Exec(`CREATE EXTENSION IF NOT EXISTS "uuid-ossp"`)
	if err != nil {
		return err
	}
	query := `
	CREATE TABLE if not exists markdown (
		id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
		email VARCHAR(255) NOT NULL,
		name VARCHAR(255) NOT NULL,
		content TEXT,
		shared VARCHAR(255)[]
	)
	`
	_, err = s.db.Exec(query)
	return err
}

func (s *PostgresStore) InitDB() {
	if err := s.CreateAccounTable(); err != nil {
		log.Fatal("Could not initalize account table", err)
	}
	if err := s.CreateMarkdownTable(); err != nil {
		log.Fatal("Could not initialize markdown table", err)
	}
}

func (s *PostgresStore) DoesRowExist(email string, name string) (bool, error) {
	query := `SELECT EXISTS(SELECT 1 FROM markdown WHERE email = $1 AND name = $2)`

	var exists bool
	err := s.db.QueryRow(query, email, name).Scan(&exists)
	if err != nil {
		return false, err
	}

	return exists, nil
}

func (s *PostgresStore) CreateAccount(user *modals.User) error {
	query := `insert into account (name, email, image,password) values ($1, $2, $3, $4)`
	_, err := s.db.Exec(query, user.Name, user.Email, user.Image, user.Password)
	if err != nil {
		return err
	}
	return err
}

func (s *PostgresStore) CreateDocument(email string, name string) (string, error) {
	query := `insert into markdown (email,name,shared,content) values ($1,$2,$3, $4) returning id`
	var id string
	err := s.db.QueryRow(query, email, name, "{}", "### "+name).Scan(&id)
	if err != nil {
		return "", err
	}
	return id, err
}

func (s *PostgresStore) GetAccountByEmail(email string) (*modals.LoginRequest, error) {
	query := "select email, password from account where email=$1"
	row := s.db.QueryRow(query, email)

	var user modals.LoginRequest
	err := row.Scan(&user.Email, &user.Password)
	if err != nil {
		if err == sql.ErrNoRows {
			return nil, fmt.Errorf("Account not found")
		}
		return nil, err
	}

	return &user, nil
}

// func (s *PostgresStore) CreateANewFile(name string, email string) error {
// 	query := `insert into accounts`
// }
