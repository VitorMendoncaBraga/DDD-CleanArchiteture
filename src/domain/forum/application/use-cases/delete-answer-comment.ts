import { left, right, type Either } from "@/core/either.js";
import type { AnswerComment } from "../../enterprise/entities/answer-comment.js";
import type { AnswerCommentRepository } from "../repositories/anwer-comment-repository.js";
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

interface DeleteAnswerCommentUseCaseRequest {
    authorId: string,
    answerCommentId: string
}

interface DeleteAnswerCommentUseCaseResponse {
    answerComment: AnswerComment
}

export class DeleteAnswerCommentUseCase {
    constructor(private answerCommentRepository: AnswerCommentRepository){}
    async execute({answerCommentId,authorId}: DeleteAnswerCommentUseCaseRequest): Promise<Either<ResourceNotFoundError | NotAllowedError, DeleteAnswerCommentUseCaseResponse>> {
        const answerComment = await this.answerCommentRepository.findById(answerCommentId)
        if(!answerComment) {
            return left(new ResourceNotFoundError())
        }

        if(authorId != answerComment.authorId.toString()){
            return left(new NotAllowedError())
        }

        await this.answerCommentRepository.delete(answerComment)

        return right({answerComment})
    }
}