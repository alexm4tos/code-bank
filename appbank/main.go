package main

import (
	"database/sql"
	"fmt"
	"log"

	"github.com/alexm4tos/code-bank/infrastructure/grpc/server"
	"github.com/alexm4tos/code-bank/infrastructure/kafka"
	"github.com/alexm4tos/code-bank/infrastructure/repository"
	"github.com/alexm4tos/code-bank/usecase"
	_ "github.com/lib/pq"
)

func main() {
	db := setupDb()

	defer db.Close()

	producer := setupKafkaProducer()
	processTransactionUseCase := setupTransactionUseCase(db, producer)

	serveGrpc(processTransactionUseCase)
}

func setupKafkaProducer() kafka.KafkaProducer {
	producer := kafka.NewKafkaProducer()
	producer.SetupProducer("host.docker.internal:9094")

	return producer
}

func setupTransactionUseCase(db *sql.DB, producer kafka.KafkaProducer) usecase.UseCaseTransaction {
	transactionRepository := repository.NewTransactionRepositoryDb(db)

	transactionUseCase := usecase.NewUseCaseTransaction(transactionRepository)
	transactionUseCase.KafkaProducer = producer

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

func serveGrpc(processTransactionUseCase usecase.UseCaseTransaction) {
	grpcServer := server.NewGRPCServer()
	grpcServer.ProcessTransactionUseCase = processTransactionUseCase

	fmt.Println("Starting gRPC server...")

	grpcServer.Serve()
}
