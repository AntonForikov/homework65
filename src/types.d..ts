export interface PostApi {
  title: string,
  description: string,
  date: string,
}

export interface Post extends PostApi {
  id: string
}
export interface PostsAPI extends PostApi {
  [id: string]: PostApi
}

export interface Contacts {
  address: string,
  city: string,
  country: string,
  email: string,
  tel: string,
}

export interface About {
  content: string
}