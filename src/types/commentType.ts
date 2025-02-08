import type { ReplyView } from './replyType'

export interface CommentEntity {
  comment_id: number
  comment_user_id: number
  comment_title_id: number
  comment_score: number
  comment_time: Date
  comment_content: string
  comment_like: number
}

export interface CommentView {
  commentId: number
  titleId: number
  content: string
  score: number
  userId: number
  userNickname: string
  userHeadshot: string
  commentTime: Date
  commentLike: number
  titleName: string
  replyViewList?: ReplyView[]
}

export interface DeleteCommentAdminDto {
  commentId: number
  reasonId: number
}

export interface CommentDeleteReasonEntity {
  reason_id: number
  reason_name: string
  reason_type: string
}

export interface CommentDeleteView {
  deleteId: number
  reasonId: string
  reasonName: string
  reasonType: string
  titleId: number
  titleName: string
  userId: number
  userName: string
  userNickname: string
  adminId: number
  adminName: string
  commentContent: string
  deleteTime: Date
}

export interface CommentDeleteEntity {
  delete_id: number
  delete_reason_id: number
  delete_reason_content: string
  delete_user_id: number
  delete_admin_id: number
  delete_title_id: number
  delete_time: Date
}
