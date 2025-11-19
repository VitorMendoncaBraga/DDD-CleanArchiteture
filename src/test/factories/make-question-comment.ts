import { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import { QuestionComment } from '@/domain/forum/enterprise/entities/question-comment.js'
import { faker } from '@faker-js/faker'

export function makeQuestionComment(
  override?: Partial<QuestionComment>,
  id?: UniqueEntityId,
) {
  const questionComment = QuestionComment.create(
    {
      authorId: UniqueEntityId.create('1'),
      questionId: UniqueEntityId.create('1'),
      content: faker.lorem.text(),
      ...override,
    },
    id,
  )

  return questionComment
}
