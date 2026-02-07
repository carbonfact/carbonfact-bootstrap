export function formatName(name: string): string {
  return name
    .split("/")
    .join(" › ")
    .split("_")
    .join(" ")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(" ");
}
