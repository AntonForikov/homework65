export interface PageApi {
  title: string,
  content: string
}

export interface PageType  extends PageApi{
  pageName: string
}

export interface PagesApi extends PageApi {
  [pageName: string]: PageApi
}
