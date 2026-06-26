export const slugify = (text: string): string => {
  return text.toLocaleLowerCase().trim().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
}
