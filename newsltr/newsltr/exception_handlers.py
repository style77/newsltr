from rest_framework.response import Response
from rest_framework.views import exception_handler


def custom_exception_handler(exc, context):
    response = exception_handler(exc, context)

    return Response(
        {"message": response.data.get("details")},
        headers=response.headers,
        status=response.status_code
    )
