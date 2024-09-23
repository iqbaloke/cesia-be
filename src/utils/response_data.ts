class ResponseData {
  public success(data: any) {
    return { ...data };
  }

  public error(status: number, message: string, data?: any) {
    return { status: status, message: message, data: data };
  }
}

export default new ResponseData();
