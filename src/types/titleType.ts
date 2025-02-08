export interface TitleView {
  titleId: number
  titleName: string
  description: string
  cover: string
  subjectId: number
  subjectName: string
  averageScore: number
  countComment: number
}

export interface TitleEntity {
  title_id: number
  title_name: string
  title_subject_id: number
  title_cover: string
  title_description: string
}

export interface TitleInfoDto {
  name: string
  description: string
  subjectId: number
}
