export class Slug {
  public value: string
  private constructor(value: string) {
    this.value = value
  }

  static create(slug: string) {
    return new Slug(slug)
  }

  static createFromText(text: string) {
    const slug = text
      .normalize('NFKD')
      .toLowerCase()
      .trim()
      .replaceAll(' ', '-')
      .replace('--', '-')
    return new Slug(slug)
  }
}
