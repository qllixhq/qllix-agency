// CMS order puts older projects first and new uploads at the end.
// Alternate ends, preferring a different category from the preceding card.
export function mixPortfolioItems<T extends { category: string }>(items: T[]): T[] {
  const remaining = [...items];
  const mixed: T[] = [];
  let takeNewest = true;

  while (remaining.length) {
    const previousCategory = mixed[mixed.length - 1]?.category;
    let index = takeNewest ? remaining.length - 1 : 0;
    const step = takeNewest ? -1 : 1;
    for (let candidate = index; candidate >= 0 && candidate < remaining.length; candidate += step) {
      if (remaining[candidate].category !== previousCategory) {
        index = candidate;
        break;
      }
    }
    mixed.push(remaining.splice(index, 1)[0]);
    takeNewest = !takeNewest;
  }

  return mixed;
}
