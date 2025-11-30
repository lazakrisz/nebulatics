import "server-only";
import { evaluate, serialize } from "flags/next";
import * as flags from "../flags";

export async function getFlags() {
  // Evaluate all flags on the server with full type safety
  const flagKeys = Object.keys(flags) as Array<keyof typeof flags>;
  const flagEntries = await Promise.all(
    flagKeys.map(async (key) => [key, await flags[key]()] as const),
  );
  const flagValues = Object.fromEntries(flagEntries) as {
    [K in keyof typeof flags]: Awaited<ReturnType<(typeof flags)[K]>>;
  };

  return flagValues;
}

export async function getSerializedFlags() {
  const flagValues = Object.values(flags);
  const values = await evaluate(flagValues);
  const code = await serialize(flagValues, values, "secret");

  return code;
}
