/// <reference types="solid-start/env" />

interface ImportMetaEnv {
  readonly SPOTIFY_ID: string;
  // ... other environment variables
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
