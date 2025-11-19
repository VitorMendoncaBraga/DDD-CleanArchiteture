import { left, right, type Either } from "@/core/either.js"
import type { QuestionComment } from "../../enterprise/entities/question-comment.js"
import type { QuestionCommentRepository } from "../repositories/question-comment-repository.js"
import type { QuestionRepository } from "../repositories/question-repository.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface FetchQuestionCommentsUseCaseRequest {
    questionId: string
    page: number
}

type FetchQuestionCommentsUseCaseResponse = Either< ResourceNotFoundError,  {
    questionComments: QuestionComment[]
}>

export class FetchQuestionCommentsUseCase {
    constructor(private questionRepository: QuestionRepository, private questionCommentRepository: QuestionCommentRepository) { }
    async execute({ page, questionId }: FetchQuestionCommentsUseCaseRequest): Promise<FetchQuestionCommentsUseCaseResponse> {
        const question = await this.questionRepository.findById(questionId)
        if (!question) {
            return left(new ResourceNotFoundError())
        }

        const questionComments = await this.questionCommentRepository.findManyByQuestionId(questionId, { page })
        return right({
            questionComments
        })

    }
}