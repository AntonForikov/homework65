  export interface PageApi {
  title: string,
  content: string
}

export interface PagesApi extends PageApi {
  [pageName: string]: PageApi
}
