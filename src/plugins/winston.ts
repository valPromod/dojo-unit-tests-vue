import * as winston from "winston";
import { PluginObject, VueConstructor } from "vue";

interface IOptions {
  context: string;
}

export class WinstonLog implements PluginObject<WinstonLog> {
  context = "";
  level = process.env.LOG_LEVEL || "debug";
  logger: winston.Logger = winston.createLogger({
    level: this.level,
    defaultMeta: {
      context: this.context,
    },
    format: winston.format.json(),
    transports: [new winston.transports.Console({ level: this.level })],
  });

  constructor(options: IOptions) {
    this.context = options.context;
  }

  install(Vue: VueConstructor): void {
    Vue.prototype.$log = this.logger;
  }
}

declare module "vue/types/vue" {
  // 3. Declare augmentation for Vue
  interface Vue {
    $log: winston.Logger;
  }
}

export default WinstonLog;
