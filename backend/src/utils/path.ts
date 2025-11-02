import { fileURLToPath } from 'url';
import { dirname } from 'path';

/**
 * ESM環境で__dirnameを取得するヘルパー
 */
export function getDirname(importMetaUrl: string): string {
  return dirname(fileURLToPath(importMetaUrl));
}
