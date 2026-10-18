export interface PublicationData {
  track: string;
  dateDisplay?: 'auto' | 'show' | 'hide';
  publishedAt: Date;
  draft?: boolean;
}

export function showPublicationDates(data: Pick<PublicationData, 'track' | 'dateDisplay'>) {
  if (data.dateDisplay === 'show') return true;
  if (data.dateDisplay === 'hide') return false;
  return data.track === 'paper' || data.track === 'news';
}

export function comparePublicationOrder(
  a: { id: string; data: PublicationData },
  b: { id: string; data: PublicationData },
) {
  const dateDelta = b.data.publishedAt.valueOf() - a.data.publishedAt.valueOf();
  return dateDelta || (a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
}

// A summary feed keeps every published item discoverable, including older migrations
// and large batches. GUIDs and publication dates must not change to announce an edit.
export function getFeedPosts<T extends { id: string; data: PublicationData }>(posts: T[]) {
  return posts.filter(({ data }) => !data.draft).sort(comparePublicationOrder);
}
