/// <reference types="@cloudflare/workers-types" />
// Explicit type-only imports to ensure they stay as type imports in the build


// Default platform interface - can be overridden by consumers
export interface DefaultCloudflareplatform {
    env:  any;
    cf:  any;
    ctx: any;
    caches: any;
}

// Type definitions for Cloudflare Workers platform in SvelteKit
// These types should match @cloudflare/workers-types
export namespace CloudflareHelper {
    // Default platform - users can override this with their own types
    interface Platform extends DefaultCloudflareplatform {}
    interface R2BucketInfo {
        name: string
    }
    export interface BucketOptions {
        limit?: number;
        include: string[];
    }

    export interface CacheOptions {
        normalizeKey?: (url: URL) => URL,
        headers?: Record<string, string>,
        baseRequest?: Request,
        method?: 'GET' | 'HEAD';
        debug?: boolean;
    }
    export interface CustomMetadata{
        file: File, 
        userId?: string, 
        category?: string, 
        processed?: string, 
        thumbnailGenerated?: string
    }
    export interface R2ListAllResult {
        objects: R2Object[];
        cursor: string | undefined;
        hasMore: boolean;
    }
    // Generic environment interface - users can extend this in their projects
}
