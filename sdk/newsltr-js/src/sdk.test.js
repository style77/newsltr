const { it, expect } = require('@jest/globals');

it('should subscribe a user with valid email and no extra data', async () => {
    const email = 'test@example.com';
    const extra_data = {};

    const result = await subscribe(email, extra_data);
    console.log(result);

    expect(result).toEqual(/* expected result */);
});

it('should subscribe a user with valid email and extra data', async () => {
    const email = 'test@example.com';
    const extra_data = { name: 'John Doe', age: 25 };

    const result = await subscribe(email, extra_data);

    expect(result).toEqual(/* expected result */);
});

it('should throw an InvalidEmailError for invalid email', async () => {
    const email = 'invalid_email';
    const extra_data = {};

    await expect(subscribe(email, extra_data)).rejects.toThrow(InvalidEmailError);
});

it('should throw an IncorrectResponseError for error while subscribing', async () => {
    const email = 'test@example.com';
    const extra_data = {};

    jest.spyOn(window, 'fetch').mockImplementation(() => {
        return Promise.resolve({
            ok: false,
            json: () => Promise.resolve({ error: 'Some error message' }),
        });
    });

    await expect(subscribe(email, extra_data)).rejects.toThrow(IncorrectResponseError);

    window.fetch.mockRestore();
});