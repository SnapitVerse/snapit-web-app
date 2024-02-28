export const imageSelector = (id: number) => {
  const imageId = id % 6;
  return `nfts/image-${imageId}.png`;
};

/**
 * Converts a timestamp to a localized date string.
 * @param timestamp The timestamp to convert.
 * @returns A localized date string.
 */
export function timestampToLocalDateString(timestamp: number | bigint): string {
  // Convert bigint to number if necessary
  const date = new Date(Number(timestamp) * 1000);
  const dateFormatter = new Intl.DateTimeFormat("default", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
    timeZoneName: "short",
  });
  return dateFormatter.format(date);
}

export function timestampDeltaNow(timestamp: number | bigint): number {
  const timestampNumber = Number(timestamp);
  const currentTime = Math.floor(Date.now() / 1000); // Convert current time to seconds
  return timestampNumber - currentTime;
}
