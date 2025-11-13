// backend_server\src\shared\utils\fileManager.ts
import fs from 'fs';
import path from 'path';

export class FileManager {
  /**
   * Delete a file from the file system
   * @param filePath - The file path to delete (e.g., "/uploads/images/filename.jpg")
   */
  static deleteFile(filePath: string): void {
    try {
      if (!filePath) return;

      // Convert relative path to absolute path
      const absolutePath = path.join(process.cwd(), filePath);

      // Check if file exists before attempting to delete
      if (fs.existsSync(absolutePath)) {
        fs.unlinkSync(absolutePath);
        console.log(`File deleted successfully: ${filePath}`);
      }
    } catch (error) {
      console.error(`Failed to delete file ${filePath}:`, error);
      // Don't throw error to prevent breaking the main operation
    }
  }

  /**
   * Delete multiple files from the file system
   * @param filePaths - Array of file paths to delete
   */
  static deleteFiles(filePaths: string[]): void {
    filePaths.forEach(filePath => {
      this.deleteFile(filePath);
    });
  }

  /**
   * Extract filename from a file path
   * @param filePath - The file path (e.g., "/uploads/images/filename.jpg")
   * @returns filename with extension
   */
  static getFileName(filePath: string): string {
    if (!filePath) return '';
    return path.basename(filePath);
  }

  /**
   * Check if a file exists
   * @param filePath - The file path to check
   * @returns boolean indicating if file exists
   */
  static fileExists(filePath: string): boolean {
    try {
      if (!filePath) return false;
      const absolutePath = path.join(process.cwd(), filePath);
      return fs.existsSync(absolutePath);
    } catch (error) {
      return false;
    }
  }
}
