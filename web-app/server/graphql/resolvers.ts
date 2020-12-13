export type RegistrationInput = {
  email: string,
  password: string,
};

export const resolvers = {
  Query: {
    helloWorld: async () => {
        return "Hello World";
    }
  },
};
