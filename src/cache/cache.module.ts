import { ContainerModule } from 'inversify';
import { CacheService } from './cache.service';

const CacheModule = new ContainerModule(({ bind }) => {
  bind(CacheService).toSelf().inSingletonScope();
});

export default CacheModule;
