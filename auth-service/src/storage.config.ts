import { FileStorageLocal, FileStorageLocalSetup, FileStorageModuleAsyncOptions } from '@getlarge/nestjs-tools-file-storage';


const config: FileStorageModuleAsyncOptions = {
  useFactory(...args) {
    const setup: FileStorageLocalSetup = {
      storagePath: 'storage',
      maxPayloadSize: 10 * 1024 * 1024
    };
    return new FileStorageLocal(setup);
  },
};

export default config;