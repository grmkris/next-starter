const isProd = process.env.NODE_ENV === "production";

function format(props: { level: string; tag: string; msg: string; data?: unknown }) {
  if (isProd) {
    return JSON.stringify({ ...props, timestamp: new Date().toISOString() });
  }
  return `[${props.tag}] ${props.msg}`;
}

export function createLogger(prefix?: string) {
  const tag = prefix ?? "app";

  return {
    info(msg: string, data?: Record<string, unknown>) {
      console.log(format({ level: "info", tag, msg, data }));
    },
    warn(msg: string, data?: Record<string, unknown>) {
      console.warn(format({ level: "warn", tag, msg, data }));
    },
    error(msg: string, err?: Error | Record<string, unknown>) {
      const data = err instanceof Error
        ? { message: err.message, stack: err.stack }
        : err;
      console.error(format({ level: "error", tag, msg, data }));
    },
  };
}

export type Logger = ReturnType<typeof createLogger>;
