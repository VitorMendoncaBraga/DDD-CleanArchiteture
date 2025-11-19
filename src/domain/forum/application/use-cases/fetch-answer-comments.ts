import { left, right, type Either } from "@/core/either.js";
import type { AnswerComment } from "../../enterprise/entities/answer-comment.js";
import type { AnswerRepository } from "../repositories/answer-repository.js";
import type { AnswerCommentRepository } from "../repositories/anwer-comment-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";


interface FetchAnswerCommentsUseCaseRequest {
    answerId: string,
    page: number
}

type FetchAnswerCommentsUseCaseResponse = Either<ResourceNotFoundError,{
    answerComments: AnswerComment[]
}>

export class FetchAnswerCommentsUseCase {
    constructor(private answerRepository: AnswerRepository, private answerCommentRepository: AnswerCommentRepository){}
    async execute({answerId,page} : FetchAnswerCommentsUseCaseRequest): Promise<FetchAnswerCommentsUseCaseResponse> {
        const answer = await this.answerRepository.findById(answerId)

        if(!answer) {
            return left(new ResourceNotFoundError())
        }
        
        const answerComments = await this.answerCommentRepository.findManyByAnswerId(answerId, {page})

        return right({
            answerComments
        })

    }
}