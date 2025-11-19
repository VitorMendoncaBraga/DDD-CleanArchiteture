import { describe, test, expect, beforeEach } from 'vitest'
import type { QuestionCommentRepository } from '../repositories/question-comment-repository.js'
import { DeleteQuestionCommentUseCase } from './delete-question-comment.js'
import { InMemoryQuestionCommentRepository } from '@/test/repository/in-memory-question-comment-repository.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { makeQuestionComment } from '@/test/factories/make-question-comment.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let questionCommentRepository: QuestionCommentRepository
let sut: DeleteQuestionCommentUseCase

beforeEach(() => {
    questionCommentRepository = new InMemoryQuestionCommentRepository()

    sut = new DeleteQuestionCommentUseCase(questionCommentRepository)
})
describe('Delete Question Comment', () => {
    test('it should be able to delete a question comment', async () => {
        const newQuestionComment = makeQuestionComment(
            { authorId: UniqueEntityId.create('1') },
            UniqueEntityId.create('1'),
        )
        await questionCommentRepository.create(newQuestionComment)
        const result = await sut.execute({
            authorId: '1',
            questionCommentId: '1',
        })

       expect(result.isRight).toBeTruthy()

    })
    test('it shouldnt be able to delete a question comment made by another user', async () => {
        const newQuestionComment = makeQuestionComment(
            { authorId: UniqueEntityId.create('1') },
            UniqueEntityId.create('1'),
        )
        await questionCommentRepository.create(newQuestionComment)
        const result = await sut.execute({authorId: "2", questionCommentId: "1"})
        expect(result.isLeft).toBeTruthy()
        expect(result.value).instanceOf(NotAllowedError)

    })
})
