package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/alexm4tos/code-bank/domain"
	"github.com/alexm4tos/code-bank/domain/infrastructure/repository"
	"github.com/alexm4tos/code-bank/usecase"
	_ "github.com/lib/pq"
)

func main() {
	db := setupDb()

	defer db.Close()

	creditCard := domain.NewCreditCard()
	creditCard.Number = "1234"
	creditCard.Name = "Alex"
	creditCard.ExpirationYear = 2030
	creditCard.ExpirationMonth = 10
	creditCard.CVV = 123
	creditCard.Limit = 1000
	creditCard.Balance = 0

	repository := repository.NewTransactionRepositoryDb(db)
	err := repository.CreateCreditCard(*creditCard)

	if err != nil {
		fmt.Println("Error creating credit card: ", err)
	} else {
		fmt.Println("New credit card created")
	}
}

func setupTransactionUseCase(db *sql.DB) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)

	transactionUseCase := usecase.NewUseCaseTransaction(transactionRepository)

	return transactionUseCase
}

func setupDb() *sql.DB {
	postgresInfo := fmt.Sprintf("host=%s port=%s user=%s password=%s dbname=%s sslmode=disable",
		"host.docker.internal", // localhost
		"5432",
		"postgres",
		"root",
		"codebank",
	)

	db, err := sql.Open("postgres", postgresInfo)

	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}

	return db
}
