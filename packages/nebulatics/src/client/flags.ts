/**
 * Get all flag values from the document. This helper integrates with the flags
 * package.
 *
 * @returns A record of flag values.
 */
export function getAllFlagValues(): Record<string, unknown> {
  const flagValues = document.querySelectorAll('[data-flag-values="true"]');

  return Array.from(flagValues).reduce((acc, flag) => {
    const parsed = JSON.parse(flag.innerHTML);
    return { ...acc, ...parsed };
  }, {});
}
