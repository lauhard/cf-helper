# `cf-helper`

`cf-helper` is a lightweight, zero-dependency TypeScript library designed to simplify interactions with Cloudflare services within a Cloudflare Workers environment. It provides convenient helper classes for managing the Cloudflare Cache API and R2 Storage, making it easier to build robust applications on the Cloudflare platform, especially for frameworks like SvelteKit.

## Installation

Install directly from GitHub:

```bash
npm install github:lauhard/cf-helper
```

## Features

- **`CloudflareBase`**: A base class providing unified access to the Cloudflare platform bindings (`env`, `ctx`, `caches`, `cf`).
- **`CFCache`**: A helper class for the Cache API that simplifies matching, adding, and deleting cached responses, with support for cache key normalization.
- **`CFR2`**: A helper class for R2 Storage that simplifies bucket operations, object listing, key creation, and metadata management.
- **Type-Safe**: Written in TypeScript to provide type safety for Cloudflare's platform APIs.
- **Zero Dependencies**: Lightweight and dependency-free.

## Usage

The library is designed to be used within a Cloudflare Worker or a project that has access to the Cloudflare platform bindings (like SvelteKit with `adapter-cloudflare`).

### `CFR2` - R2 Storage Helper

The `CFR2` class simplifies interactions with Cloudflare R2 Storage.

**Create an instance of `CFR2`:**

```typescript
import { CFR2 } from 'cf-helper';

// 'platform' is the object provided by the Cloudflare environment in SvelteKit
// or your own object containing { env, ctx, ... }
const r2Helper = new CFR2(platform);
```

**Access an R2 bucket:**

```typescript
const bucket = r2Helper.getBucket('images');
if (bucket) {
  const object = await bucket.get('image.jpg');
}
```

**List all objects in a bucket:**

```typescript
const bucketData = await r2Helper.listBucketData('my-bucket-name', { limit: 100 });

// The function returns a promise with the following structure:
// {
//   objects: R2Object[];
//   cursor: string | undefined;
//   hasMore: boolean;
// }
```

### `CFCache` - Cache API Helper

The `CFCache` class provides a simple interface for the Cloudflare Cache API. In the previous version of the README, this was incorrectly named `CFCacheResponse`. The correct class name is `CFCache`.

**Create an instance of `CFCache`:**

```typescript
import { CFCache } from 'cf-helper';

const cacheHelper = new CFCache(platform);
```

**Check if a request is in the cache:**

```typescript
const match = await cacheHelper.match(request);
if (match) {
    console.log("Cache hit!");
    return match;
}
```

**Cache a new response:**

This function caches a response and allows you to modify headers before caching. It uses `ctx.waitUntil` to avoid blocking the response.

```typescript
const response = new Response(JSON.stringify({ data: 'some-data' }), {
    headers: {
        'Content-Type': 'application/json',
    }
});

await cacheHelper.put(request, response, {
    headers: {
        'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
    }
});
```

**Delete a cached response:**

You can delete a cached item by providing a `Request`, `URL`, or a string URL.

```typescript
await cacheHelper.delete(request);
```