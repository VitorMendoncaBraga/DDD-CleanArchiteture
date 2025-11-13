import { Slug } from '@/domain/forum/enterprise/entities/value-objects/slug.js'
import { Entity } from '@/core/entities/entity.js'
import type { UniqueEntityId } from '@/core/entities/unique-entity-id.js'
import type { Optional } from '@/core/types/optional.js'
import dayjs from 'dayjs'

export interface QuestionProps {
  title: string
  content: string
  bestAnswerId?: UniqueEntityId
  authorId: UniqueEntityId
  slug: Slug
  created_at: Date
  updated_at?: Date
}

export class Question extends Entity<QuestionProps> {
  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get bestAnswerId() {
    if (this.props.bestAnswerId) {
      return this.props.bestAnswerId
    }

    throw new Error('Nenhuma melhor resposta foi escolhida!')
  }

  get authorId() {
    return this.props.authorId
  }

  get slug() {
    return this.props.slug
  }

  get created_at() {
    return this.props.created_at
  }

  get isNew(): boolean {
    return dayjs().diff(this.props.created_at) <= 3
  }

  get excerpt() {
    return this.props.content.substring(0, 128).trimEnd().concat('...')
  }

  private touch() {
    this.props.updated_at = new Date()
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  set title(title: string) {
    this.props.title = title
    this.props.slug = Slug.createFromText(title)
    this.touch()
  }

  set bestAnswerId(bestAnswerId: UniqueEntityId) {
    this.props.bestAnswerId = bestAnswerId
  }

  static create(
    props: Optional<QuestionProps, 'created_at' | 'slug'>,
    id?: UniqueEntityId,
  ) {
    const question = new Question(
      {
        ...props,
        slug: props.slug ?? Slug.createFromText(props.title),
        created_at: new Date(),
      },
      id,
    )
    return question
  }
}
