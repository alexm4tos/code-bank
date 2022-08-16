package usecase

import (
	"encoding/json"
	"time"

	"github.com/alexm4tos/code-bank/domain"
	"github.com/alexm4tos/code-bank/dto"
	"github.com/alexm4tos/code-bank/infrastructure/kafka"
)

type UseCaseTransaction struct {
	TransactionRepository domain.TransactionRepository
	KafkaProducer         kafka.KafkaProducer
}

func NewUseCaseTransaction(transactionRepository domain.TransactionRepository) UseCaseTransaction {
	return UseCaseTransaction{TransactionRepository: transactionRepository}
}

func (u UseCaseTransaction) ProcessTransaction(transactionDto dto.Transaction) (domain.Transaction, error) {
	creditCard := u.hydrateCreditCard(transactionDto)
	creditCardData, err := u.TransactionRepository.GetCreditCard(*creditCard)

	if err != nil {
		return domain.Transaction{}, err
	}

	creditCard.ID = creditCardData.ID
	creditCard.Limit = creditCardData.Limit
	creditCard.Balance = creditCardData.Balance

	transaction := u.newTransaction(transactionDto, creditCardData)

	transaction.ProcessAndValidate(creditCard)

	err = u.TransactionRepository.SaveTransaction(*transaction, *creditCard)

	if err != nil {
		return domain.Transaction{}, err
	}

	transactionDto.ID = transaction.ID
	transactionDto.CreatedAt = transaction.CreatedAt

	transactionJson, err := json.Marshal(transactionDto)

	if err != nil {
		return domain.Transaction{}, err
	}

	err = u.KafkaProducer.Publish(string(transactionJson), "payments")

	if err != nil {
		return domain.Transaction{}, err
	}

	return *transaction, nil
}

func (u UseCaseTransaction) hydrateCreditCard(transactionDto dto.Transaction) *domain.CreditCard {
	creditCard := domain.NewCreditCard()

	creditCard.Name = transactionDto.Name
	creditCard.Number = transactionDto.Number
	creditCard.ExpirationMonth = transactionDto.ExpirationMonth
	creditCard.ExpirationYear = transactionDto.ExpirationYear
	creditCard.CVV = transactionDto.CVV

	return creditCard
}

func (u UseCaseTransaction) newTransaction(transaction dto.Transaction, creditCard domain.CreditCard) *domain.Transaction {
	newTransaction := domain.NewTransaction()

	newTransaction.CreditCardId = creditCard.ID
	newTransaction.Amount = transaction.Amount
	newTransaction.Store = transaction.Store
	newTransaction.Description = transaction.Description
	newTransaction.CreatedAt = time.Now()

	return newTransaction
}
