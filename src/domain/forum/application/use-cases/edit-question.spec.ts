import { beforeEach, describe, expect, test } from 'vitest'
import type { QuestionRepository } from '../repositories/question-repository.js'
import { EditQuestionUseCase } from './edit-question.js'
import { InMemoryQuestionsRepository } from '@/test/repository/in-memory-questions-repository.js'
import { makeQuestion } from '@/test/factories/make-question.js'
import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { NotAllowedError } from './errors/not-allowed-error.js'

let questionRepository: QuestionRepository
let sut: EditQuestionUseCase

beforeEach(() => {
  questionRepository = new InMemoryQuestionsRepository()
  sut = new EditQuestionUseCase(questionRepository)
})

describe('Edit Question', () => {
  test('it should be able to edit a question', async () => {
    const newQuestion = makeQuestion(
      { authorId: UniqueEntityId.create('1') },
      UniqueEntityId.create('1'),
    )
    await questionRepository.create(newQuestion)
    const result = await sut.execute({
      authorId: '1',
      content: 'content example',
      title: 'title example',
      questionId: '1',
    })
    
    expect(result.isRight()).toBeTruthy()
    if(result.isRight()) {
      expect(result.value.question.content).toEqual("content example")
    }
   
  })

  test('it shouldnt be able to edit a question made by other user', async () => {
    const newQuestion = makeQuestion(
      { authorId: UniqueEntityId.create('1') },
      UniqueEntityId.create('1'),
    )
    await questionRepository.create(newQuestion)
    const result = await sut.execute({
        authorId: '2',
        content: 'content example',
        title: 'title example',
        questionId: '1',
      })

    expect(result.isLeft()).toBeTruthy()
    expect(result.value).instanceOf(NotAllowedError)
  })
})
