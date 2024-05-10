export interface IMessageFilter {
  room: string;
  content?: string;
  limit?: number;
  offset?: number;
}
