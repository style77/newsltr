import os
import re

import httpx
from httpx import AsyncClient
from dataclasses import dataclass

from exceptions import UnknownException, ServiceException, InactiveSubscribtion, Unauthorized, InvalidEmailException

EMAIL_RE = re.compile(r"""(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])""")  # noqa


@dataclass(frozen=True)
class APIResponse:
    email: str
    tracking_data: dict
    joined_at: str
    id: str


class NewsltrSDK:
    BASE_URL = "http://localhost:8000" if os.getenv("DEVELOPMENT") else "https://newsltr.io"
    BASE_SUBSCIRBE_ENDPOINT = "/api/v1/campaigns/{campaign_id}/subscribers/user/"

    def __init__(self, api_key: str, campaign_id: str) -> None:
        """
        Initializes the NewsltrSDK with the provided API key and campaign ID.

        Args:
            api_key (str): The API key for authenticating with the Newsltr.io API.
            campaign_id (str): The campaign ID to which users will be subscribed.
        """

        self.endpoint = self.BASE_URL + self.BASE_SUBSCIRBE_ENDPOINT.format(campaign_id=campaign_id)
        self.headers = {"X-API-KEY": api_key}

    def subscribe_sync(self, email: str, extra_data: dict) -> APIResponse:
        """
        Synchronously subscribes a user to the newsletter campaign.

        Args:
            email (str): The email address of the user to subscribe.
            extra_data (dict): Additional tracking data to be associated with the subscription.

        Returns:
            APIResponse: An object containing details of the subscription.

        Raises:
            ServiceException: If there is a server-side error.
            Unauthorized: If the API key is invalid.
            InvalidEmailException: If passed email was invalid
            InactiveSubscription: If the subscription is inactive.
            UnknownException: For any other unknown exceptions.

        Example:
            >>> sdk = NewsltrSDK(api_key="your_api_key", campaign_id="your_campaign_id")
            >>> response = sdk.subscribe_sync("user@example.com", {"source": "website"})
            >>> print(response.email)
            'user@example.com'
        """

        if not EMAIL_RE.match(email):
            raise InvalidEmailException

        resp = httpx.post(
            self.endpoint,
            headers=self.headers,
            json={"email": email, "tracking_data": extra_data}
        )

        return self.__handle_response(resp)

    async def subscribe_async(self, email: str, extra_data: dict) -> APIResponse:
        """
        Asynchronously subscribes a user to the newsletter campaign.

        Args:
           email (str): The email address of the user to subscribe.
           extra_data (dict): Additional tracking data to be associated with the subscription.

        Returns:
           APIResponse: An object containing details of the subscription.

        Raises:
           ServiceException: If there is a server-side error.
           InvalidEmailException: If passed email was invalid
           Unauthorized: If the API key is invalid.
           InactiveSubscription: If the subscription is inactive.
           UnknownException: For any other unknown exceptions.

        Example:
           >>> sdk = NewsltrSDK(api_key="your_api_key", campaign_id="your_campaign_id")
           >>> response = await sdk.subscribe_async("user@example.com", {"source": "website"})
           >>> print(response.email)
           'user@example.com'
        """

        if not EMAIL_RE.match(email):
            raise InvalidEmailException

        async with AsyncClient() as client:
            resp = await client.post(
                self.endpoint,
                headers=self.headers,
                json={"email": email, "tracking_data": extra_data},
            )

        return self.__handle_response(resp)

    @staticmethod
    def __handle_response(resp: httpx.Response) -> APIResponse:
        """
        Internal method

        Handles the response from the Newsltr.io API, processing it based on the status code.

        Args:
            resp (httpx.Response): The response object from the API request.

        Returns:
            APIResponse: An object containing details of the subscription.

        Raises:
            ServiceException: If there is a server-side error.
            Unauthorized: If the API key is invalid.
            InactiveSubscription: If the subscription is inactive.
            UnknownException: For any other unknown exceptions.
        """
        code = resp.status_code
        match code:
            case code if 500 <= code <= 599:
                raise ServiceException
            case 401:
                raise Unauthorized
            case 403:
                raise InactiveSubscribtion
            case 201:
                return resp.json()
            case _:
                raise UnknownException(code, resp.text)
