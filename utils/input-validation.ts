export function isValidImageUrl(url: string): boolean {
  const isValidJpg = url.endsWith(".jpg") || url.endsWith(".jpeg");
  const isValidExternalUrl =
    url.startsWith("http://") || url.startsWith("https://");
  const isValidFullUrl = url.includes("://") && url.includes("/");

  return isValidJpg && isValidExternalUrl && isValidFullUrl;
}

export function isValidName(name: string): boolean {
  return name.length > 3 && name.length < 100;
}

export function isValidLikes(likes: number): boolean {
  return likes >= 0 && likes < 100;
}
