export interface Friend {
  pending: Request[];
  accepted: string[];
}

export interface Request {
  type: 'sent' | 'received';
  username: string;
}
