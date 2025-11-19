import { beforeEach, describe, expect, test } from 'vitest'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { EditAnswerUseCase } from './edit-answer.js'
import { InMemoryAnswersRepository } from '@/test/repository/in-memory-answer-repository.js'
import { makeAnswer } from '@/test/factories/make-answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let answerRepository: AnswerRepository
let sut: EditAnswerUseCase

beforeEach(() => {
    answerRepository = new InMemoryAnswersRepository()
    sut = new EditAnswerUseCase(answerRepository)
})

describe('Edit Answer', () => {
    test('it should be able to edit an answer', async () => {
        const newAnswer = makeAnswer(
            { instructorId: UniqueEntityId.create('1') },
            UniqueEntityId.create('1'),
        )
        await answerRepository.create(newAnswer)

        await sut.execute({
            answerId: '1',
            authorId: '1',
            content: 'Edited content',
        })
        const answer = await answerRepository.findById('1')
        expect(answer?.content).toEqual('Edited content')
    })
    test('it shouldnt be able to edit an answer made by other user', async () => {
        const newAnswer = makeAnswer(
            { instructorId: UniqueEntityId.create('1') },
            UniqueEntityId.create('1'),
        )
        await answerRepository.create(newAnswer)


        const result = await sut.execute({
            answerId: '1',
            authorId: '2',
            content: 'Edited content',
        })

        expect(result.isLeft).toBeTruthy()
        expect(result.value).instanceOf(NotAllowedError)

    })
})
