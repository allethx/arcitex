let installed = false;

export function installCircleProxy() {
  if (
    installed ||
    typeof window === "undefined"
  ) {
    return;
  }

  installed = true;

  const originalFetch =
    window.fetch.bind(window);

  window.fetch = async (
    input: RequestInfo | URL,
    init?: RequestInit,
  ) => {
    try {
      const url =
        typeof input === "string"
          ? input
          : input instanceof URL
          ? input.toString()
          : input.url;

      if (
        url.startsWith(
          "https://api.circle.com/",
        )
      ) {
        const rewritten =
          url.replace(
            "https://api.circle.com",
            "/api/circle-proxy",
          );

        console.log(
          "[Circle Proxy]",
          url,
          "→",
          rewritten,
        );

        if (typeof input === "string") {
          return originalFetch(
            rewritten,
            init,
          );
        }

        const request =
          new Request(
            rewritten,
            input,
          );

        return originalFetch(
          request,
          init,
        );
      }
    } catch (err) {
      console.error(
        "Circle Proxy Error:",
        err,
      );
    }

    return originalFetch(
      input,
      init,
    );
  };

  console.log(
    "✅ Circle Proxy Installed",
  );
}