"use server";
import { createShadowUser } from "@/app/_actions/action-auth";
import { isHandlerError } from "@/lib/type-guards";
import axios from "axios";
import { cookies } from "next/headers";

// axios.defaults.xsrfCookieName = "csrftoken";
// axios.defaults.xsrfHeaderName = "X-CSRFToken";
axios.defaults.withCredentials = true;
export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});
// Get the CSRF token from the cookies
// const csrfToken = getCookie("csrftoken"); // You need to implement the getCookie function
// const csrfToken = Cookies.get("csrftoken"); // You need to implement the getCookie function
// Set the CSRF token in the headers for all requests
// axiosInstance.defaults.headers.post["X-CSRFToken"] = csrfToken;
// axiosInstance.defaults.headers.put["X-CSRFToken"] = csrfToken;
// axiosInstance.defaults.headers.delete["X-CSRFToken"] = csrfToken;
type ExtractVariables<T> = T extends { variables: object }
  ? T["variables"]
  : never;
export async function configPostFetch<T>({
  cache = "no-cache",
  headers,
  query,
  tags,
  variables,
  header,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query?: string;
  tags?: string[];
  // variables?: ExtractVariables<T>;
  variables?: any;
  header?: ExtractVariables<T>;
  endpoint: string;
}): Promise<{ status: number; body: T & { message: string } } | never> {
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...variables,
      }),
      cache,
      ...(tags && { next: { tags } }),
    });
    console.log("aaa");

    const body = await result.json();
    console.log(body);

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

export async function configPostWithAuthFetch<T>({
  cache = "no-cache",
  headers,
  query,
  tags,
  variables,
  header,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query?: string;
  tags?: string[];
  // variables?: ExtractVariables<T>;
  variables?: any;
  header?: ExtractVariables<T>;
  endpoint: string;
}): Promise<{ status: number; body: T & { message: string } } | never> {
  try {
    const cookieStore = cookies();
    const authorization = cookieStore.get("authorization")?.value;
    var BearerAuth = authorization ? `Bearer ${authorization}` : null;
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(BearerAuth ? { authorization: BearerAuth } : {}),
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...variables,
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

export async function configPostShadowFetch<T>({
  cache = "no-cache",
  headers,
  query,
  tags,
  variables,
  header,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query?: string;
  tags?: string[];
  // variables?: ExtractVariables<T>;
  variables?: any;
  header?: ExtractVariables<T>;
  endpoint: string;
}): Promise<{ status: number; body: T & { message: string } } | never> {
  try {
    const cookieStore = cookies();
    const authorization = cookieStore.get("authorization")?.value;
    var BearerAuth = authorization ? `Bearer ${authorization}` : null;

    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(BearerAuth ? { authorization: BearerAuth } : {}),
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...variables,
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

export async function configPutFetch<T>({
  cache = "no-cache",
  headers,
  query,
  tags,
  variables,
  header,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query?: string;
  tags?: string[];
  // variables?: ExtractVariables<T>;
  variables?: any;
  header?: ExtractVariables<T>;
  endpoint: string;
}): Promise<{ status: number; body: T & { message: string } } | never> {
  const cookieStore = cookies();
  const authorization = cookieStore.get("authorization")?.value;
  var BearerAuth = authorization ? `Bearer ${authorization}` : null;
  try {
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(BearerAuth ? { authorization: BearerAuth } : {}),
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...variables,
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

export async function configGetFetch<T>({
  cache = "no-cache",
  headers,
  tags,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  endpoint: string;
}): Promise<{ status: number; body: T } | never> {
  try {
    // console.log(headers)
    // console.log(process.env.NEXT_PUBLIC_API_URL + endpoint)
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "GET",
      mode: "no-cors",
      headers: {
        'Access-Control-Allow-Origin': '*',
        "Content-Type": "application/json",
        ...headers,
      },
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();
    // console.log(body)
    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
      };
    }

    throw {
      error: e,
    };
  }
}

export async function configDeleteAuthFetch<T>({
  cache = "no-cache",
  headers,
  tags,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  endpoint: string;
}): Promise<{ status: number; body: T & { message: string } } | never> {
  try {
    // console.log(headers)
    // console.log(process.env.NEXT_PUBLIC_API_URL + endpoint)
    const cookieStore = cookies();
    const authorization = cookieStore.get("authorization")?.value;
    var BearerAuth = authorization ? `Bearer ${authorization}` : null;
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "DELETE",

      headers: {
        "Content-Type": "application/json",
        ...(BearerAuth ? { authorization: BearerAuth } : {}),
        ...headers,
      },
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();
    // console.log(body)
    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
      };
    }

    throw {
      error: e,
    };
  }
}

export async function configGetWithAuthFetch<T>({
  cache = "no-cache",
  headers,
  tags,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  tags?: string[];
  endpoint: string;
}): Promise<{ status: number; body: T } | never> {
  try {
    const cookieStore = cookies();
    const authorization = cookieStore.get("authorization")?.value;
    var BearerAuth = authorization ? `Bearer ${authorization}` : null;

    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        ...(BearerAuth ? { authorization: BearerAuth } : {}),
        ...headers,
      },
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();
    // console.log(body)
    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
      };
    }

    throw {
      error: e,
    };
  }
}
export interface ReturnSignin {
  access: string;
  access_exp: number;
  refresh: string;
  refresh_exp: number;
}
export async function configPostWithShadowFetch<T>({
  cache = "no-cache",
  headers,
  query,
  tags,
  variables,
  header,
  endpoint,
}: {
  cache?: RequestCache;
  headers?: HeadersInit;
  query?: string;
  tags?: string[];
  // variables?: ExtractVariables<T>;
  variables?: any;
  header?: ExtractVariables<T>;
  endpoint: string;
}): Promise<{ status: number; body: T & { message: string } } | never> {
  try {
    const cookieStore = cookies();
    const authorization = cookieStore.get("authorization")?.value;
    console.log(authorization);

    var BearerAuth = authorization ? `Bearer ${authorization}` : null;
    if (!authorization) {
      
       BearerAuth = await createShadowUser()
    }
    console.log(BearerAuth);
    const result = await fetch(process.env.NEXT_PUBLIC_API_URL + endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        ...(BearerAuth ? { authorization: BearerAuth } : {}),
        ...headers,
      },
      body: JSON.stringify({
        ...(query && { query }),
        ...variables,
      }),
      cache,
      ...(tags && { next: { tags } }),
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (e) {
    if (isHandlerError(e)) {
      throw {
        cause: e.cause?.toString() || "unknown",
        status: e.status || 500,
        message: e.message,
        query,
      };
    }

    throw {
      error: e,
      query,
    };
  }
}

