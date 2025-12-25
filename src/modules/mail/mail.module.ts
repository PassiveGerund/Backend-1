import { ContainerModule } from 'inversify';
import { MailController } from './mail.controller';
import { MailService } from './mail.service';

const MailModule = new ContainerModule(({ bind }) => {
  bind(MailService).toSelf().inSingletonScope();
  bind(MailController).toSelf().inSingletonScope();
});

export default MailModule;
