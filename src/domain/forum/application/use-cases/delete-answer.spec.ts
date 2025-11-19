import { beforeEach, describe, expect, test } from 'vitest'
import type { AnswerRepository } from '../repositories/answer-repository.js'
import { DeleteAnswerUseCase } from './delete-answer.js'
import { InMemoryAnswersRepository } from '@/test/repository/in-memory-answer-repository.js'
import { makeAnswer } from '@/test/factories/make-answer.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { ResourceNotFoundError } from './errors/resource-not-found-error.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let answerRepository: AnswerRepository
let sut: DeleteAnswerUseCase

beforeEach(() => {
  answerRepository = new InMemoryAnswersRepository()
  sut = new DeleteAnswerUseCase(answerRepository)
})

describe('Delete Answer', () => {
  test('it should be able to delete an answer', async () => {
    const newAnswer = makeAnswer(
      { instructorId: UniqueEntityId.create('1') },
      UniqueEntityId.create('1'),
    )
    await answerRepository.create(newAnswer)
    await sut.execute({ authorId: '1', id: '1' })
    const answer = await answerRepository.findById('1')
    expect(answer).toBeNull()
  })

  test('it shouldnt be able to delete an answer that doesnt exists', async () => {
    
      const result = await sut.execute({ authorId: 'Unexistent id', id: 'Unexistent id' })
      expect(result.isLeft).toBeTruthy()
      expect(result.value).instanceOf(ResourceNotFoundError)
  })

  test('it shouldnt be able to delete an answer made by other instructor', async () => {
    const answer = makeAnswer({}, UniqueEntityId.create('1'))
    await answerRepository.create(answer)
    const result = await sut.execute({ authorId: 'Fake id', id: '1' })
    expect(result.isLeft()).toBeTruthy()
    expect(result.value).instanceOf(NotAllowedError)
  })
})
