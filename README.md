# cf-helper

## Install directly from GitHub:

```bash
npm install github:lauhard/cf-helper
```

## Features

+ Helper class for working with cache api
+ Helper class for working with r2 
+ All services and bindings can be accessed through the platform object

More helper classes will be provided soon... 


## Usage

### Create a cloudflare helper for R2:

``` nodejs
const cfr2 = new CFR2(platform);
```

Access the bucket stub directly:

``` node
const bucket = cfr2.getBucket('images');
bucket.get(<key>)

```

List all objects in a bucket:

``` node
const bucketData = await cfr2.listBucketData(<bucketname>, <R2ListOptions>)

// The function will return a promise like that:
(method) CFR2<App.Platform>.listBucketData(name: string, options: R2ListOptions): Promise<{
    objects: R2Object[];
    cursor: string | undefined;
    hasMore: boolean;
}>
``` 


### Create a cloudflare helper for Cache Api

``` node
const cfch = new CFCache(platform)
```

### Check if a request is already in cache:

``` node
const match = await cfch.match(request);
if (match) {
    console.log("Cache hit for bucket data");
    return match;
} 
```

### Cache a response
The function takes a request and response and caches the response.
The Response headers can be modified before caching via cacheOptions.
Waits until the caching is complete before returning.

``` node
cfch.put(request, new Response(JSON.stringify(bucketData), 
    { 
        headers: { 
            'Content-Type': 'application/json',
            'Cache-Control': 'public, max-age=0, s-maxage=3600, stale-while-revalidate=86400',
        } 
    }
));
```

### Delete a cached response
Delete a cached response based on a given request or ULR

``` node
cfch.delete(request)

```