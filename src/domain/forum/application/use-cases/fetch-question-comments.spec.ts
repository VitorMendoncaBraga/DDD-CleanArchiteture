import { describe, test, expect, beforeEach } from "vitest";
import type { QuestionCommentRepository } from "../repositories/question-comment-repository.js";
import type { QuestionRepository } from "../repositories/question-repository.js";
import { FetchQuestionCommentsUseCase } from "./fetch-question-comments.js";
import { InMemoryQuestionCommentRepository } from "@/test/repository/in-memory-question-comment-repository.js";
import { InMemoryQuestionsRepository } from "@/test/repository/in-memory-questions-repository.js";
import { makeQuestion } from "@/test/factories/make-question.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import { makeQuestionComment } from "@/test/factories/make-question-comment.js";

let questionCommentRepository: QuestionCommentRepository
let questionRepository: QuestionRepository
let sut: FetchQuestionCommentsUseCase

beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentRepository()
    questionRepository = new InMemoryQuestionsRepository()
    sut = new FetchQuestionCommentsUseCase(questionRepository, questionCommentRepository)
})

describe("Fetch Question Comments", () => {
    test("it should be able to fetch question comments", async () => {
        const question = makeQuestion({}, UniqueEntityId.create("1"))
        await questionRepository.create(question)

        for(let i = 0; i < 5; i++) {
            const questionComment = makeQuestionComment({questionId: UniqueEntityId.create("1")})
            await questionCommentRepository.create(questionComment)
        }

        const result = await sut.execute({page: 1, questionId: "1"})
        expect(result.isRight()).toBeTruthy()
        if(result.isRight()) {
            expect(result.value.questionComments).toHaveLength(5)
        }
    })

     test("it should be able to fetch pagineted question comments", async () => {
        const question = makeQuestion({}, UniqueEntityId.create("1"))
        await questionRepository.create(question)

        for(let i = 0; i < 22; i++) {
            const questionComment = makeQuestionComment({questionId: UniqueEntityId.create("1")})
            await questionCommentRepository.create(questionComment)
        }

        const result = await sut.execute({page: 2, questionId: "1"})
        expect(result.isRight()).toBeTruthy()
        if(result.isRight()) {
            expect(result.value.questionComments).toHaveLength(2)
        }
    })
} )