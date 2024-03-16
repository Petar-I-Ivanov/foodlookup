import queryString from "query-string";
import ApiError from "../../models/error/ApiError";
import ApiException from "../../models/error/ApiException";

const fetchClientInternal = async (url: string, options: RequestInit = {}) => {
  const response = await fetch(url, options);
  const contentType = response.headers.get("content-type");

  if (response.ok) {
    if (!contentType) {
      return;
    }
    if (contentType.includes("text")) {
      return response.text();
    } else {
      return await JSON.parse(await response.text(), (key, value) => {
        // If the value is a string and if it roughly looks like it could be a
        // JSON-style date string go ahead and try to parse it as a Date object.
        if (
          "string" === typeof value &&
          /^\d{4}-[01]\d-[0-3]\dT[012]\d(?::[0-6]\d){2}$/.test(value)
        ) {
          var date = new Date(value);
          // If the date is valid then go ahead and return the date object.
          // eslint-disable-next-line no-self-compare
          if (+date === +date) {
            return date;
          }
        }
        // If a date was not returned, return the value that was passed in.
        return value;
      });
    }
  }

  if (
    contentType === "application/problem+json" ||
    contentType === "application/json"
  ) {
    const error: ApiError = await response.json();
    throw new ApiException(error);
  }

  throw new Error(await response.text());
};

const fetchClient = {
  get: fetchClientInternal,
  post: (url: string, options: RequestInit = {}) =>
    fetchClientInternal(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(options?.headers || {}),
      },
      ...options,
    }),
  patch: (url: string, options: RequestInit = {}) =>
    fetchClientInternal(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json; charset=utf-8",
        ...(options?.headers || {}),
      },
      ...options,
    }),
  delete: (url: string, options: RequestInit = {}) =>
    fetchClientInternal(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json;",
        ...(options?.headers || {}),
      },
      ...options,
    }),
  put: (url: string, options: RequestInit = {}) =>
    fetchClientInternal(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json;",
        ...(options?.headers || {}),
      },
      ...options,
    }),
};

export const stringifyUrl = (url: string, query: any) =>
  queryString.stringifyUrl({
    url,
    query: Object.fromEntries(
      Object.entries(query).map((entry) => [entry[0], entry[1]])
    ) as any,
  });

export default fetchClient;
