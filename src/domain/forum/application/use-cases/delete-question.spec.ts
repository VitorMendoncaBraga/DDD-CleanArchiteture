import { beforeEach, describe, expect, test } from 'vitest'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { DeleteQuestionUseCase } from './delete-question.js'
import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-questions-repository.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { Question } from '../../enterprise/entities/question.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let questionRepository: QuestionRepository
let sut: DeleteQuestionUseCase

beforeEach(() => {
    questionRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(questionRepository)
})

describe('Delete Question', () => {
    test('it should be able to delete a quest', async () => {
        const id = UniqueEntityId.create('1')
        const authorId = UniqueEntityId.create('1')
        const newQuestion = makeQuestion({ authorId }, id)
        await questionRepository.create(newQuestion)
        await sut.execute({ id: '1', authorId: '1' })
        const question = await questionRepository.findById('1')
        expect(question).toBe(null)
    })

    test('it should not be able to delete a quest from another user ', async () => {
        const id = UniqueEntityId.create('1')
        const authorId = UniqueEntityId.create('1')
        const newQuestion = makeQuestion({ authorId }, id)
        await questionRepository.create(newQuestion)

        const result = await sut.execute({ id: '1', authorId: '2' })
        expect(result.isLeft).toBeTruthy()
        expect(result.value).instanceOf(NotAllowedError)

    })
})
