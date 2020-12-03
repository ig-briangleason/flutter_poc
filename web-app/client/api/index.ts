const apiUrl = process.env.NODE_ENV === "test" ? "localhost" : `${window.location.protocol}//${window.location.host}/api`;

type Authentication = {
  session: string,
};

export async function api<T>(query: string, authentication?: Authentication): Promise<T> {
  const details = {
    method: "POST",
    body: JSON.stringify({
      query: query,
      variables: null,
      operation: null
    }),
    headers: {
      "Content-Type": "application/json",
      "Accept": "application/json"
    }
  };

  if (authentication !== undefined) {
    (details.headers as any)["session-token"] = authentication.session;
  }

  const results = await fetch(apiUrl, details);
  if (results.status !== 200) {
    throw new Error(`expected 200 response but observed ${results.status}`);
  }
  const jsonResults = await results.json();
  const data = jsonResults.data;
  if (!data) {
    throw new Error("expected data as a key of the GraphQL response JSON");
  }

  const errors = jsonResults.errors;
  if (errors) {
    throw new Error(errors[0].message);
  }
  return data;
}
