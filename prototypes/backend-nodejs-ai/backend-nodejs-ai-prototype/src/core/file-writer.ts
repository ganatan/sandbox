import { promises as fs } from 'fs';
import path from 'path';

export async function writeFile(filename: string, content: string) {
  const outputDir = path.resolve(__dirname, '../../generated');
  await fs.mkdir(outputDir, { recursive: true });
  const filePath = path.join(outputDir, filename);
  await fs.writeFile(filePath, content, 'utf-8');
}
