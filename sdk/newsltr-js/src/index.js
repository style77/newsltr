class Newsltr {
    constructor(apiKey, campaignId) {
        this.apiKey = apiKey;
        this.campaignId = campaignId;
        this.apiUrl = process.env.DEVELOPMENT ? "http://localhost:8000" : "https://newsltr.io";
    };

    /**
     * Asynchronously subscribes a user with the given email and additional data.
     *
     * @param {string} email - The email of the user to subscribe.
     * @param {object} extra_data - Additional data to include in the subscription request.
     * @return {Promise} - A promise that resolves with the subscription response data.
     * @throws {InvalidEmailError} - If the provided email is invalid.
     * @throws {IncorrectResponseError} - If there is an error while subscribing.
     */
    async subscribe(email, extra_data = {}) {
        if (!isValidEmail(email)) {
            throw new InvalidEmailError(`Invalid email address: ${email}`)
        };

        const requestBody = {
            email,
            tracking_data: extra_data,
        };

        const requestOptions = {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "X-API-KEY": this.apiKey,
            },
            body: JSON.stringify(requestBody),
        };

        const url = `${this.apiUrl}/api/v1/campaigns/${this.campaignId}/subscribers/user/`;
        const response = await fetch(url, requestOptions);

        const data = await response.json();

        if (!response.ok) {
            throw new IncorrectResponseError(`Error while subscribing: ${data}`);
        }

        return data;
    }
}