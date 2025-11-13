// src/jobs/autoFileCleanup.ts
import cron from 'node-cron';
import fs from 'fs';
import path from 'path';
import { Model } from 'mongoose';
import { User } from '../features/user/user.model';
import { logger } from '../shared/utils/logger';
import { FileManager } from '../shared/utils/fileManager';

// Define all models and their file fields with proper typing
interface FileModelConfig {
  model: Model<any>;
  fields: string[];
}

const FILE_MODELS: FileModelConfig[] = [
  { model: User, fields: ['image'] },
];

// Upload directories to scan
const UPLOAD_DIRS = [
  'uploads/images',
  'uploads/gifImage',
  'uploads/medias',
  'uploads/docs',
];

async function cleanupOrphanedFiles() {
  try {
    logger.info('🧹 Starting automatic file cleanup...');

    const referencedFiles = new Set<string>();

    for (const { model, fields } of FILE_MODELS) {
      const projection = fields.reduce(
        (acc, field) => ({ ...acc, [field]: 1 }),
        {},
      );

      const documents = await (model as any).find({}, projection).lean();

      documents.forEach((doc: any) => {
        fields.forEach(field => {
          const value = doc[field];
          if (value) {
            if (Array.isArray(value)) {
              value.forEach(file => file && referencedFiles.add(file));
            } else {
              referencedFiles.add(value);
            }
          }
        });
      });
    }

    // Find and delete orphaned files
    let deletedCount = 0;

    UPLOAD_DIRS.forEach(dir => {
      const fullPath = path.join(process.cwd(), dir);
      if (fs.existsSync(fullPath)) {
        const files = fs.readdirSync(fullPath);

        files.forEach(file => {
          const filePath = `/${dir}/${file}`;
          if (!referencedFiles.has(filePath)) {
            try {
              FileManager.deleteFile(filePath);
              deletedCount++;
            } catch (error) {
              logger.error(`Failed to delete ${filePath}:`, error);
            }
          }
        });
      }
    });

    logger.info(`✅ Cleanup completed: ${deletedCount} orphaned files deleted`);
  } catch (error) {
    logger.error('❌ Error in automatic file cleanup:', error);
  }
}

// Start automatic cleanup - runs daily at 3 AM
export const startAutoFileCleanup = () => {
  cron.schedule('0 3 * * *', cleanupOrphanedFiles);
  logger.info('📅 Automatic file cleanup scheduled (daily at 3 AM)');
};
