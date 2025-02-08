export interface ReplyView {
  replyId: number
  commentId: number
  userId: number
  userNickname: string
  userHeadshot: string
  content: string
  replyTime: Date
  replyLike: number
}
