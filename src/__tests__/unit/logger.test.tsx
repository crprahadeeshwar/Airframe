import { expect, test } from "vitest";
import { logger } from "@/src/lib/logger";

test("successful creation log", () => {

    const result = logger.info(
        "flight.create.success",
        "flight has been created",
        { flightid: 123 }
    );

    expect(result).toEqual(
        expect.objectContaining({
            event: "flight.create.success",
            message: "flight has been created",
            context: { flightid: 123 }
        })
    );
});

test("error log test", () => {

    const error = new Error("database exploded or smth");

    const result = logger.error(
        "flight.create.failed",
        "failed to create flight",
        { flightid: 123 },
        error
    );

    expect(result).toEqual(
        expect.objectContaining({
            level: "error",
            event: "flight.create.failed",
            message:"failed to create flight",
            context: { flightid: 123 }
        })
    );
    expect(result.error?.name).toBe("Error");
    expect(result.error?.errMessage).toBe("database exploded or smth");
    expect(result.error?.stack).toBeDefined();
})