type LogEntry = {
  timestamp: string;
  level: LogLevel;
  event: string;
  message: string;
  context?: LogContext;
  error?: LogError
};

type LogLevel = "debug" | "info" | "warn" | "error";

type LogContext = Record<string, unknown>;

type LogError = {
    name: string;
    errMessage: string;
    stack?: string;
};

function log(
  level: LogLevel,
  event: string,
  message: string,
  context?: LogContext,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  error?: any
): LogEntry {

    const serializedError: LogError =
    error instanceof Error
        ? {
                name: error.name,
                errMessage: error.message,
                stack: error.stack,
            }
        : {
                name: "UnknownError",
                errMessage: String(error),
            };

    const entry = {
    timestamp: new Date().toISOString(),
    level,
    event,
    message,
    ...(context && { context }),
    ...(error && { error: serializedError }),    
    };

    console[level](JSON.stringify(entry));
    return entry;
}

export const logger = {
  debug: (
    event: string,
    message: string,
    context?: LogContext
  ) => log("debug", event, message, context),

  info: (
    event: string,
    message: string,
    context?: LogContext
  ) => log("info", event, message, context),

  warn: (
    event: string,
    message: string,
    context?: LogContext
  ) => log("warn", event, message, context),

  error: (
    event: string,
    message: string,
    context?: LogContext,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    error?: any
  ) => log("error", event, message, context, error),
};

