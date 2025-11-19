import { describe, test, expect, beforeEach } from "vitest";

import type { AnswerRepository } from "../repositories/answer-repository.js";
import { FetchAnswerCommentsUseCase } from "./fetch-answer-comments.js";
import { InMemoryAnswerCommentRepository } from "@/test/repository/in-memory-answer-comment-repository.js";
import { makeAnswer } from "@/test/factories/make-answer.js";
import { UniqueEntityId } from "@/core/entities/unique-entity-id.js";
import type { AnswerCommentRepository } from "../repositories/anwer-comment-repository.js";
import { InMemoryAnswersRepository } from "@/test/repository/in-memory-answer-repository.js";
import { makeAnswerComment } from "@/test/factories/make-answer-comment.js";

let answerCommentRepository: AnswerCommentRepository
let answerRepository: AnswerRepository
let sut: FetchAnswerCommentsUseCase

beforeEach(() => {
    answerCommentRepository = new InMemoryAnswerCommentRepository()
    answerRepository = new InMemoryAnswersRepository()
    sut = new FetchAnswerCommentsUseCase(answerRepository, answerCommentRepository)
})

describe("Fetch Answer Comments", () => {
    test("it should be able to fetch answer comments", async () => {
        const answer = makeAnswer({}, UniqueEntityId.create("1"))
        await answerRepository.create(answer)

        for (let i = 0; i < 5; i++) {
            const answerComment = makeAnswerComment({ answerId: UniqueEntityId.create("1") })
            await answerCommentRepository.create(answerComment)
        }

        const result = await sut.execute({ page: 1, answerId: "1" })
        expect(result.isRight()).toBeTruthy()
        if(result.isRight()) {
            expect(result.value.answerComments).toHaveLength(5)
        }

    })

    test("it should be able to fetch pagineted answer comments", async () => {
        const answer = makeAnswer({}, UniqueEntityId.create("1"))
        await answerRepository.create(answer)

        for (let i = 0; i < 22; i++) {
            const answerComment = makeAnswerComment({ answerId: UniqueEntityId.create("1") })
            await answerCommentRepository.create(answerComment)
        }

        const result = await sut.execute({ page: 2, answerId: "1" })
        expect(result.isRight()).toBeTruthy()
        if(result.isRight()) {
            expect(result.value.answerComments).toHaveLength(2)
        }
    })
})