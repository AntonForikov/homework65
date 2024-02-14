export interface PageApi {
  title: string,
  content: string
}

export interface PagesApi extends PageApi {
  [pageName: string]: PageApi
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