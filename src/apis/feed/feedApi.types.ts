export interface GetAllFeed {
  _id: string;
  title: string;
  photos: FeedDataPhotos[];
  content: string;
  user: FeedDataUser;
  createdAt: string;
  updatedAt: string;
}

export interface FeedDataPayload {
  user: FeedDataUser;
  uid: string;
  title: string;
  photos?: FeedDataPhotos[];
  content: string;
}

export interface FeedDataUser {
  username: string;
  uid: string;
  email: string;
  profileImgUrl: string;
}

export interface FeedDataPhotos {
  url: string;
  id: string;
}
