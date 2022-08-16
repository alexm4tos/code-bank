package server

import (
	"log"
	"net"

	"github.com/alexm4tos/code-bank/infrastructure/grpc/pb"
	"github.com/alexm4tos/code-bank/infrastructure/grpc/service"
	"github.com/alexm4tos/code-bank/usecase"
	"google.golang.org/grpc"
	"google.golang.org/grpc/reflection"
)

type GRPCServer struct {
	ProcessTransactionUseCase usecase.UseCaseTransaction
}

func NewGRPCServer() GRPCServer {
	return GRPCServer{}
}

func (g GRPCServer) Serve() {
	listener, err := net.Listen("tcp", "0.0.0.0:50051")

	if err != nil {
		log.Fatalf("failed to listen: %v", err)
	}

	transactionService := service.NewTransactionService()
	transactionService.ProcessTransactionUseCase = g.ProcessTransactionUseCase

	grpcServer := grpc.NewServer()

	reflection.Register(grpcServer)
	pb.RegisterPaymentServiceServer(grpcServer, transactionService)

	grpcServer.Serve(listener)
}
