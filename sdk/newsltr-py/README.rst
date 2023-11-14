==================
NewsltrSDK Library
==================

The NewsltrSDK is a Python library for interacting with the Newsltr.io API. It enables developers to easily subscribe users to newsletter campaigns synchronously and asynchronously.

Requirements
------------
* Python 3.6+
* httpx

Installation
------------

You can install the Newsltr library using pip:

.. code-block:: bash

    pip install newsltr

Usage
-----

First, import the library:

.. code-block:: python

    from newsltr import NewsltrSDK

Setting up the SDK
-------------------

Initialize the SDK with your API key and the campaign ID:

.. code-block:: python

    sdk = NewsltrSDK(api_key="your_api_key", campaign_id="your_campaign_id")

Subscribing Users Synchronously
-------------------------------

Subscribe a user synchronously using their email address and additional tracking data:

.. code-block:: python

    response = sdk.subscribe_sync("user@example.com", {"source": "website"})
    print(response.email)

Subscribing Users Asynchronously
--------------------------------

Subscribe a user asynchronously:

.. code-block:: python

    response = await sdk.subscribe_async("user@example.com", {"source": "website"})
    print(response.email)

Handling Exceptions
-------------------

The SDK raises specific exceptions for various error conditions:

.. code-block:: python

    from exceptions import ServiceError, Unauthorized, InactiveSubscribtion, UnknownException

    try:
        sdk.subscribe_sync("user@example.com", {"source": "website"})
    except ServiceError:
        # Handle server-side error
    except Unauthorized:
        # Handle invalid API key
    except InactiveSubscribtion:
        # Handle inactive subscription
    except InvalidEmailException:
        # Handle invalid email
    except UnknownException as e:
        # Handle other exceptions

Contributing
------------

Contributions to NewsltrSDK are welcome! Please read our contributing guidelines for more information.

License
-------

NewsltrSDK is released under the [ISC License](https://github.com/Style77/newsltr/tree/master/sdk/newsltr-py/LICENSE.txt).

Support
-------

If you encounter any issues or require assistance, please open an issue on our [GitHub repository](https://github.com/Style77/newsltr/tree/master).
