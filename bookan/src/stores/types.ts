export type ApiResponse = {
    data: any
    status: ResponseStatus
    error: null
}

export enum ResponseStatus {
    Success = "success",
    Loading = "loading",
    Error = "error",
}