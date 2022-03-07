import { PAGINATION_QUERY } from '../components/Pagination';

export default function paginationField() {
  return {
    keyArgs: false, // tells Apollo we will take care of everything
    read(existing = [], { args, cache }) {
      const { skip, first } = args;
      // Read the number of items on the page from the cache
      const data = cache.readQuery({ query: PAGINATION_QUERY });
      const count = data?._allProductsMeta?.count;
      const page = skip / first + 1;
      const pages = Math.ceil(count / first);

      // Check if we have existing items
      const items = existing.slice(skip, skip + first).filter((x) => x);
      if (items.length !== first) {
        // We dont have any items, we must go to the network to fetch them
        return false;
      }

      // If there are items, just return them from the cache, and we dont need to to the network
      if (items.length) {
        return items;
      }
      // First thing it does it asks the read function for those items

      // We can either one of two things:
      // First thing we can do is return the items because they are already in the cache
      // The other thing we can do is to return false from here, (network request)
    },

    merge() {
      // This runs when the Apollo Client comes back from the network with our products
    },
  };
}
