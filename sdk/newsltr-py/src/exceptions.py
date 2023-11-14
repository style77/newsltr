Unauthorized = Exception("Your api_key is invalid")
InactiveSubscribtion = Exception("Your subscribtion is inactive")
InvalidEmailException = Exception("Email is invalid with RFC 5322")


class BaseException(Exception):
    def __init__(self, code: int, err_text: str): ...


class ServiceException(BaseException):
    def __init__(self, code: int, err_text: str) -> None:
        self.message = f"Service exception occured status: {code} message: {err_text}"


class UnknownException(BaseException):
    def __init__(self, code: int, err_text: str):
        self.message = f"Unknown exception occured: status: {code} message: {err_text}"
