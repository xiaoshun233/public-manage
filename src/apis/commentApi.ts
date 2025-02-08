import type {
  CommentDeleteEntity,
  CommentDeleteReasonEntity,
  CommentDeleteView,
  CommentEntity,
  CommentView,
  DeleteCommentAdminDto
} from '@/types/commentType'
import type { PageInfoView } from '@/types/pageType'
import { ContentType, deleteFetch, getFetch } from '@/utils'

export const getCommentsViewByTitleId = async (id: number, page: number) => {
  const result = await getFetch<PageInfoView<CommentEntity>>(`/getCommentsByTitleId/${id}/${page}`)
  return result
}

export const getCommentView = async (commentId: number) => {
  const result = await getFetch<CommentView>(`/getCommentView/${commentId}`)
  return result
}

export const deleteComment = async (data: DeleteCommentAdminDto) => {
  const result = await deleteFetch(`/deleteCommentAdmin`, ContentType.JSON, data)
  return result
}

export const getCommentDeleteReason = async () => {
  const result = await getFetch<CommentDeleteReasonEntity[]>('/getCommentDeleteReason')
  return result
}

export const getCommentDeleteViewList = async (page: number) => {
  const result = await getFetch<PageInfoView<CommentDeleteView>>(
    `/getCommentDeleteViewList/${page}`
  )
  return result
}

export const getCommentDeleteList = async (page: number) => {
  const result = await getFetch<PageInfoView<CommentDeleteEntity>>(`/getCommentDeleteList/${page}`)
  return result
}
